<template>
    <div class="address-input" :class="{
        'display-as-nim-address': displayAsNimAddress,
        'display-as-domain': displayAsDomain,
    }" ref="root$">
        <textarea ref="textarea$" spellcheck="false" autocomplete="off"
            :placeholder="allowNimAddresses === allowEthAddresses ? undefined : allowNimAddresses ? 'NQ' : '0x'"
            @keydown="onKeyDown" @input="onInput" @paste="onPaste" @cut="onCut" @copy="formatClipboard"
            @click="updateSelection" @select="updateSelection" @blur="updateSelection" @focus="onFocus"
        ></textarea>

        <template v-if="displayAsNimAddress && supportsMixBlendMode">
            <template v-for="row in 3">
                <template v-for="column in 3" :key="`color-${row}-${column}`">
                    <div class="color-overlay" :style="{
                        /* Hidden when placeholder shown. Visibility instead of v-if to avoid flickering in Firefox */
                        visibility: currentValue ? 'visible' : 'hidden',
                        left: `calc(${column - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
                        top: `calc(${row - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
                        background: `var(--nimiq-${isBlockFocused((row - 1) * 3 + (column - 1)) ? 'light-' : ''}blue)`,
                    }"></div>
                </template>
            </template>
        </template>

        <transition name="transition-fade">
            <svg v-if="!displayAsDomain" width="210" height="99" viewBox="0 0 210 99" stroke-width="1.5"
                stroke-linecap="round" fill="none" xmlns="http://www.w3.org/2000/svg" class="grid">
                <line x1="0.75" y1="30.25" x2="209.25" y2="30.25"/> <!-- 1st horizontal line -->
                <line x1="0.75" y1="68.25" x2="209.25" y2="68.25"/> <!-- 2nd horizontal line -->
                <transition name="transition-fade">
                    <g v-if="displayAsNimAddress">
                        <line x1="67.75" y1="0.75" x2="67.75" y2="22.25"/> <!-- left vertical line in 1st row -->
                        <line x1="143.75" y1="0.75" x2="143.75" y2="22.25"/> <!-- right vertical line in 1st row -->
                        <line x1="67.75" y1="37.75" x2="67.75" y2="60.25"/> <!-- left vertical line in 2nd row -->
                        <line x1="143.75" y1="37.75" x2="143.75" y2="60.25"/> <!-- right vertical line in 2nd row -->
                        <line x1="67.75" y1="75.75" x2="67.75" y2="98.25"/> <!-- left vertical line in 3rd row -->
                        <line x1="143.75" y1="75.75" x2="143.75" y2="98.25"/> <!-- right vertical line in 3rd row -->
                    </g>
                </transition>
            </svg>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import {
    onChange as inputFormatOnChange,
    onPaste as inputFormatOnPaste,
    onCut as inputFormatOnCut,
    onKeyDown as inputFormatOnKeyDown,
    // @ts-expect-error Could not find a declaration file for module 'input-format'.
} from 'input-format';
import { Clipboard, ValidationUtils } from '@nimiq/utils';

interface ParserFlags {
    allowNimAddresses: boolean;
    allowEthAddresses: boolean;
    allowDomains: boolean;
}

const ADDRESS_REPLACED_CHARS: Partial<Record<string, string>> = {
    O: '0',
    I: '1',
    Z: '2',
};

const NIM_ADDRESS_MAX_LENGTH = /* 9 blocks */ 9 * /* 4 chars each */ 4 + /* spaces between */ 8;
const NIMIQ_ADDRESS_REGEX = new RegExp('^(?:'
    + 'NQ?' // NQ at the beginning
    + '|NQ\\d{1,2}' // first two characters after starting NQ must be digits
    // valid address <= max len; excluding invalid address characters I, O, W, Z which are the only characters
    // missing in Nimiq's base32 address alphabet.
    + `|NQ\\d{2}[0-9A-HJ-NP-VXY]{1,${NIM_ADDRESS_MAX_LENGTH - 4 - /* spaces */ 8}}`
    + ')$', 'i');

const ETH_ADDRESS_MAX_LENGTH = /* "0x" */ 2 + /* ETH addresses are 20 bytes, hex encoded */ 40;
const ETH_ADDRESS_REGEX = new RegExp('^(?:'
    + '0x?' // 0x at the beginning
    + `|0x[0-9a-f]{1,${ETH_ADDRESS_MAX_LENGTH - /* "0x" */ 2}}` // valid address <= max length
    + ')$', 'i');

const DOMAIN_REGEX = new RegExp('^'
    + '[-a-z0-9]*' // allow hyphens, Latin letters and numbers at the beginning
    + '(?:[a-z0-9]\\.[a-z]*)?' // can contain one dot before which no hyphen is allowed and after only Latin letters
    + '$', 'i');

const WHITESPACE_REGEX = /\s|\u200B/g; // normal whitespace, tab, newline or zero-width space

// definiton of the parse method for input-format (https://github.com/catamphetamine/input-format#usage)
// The parse method is called on every change to the textarea's content, on the entire content, one character at a
// time. The parsed content is then formatted via _format and written back to the textarea.
function parse(char: string, value: string, parserFlags: ParserFlags) {
    if (WHITESPACE_REGEX.test(char)) return; // skip whitespace as it will be added during formatting

    const addressChar = /* enable char replacement once address prefix NQ or 0x have been typed */ value.length >= 2
        ? ADDRESS_REPLACED_CHARS[char.toUpperCase()] || char
        : char;
    if (willBeNimAddress(value + addressChar, parserFlags)) {
        // We return the original character without transforming it to uppercase to improve compatibility with some
        // browsers that struggle with undo/redo of manipulated input. The actual transformation to uppercase is
        // then done via CSS and when the value is exported.
        return addressChar;
    } else if (willBeEthAddress(value + addressChar, parserFlags)) {
        if (value === '0' && addressChar === 'X') return 'x'; // Convert 0X prefix to more common 0x.
        return addressChar;
    } else if (willBeDomain(value + char, parserFlags)) {
        return char;
    }
    // else reject / skip character
}

// definiton of the format method for input-format (https://github.com/catamphetamine/input-format#usage)
function format(value: string, parserFlags: ParserFlags) {
    if (willBeNimAddress(value, parserFlags)) {
        value = stripWhitespace(value)
            .replace(/.{4}/g, (match, offset) => `${match}${(offset + 4) % 12 ? ' ' : '\n'}`) // form blocks
            .substring(0, NIM_ADDRESS_MAX_LENGTH); // discarding the new line after last block

        if (value.endsWith(' ')) {
            // The word spacing set via css is only applied to spaces that are actually between words which is not
            // the case for an ending space and the caret after an ending space therefore gets rendered at the wrong
            // position. To avoid that we add a zero-width space as an artificial word. We do not add that to the
            // template returned to input-format though to avoid it being interpreted as a typed character which
            // would place the caret after the zero width space.
            value += '\u200B';
        }
        return {
            text: value,
            // Used by input-format to position caret. Using w as placeholder instead of default x as w is not in
            // our address alphabet.
            template: 'wwww wwww wwww\nwwww wwww wwww\nwwww wwww wwww',
        };
    } else if (willBeEthAddress(value, parserFlags)) {
        value = stripWhitespace(value)
            .replace(/.{14}/g, (match) => `${match}\n`) // form blocks
            .substring(0, ETH_ADDRESS_MAX_LENGTH + /* new lines */ 2); // discard new line at end

        return {
            text: value,
            template: 'wwwwwwwwwwwwww\nwwwwwwwwwwwwww\nwwwwwwwwwwwwww',
        };
    } else {
        return {
            text: value,
        };
    }
}

function stripWhitespace(value: string) {
    return value.replace(WHITESPACE_REGEX, '');
}

function exportValue(value: string, parserFlags: ParserFlags) {
    if (willBeNimAddress(value, parserFlags)) {
        return value.toUpperCase().replace(/\n/g, ' ').replace(/\u200B/g, '');
    } else {
        return value.replace(/\n/g, '').replace(/\u200B/g, '');
    }
}

function willBeNimAddress(value: string, parserFlags: ParserFlags): boolean {
    return parserFlags.allowNimAddresses && NIMIQ_ADDRESS_REGEX.test(stripWhitespace(value));
}

function willBeEthAddress(value: string, parserFlags: ParserFlags): boolean {
    return parserFlags.allowEthAddresses && ETH_ADDRESS_REGEX.test(stripWhitespace(value));
}

function willBeDomain(value: string, parserFlags: ParserFlags): boolean {
    return parserFlags.allowDomains
        && !!value.length // expect at least one char
        && DOMAIN_REGEX.test(value)
        && !willBeNimAddress(value, parserFlags)
        && !willBeEthAddress(value, parserFlags);
}

// Simplified from @ethersproject/address, which we don't use directly to avoid its unnecessary dependencies.
async function isEthAddress(address: string) {
    if (!/^0x[0-9a-f]{40}$/i.test(address)) {
        // Check if it has the basic requirements of an address.
        return false;
    } else if (!/[a-f]/.test(address) || !/[A-F]/.test(address)) {
        // If it's all uppercase or all lowercase (ignoring the x of 0x) there is no encoded checksum to check.
        return true;
    } else {
        // Check checksum encoded in uppercase and lowercase characters.
        const addressHex = address.replace(/0x/gi, '');
        const addressHexCharCodes = addressHex.toLowerCase().split('').map((char) => char.charCodeAt(0));
        // External dependency which can be shared with the consuming app and which is lazy loaded only when needed.
        const { keccak_256 } = await import('js-sha3');
        const hashHex = keccak_256(addressHexCharCodes);

        for (let i = 0; i < 40; i++) {
            // Address hex char at position i should be uppercase if the decimal value of hash hex char at position
            // i is >= 8, and lowercase otherwise.
            if ((parseInt(hashHex[i], 16) >= 8 ? addressHex[i].toUpperCase() : addressHex[i].toLowerCase())
                !== addressHex[i]) return false;
        }
        return true;
    }
}

export enum AddressInputEvent {
    PASTE = 'paste',
    MODELVALUE_UPDATE = 'update:modelValue',
    ADDRESS = 'address',
}

export default defineComponent({
    name: 'AddressInput',
    emits: Object.values(AddressInputEvent),
    props: {
        // value that can be bound to via v-model
        modelValue: {
            type: String,
            default: '',
        },
        autofocus: Boolean,
        allowNimAddresses: {
            type: Boolean,
            default: true,
        },
        allowEthAddresses: Boolean,
        allowDomains: Boolean,
    },
    setup(props, context) {
        const root$ = ref<HTMLDivElement | null>(null);
        const textarea$ = ref<HTMLTextAreaElement | null>(null);

        const currentValue = ref('');
        const selectionStartBlock = ref(-1);
        const selectionEndBlock = ref(-1);
        const supportsMixBlendMode: boolean = CSS.supports('mix-blend-mode', 'screen');

        const parserFlags = computed(() => ({
            allowNimAddresses: props.allowNimAddresses,
            allowEthAddresses: !!props.allowEthAddresses,
            allowDomains: !!props.allowDomains,
        }));

        // initlially display as Nim address by default if Nim is the only allowed address type or no Eth is allowed and
        // no value is set yet.
        const displayAsNimAddress = computed(() =>
            (props.allowNimAddresses && !props.allowEthAddresses && (!props.allowDomains || !currentValue.value))
                || willBeNimAddress(currentValue.value, parserFlags.value)
        );

        const displayAsDomain = computed(() =>
            (props.allowDomains && !props.allowNimAddresses && !props.allowEthAddresses)
                || willBeDomain(currentValue.value, parserFlags.value)
        );

        onMounted(() => {
            // trigger initial value change. Not using immediate watcher as it already fires before mounted.
            onExternalValueChange();

            // Add selectionchange event handler. It has to be registered on document and is unfortunately not fired for
            // selections in textareas in Firefox. Therefore, we also bind the listener to focus, blur, select, click.
            document.addEventListener('selectionchange', updateSelection);

            if (props.autofocus) focus();
        });

        onUnmounted(() => {
            document.removeEventListener('selectionchange', updateSelection);
        });

        function focus(scrollIntoView = false) {
            const textarea = textarea$.value;
            if (!textarea) return;

            textarea.focus();
            if (scrollIntoView) textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        watch(() => props.modelValue, () => onExternalValueChange());
        function onExternalValueChange() {
            if (stripWhitespace(props.modelValue) === stripWhitespace(currentValue.value)) return;

            // could also be using format-input's parse and format helpers that preserve caret position but as we're not
            // interested in that, we calculate the formatted value manually
            const parsedValue = props.modelValue.split('').reduce((parsed, char) =>
                parsed + (parse(char, parsed, parserFlags.value) || ''), '');

            if (textarea$.value) {
                textarea$.value.value = format(parsedValue, parserFlags.value).text; // moves caret to the end
            }

            afterChange(parsedValue);
        }

        function onKeyDown(e: KeyboardEvent) {
            inputFormatOnKeyDown(
                e,
                textarea$.value,
                (char: string, value: string) => parse(char, value, parserFlags.value),
                (value: string) => format(value, parserFlags.value),
                afterChange,
            );
            setTimeout(() => updateSelection(), 10); // for arrow keys in Firefox
        }

        function onInput(e: Event & { inputType?: string }) {
            if (e.inputType === 'deleteByDrag') return; // we'll handle the subsequent insertFromDrop
            const textarea = textarea$.value;
            inputFormatOnChange(
                e,
                textarea,
                (char: string, value: string) => parse(char, value, parserFlags.value),
                (value: string) => format(value, parserFlags.value),
                afterChange,
            );
        }

        function onPaste(e: ClipboardEvent) {
            const clipboardData = e.clipboardData;
            const pastedData = clipboardData ? clipboardData.getData('text/plain') : '';
            context.emit(AddressInputEvent.PASTE, e, pastedData);

            inputFormatOnPaste(
                e,
                textarea$.value,
                (char: string, value: string) => parse(char, value, parserFlags.value),
                (value: string) => format(value, parserFlags.value),
                afterChange,
            );
        }

        function onCut(e: ClipboardEvent) {
            inputFormatOnCut(
                e,
                textarea$.value,
                (char: string, value: string) => parse(char, value, parserFlags.value),
                (value: string) => format(value, parserFlags.value),
                afterChange,
            );
            formatClipboard();
        }

        function onFocus() {
            // have to add a delay because the textarea is not focused yet at this point
            setTimeout(() => updateSelection());
        }

        function formatClipboard() {
            // While it's possible to set the clipboard data via clipboardEvent.clipboardData.setData this requires
            // calling preventDefault() which then results in the need to reimplement the behavior for cutting text and
            // has side effects like the change not being added to the undo history. Therefore, we let the browser do
            // the default behavior but overwrite the clipboard afterwards.
            const text = exportValue(document.getSelection()!.toString(), parserFlags.value);
            setTimeout(() => Clipboard.copy(text));
        }

        async function afterChange(value: string) {
            const textarea = textarea$.value;
            if (!textarea) return;
            // textarea.value is the unformatted value (i.e. the concatenation of characters returned by parse)

            // if selection is a caret in front of a space or new line move caret behind it
            if (textarea.selectionStart === textarea.selectionEnd
                && /\s/.test(textarea.value[textarea.selectionStart])) {
                textarea.selectionStart += 1; // this also moves the selectionEnd as they were equal
            }

            currentValue.value = exportValue(textarea.value, parserFlags.value);
            context.emit(AddressInputEvent.MODELVALUE_UPDATE, currentValue.value); // emit event compatible with v-model

            if (willBeNimAddress(value, parserFlags.value)) {
                const isValid = ValidationUtils.isValidAddress(currentValue.value);
                if (isValid) context.emit(AddressInputEvent.ADDRESS, currentValue.value);

                if (!root$.value) return;
                // if user entered a full address that is not valid give him a visual feedback
                root$.value.classList.toggle(
                    'invalid',
                    currentValue.value.length === NIM_ADDRESS_MAX_LENGTH && !isValid,
                );
            } else if (willBeEthAddress(value, parserFlags.value)) {
                const checkedValue = currentValue.value; // make copy because currentValue might change during async request
                const isValid = await isEthAddress(stripWhitespace(checkedValue));
                if (isValid) context.emit(AddressInputEvent.ADDRESS, checkedValue);

                if (!root$.value) return;
                // if user entered a full address that is not valid give him a visual feedback
                root$.value.classList.toggle(
                    'invalid',
                    checkedValue.length === ETH_ADDRESS_MAX_LENGTH && !isValid,
                );
            }
        }

        function updateSelection() {
            const textarea = textarea$.value;
            if (!textarea) return;
            const focused = document.activeElement === textarea
                // If all blocks are filled and the caret is at the end display as if not focused.
                && (textarea.selectionStart !== NIM_ADDRESS_MAX_LENGTH
                || textarea.selectionEnd !== NIM_ADDRESS_MAX_LENGTH);
            selectionStartBlock.value = focused ? Math.floor(textarea.selectionStart / 5) : -1;
            selectionEndBlock.value = focused ? Math.floor(textarea.selectionEnd / 5) : -1;
        }

        function isBlockFocused(blockIndex: number) {
            return selectionStartBlock.value <= blockIndex && blockIndex <= selectionEndBlock.value;
        }

        context.expose({ focus });

        return {
            root$,
            textarea$,

            currentValue,
            supportsMixBlendMode,
            displayAsNimAddress,
            displayAsDomain,

            onKeyDown,
            onInput,
            onPaste,
            onCut,
            onFocus,

            formatClipboard,
            updateSelection,
            isBlockFocused,
        };
    },
});
</script>

<style scoped>
    .address-input {
        --font-size: 3rem;
        --block-height: 4.125rem;
        --block-width: 8.5rem;
        --block-gap-v: 0.75rem;
        --block-gap-h: 1rem;

        contain: size layout paint style;
        width: calc(3 * var(--block-width) + 3 * var(--block-gap-h));
        height: calc(3 * var(--block-height) + 3.5 * var(--block-gap-v));
        position: relative;
        background: white; /* Note: our text coloring with mix-blend-mode only works on white background */

        border-radius: 0.5rem;
        --border-color: rgba(31, 35, 72, 0.1); /* Based on Nimiq Blue */
        box-shadow: inset 0 0 0 1.5px var(--border-color);
        transition: box-shadow .2s ease, height 0.3s var(--nimiq-ease);
        overflow: hidden;
    }

    .address-input.display-as-domain {
        height: calc(var(--block-height) + 2 * var(--block-gap-v));
    }

    .address-input:hover {
        --border-color: rgba(31, 35, 72, 0.14); /* Based on Nimiq Blue */
    }

    .address-input:focus-within {
        --border-color: rgba(5, 130, 202, 0.4); /* Based on Nimiq Light Blue */
    }

    .address-input.invalid {
        animation: shake .4s;
    }

    /* Copied from Keyguard */
    @keyframes shake {
        from { transform: none; }
        10%  { transform: translate3d(-0.25rem, 0, 0) rotate(-0.15deg); }
        20%  { transform: translate3d(0.5rem, 0, 0) rotate(0.15deg); }
        30%  { transform: translate3d(-0.5rem, 0, 0) rotate(-0.15deg); }
        40%  { transform: translate3d(0.5rem, 0, 0) rotate(0.15deg); }
        50%  { transform: translate3d(-0.25rem, 0, 0) rotate(-0.15deg); }
        to   { transform: none; }
    }

    textarea {
        --line-height: calc(var(--block-height) + var(--block-gap-v));

        contain: size layout paint style;
        position: absolute;
        width: 100%;
        height: calc(3 * var(--line-height));
        line-height: var(--line-height);
        top: calc(var(--font-size) / 24 + var(--block-gap-v) / 2); /* -3px at default font size */
        left: calc(var(--font-size) / 24 * 5 + var(--block-gap-h) / 2); /* 5px at default font size */
        padding: 0;
        margin: 0;
        border: none;
        outline: unset !important;
        resize: none;
        overflow: hidden;
        z-index: 1;
        /* Note: if loading only a subset of Fira Mono, the whitespace character must be included for rendering of
        spaces at correct width in some browsers */
        font-family: Fira Mono, 'monospace';
        font-size: var(--font-size);
        /* the width of rendered letters may slightly differ across different browsers on different OSs. To compensate
        for that we apply a letter-spacing based on the deviation from a reference value */
        letter-spacing: calc(1.8rem - 0.6em); /* 1ch changed to 0.6em, 'ch' in 'calc' making Safari 14.5 crash */
        word-spacing: calc(var(--block-gap-h) / 2);
        color: var(--nimiq-blue);
        background: transparent;
        transition: color 0.2s ease;
    }

    textarea:focus {
        color: var(--nimiq-light-blue);
    }

    .display-as-domain textarea {
        height: var(--line-height);
        white-space: nowrap;
        width: calc(100% - 2 * var(--block-gap-h))
    }

    .display-as-nim-address textarea {
        text-transform: uppercase;
        /* Mask image to make selections visible only within blocks. Using mask image instead clip path to be able to
        click onto the textarea on the invisible areas too */
        mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 123"><rect x="-1" y="6" width="62" height="28"/><rect x="79" y="6" width="62" height="28"/><rect x="159" y="6" width="62" height="28"/><rect x="-1" y="47" width="62" height="28"/><rect x="79" y="47" width="62" height="28"/><rect x="159" y="47" width="62" height="28"/><rect x="-1" y="88" width="62" height="28"/><rect x="79" y="88" width="62" height="28"/><rect x="159" y="88" width="62" height="28"/></svg>');
    }

    @supports (mix-blend-mode: screen) {
        .display-as-nim-address textarea {
            color: black; /* the actual color will be set via mix-blend-mode */
        }

        .display-as-nim-address textarea::selection {
            color: white;
            background: #561a51; /* a color that in combination with mix-blend-mode yields a color close to the default */
        }

        .display-as-nim-address textarea::-moz-selection {
            background: #411d68; /* a color that in combination with mix-blend-mode yields a color close to the default */
        }

        .color-overlay {
            contain: size layout paint style;
            position: absolute;
            width: calc(var(--block-width) - .5rem);
            height: calc(var(--block-height) - .5rem);
            mix-blend-mode: screen;
            z-index: 1;
            pointer-events: none;
        }
    }

    ::-webkit-input-placeholder {
        opacity: .6;
        transition: color .2s var(--nimiq-ease);
    }
    ::-ms-input-placeholder {
        opacity: .6;
        transition: color .2s var(--nimiq-ease);
    }
    ::-moz-placeholder {
        opacity: .6;
        transition: color .2s var(--nimiq-ease);
    }
    ::placeholder {
        opacity: .6;
        transition: color .2s var(--nimiq-ease);
    }

    textarea:focus::-webkit-input-placeholder {
        color: var(--nimiq-light-blue);
    }
    textarea:focus::-ms-input-placeholder {
        color: var(--nimiq-light-blue);
    }
    textarea:focus::-moz-placeholder {
        color: var(--nimiq-light-blue);
    }
    textarea:focus::placeholder {
        color: var(--nimiq-light-blue);
    }

    .grid {
        contain: size layout paint style;
        position: absolute;
        top: calc(var(--font-size) / 24 * 8 + var(--block-gap-v) / 2);
        left: calc(var(--font-size) / 24 * 5 + var(--block-gap-h) / 2);
        stroke: var(--border-color);
        transition: stroke .2s ease, opacity 0.2s ease;
    }

    textarea:focus ~ .grid {
        opacity: 0.5;
    }

    .grid g {
        transition: opacity .2s ease;
    }

    .grid.transition-fade-enter-from,
    .grid.transition-fade-leave-to,
    .grid g.transition-fade-enter-from,
    .grid g.transition-fade-leave-to {
        opacity: 0 !important;
    }
</style>

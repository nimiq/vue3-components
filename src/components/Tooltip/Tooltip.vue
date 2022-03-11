<template>
    <span class="tooltip" ref="root$"
        :class="[verticalPosition, {
            shown: isShown,
            'transition-position': transitionPosition,
            'inverse-theme': theme === TooltipThemes.INVERSE,
        }]"
        @mouseenter="mouseOver(true)"
        @mouseleave="mouseOver(false)"
    >
        <a href="javascript:void(0);"
            ref="tooltipTrigger$"
            @focus.stop="show()"
            @blur.stop="hide()"
            @click="onClick()"
            :tabindex="disabled || noFocus ? -1 : 0"
            class="trigger"
        >
            <slot v-if="!$slots.icon" name="trigger">
                <AlertTriangleIcon class="nq-orange" />
            </slot>
            <!-- Note: usage of the `icon` slot is deprecated. Use `trigger` instead. -->
            <slot v-if="$slots.icon && !$slots.trigger" name="icon"></slot>
        </a>
        <transition name="transition-fade">
            <div ref="tooltipBox$"
                v-if="isShown"
                class="tooltip-box"
                :style="tooltipBoxStyles">
                <slot></slot>
            </div>
        </transition>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';
import { StyleValue } from '@vue/runtime-dom';
import { AlertTriangleIcon } from '../Icons';

export enum TooltipVerticalPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
}

export enum TooltipHorizontalPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export enum TooltipThemes {
    NORMAL = 'normal',
    INVERSE = 'inverse',
}

export default defineComponent({
    name: 'Tooltip',
    props: {
        /**
        * Container within which the tooltip should be positioned if possible.
        */
        container: HTMLElement,
        disabled: Boolean,
        noFocus: Boolean,
        /**
        * Preferred tooltip position as "[vertical] [horizontal]" or "[vertical]".
        */
        preferredPosition: {
            type: String,
            default: 'top right',
            validator: (value: unknown) => {
                if (typeof value !== 'string') return false;
                const [vertical, horizontal] = value.split(' ');
                return Object.values(TooltipVerticalPosition).includes(vertical as TooltipVerticalPosition)
                    && (!horizontal || Object.values(TooltipHorizontalPosition)
                        .includes(horizontal as TooltipHorizontalPosition));
            },
        },
        /**
        * Margin to maintain to container. If no container is set, this prop has no effect. For omitted values, the
        * container's padding is used as margin.
        */
        margin: {
            type: Object as () => Partial<Record<TooltipVerticalPosition | TooltipHorizontalPosition, number>>,
            validator: (value: any) => typeof value === 'object'
                && Object.entries(value).every(([position, margin]) => typeof margin === 'number'
                    && (Object.values(TooltipVerticalPosition).includes(position as TooltipVerticalPosition)
                        || Object.values(TooltipHorizontalPosition).includes(position as TooltipHorizontalPosition))),
        },
        /**
        * Sets the tooltip's width to the container's width minus margin. If no container is set, this prop has no effect.
        */
        autoWidth: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String as () => TooltipThemes,
            default: 'normal' as TooltipThemes.NORMAL,
            validator: (value: any) => Object.values(TooltipThemes).includes(value),
        },
        /**
        * Styles to apply on the tooltip box without the need to use deep css selectors.
        */
        styles: Object as () => Partial<CSSStyleDeclaration>,
    },
    setup(props, context) {
        const tooltipTrigger$ = ref<HTMLAnchorElement | null>(null);
        const tooltipBox$ = ref<HTMLDivElement | null>(null);
        const root$ = ref<HTMLElement | null>(null);

        const verticalPosition = ref<TooltipVerticalPosition | null>(null);
        const tooltipToggled = ref(false);
        const transitionPosition = ref(false); // do not transition on show but on position updates while shown
        const mousedOver = ref(false);
        const mouseOverTimeout = ref<number | null>(null);
        const lastToggle = ref(-1);

        const height = ref(0);
        const width = ref(0);
        const maxWidth = ref(0);
        const left = ref(0);
        const top = ref(0);

        const isShown = computed(() => {
            return (tooltipToggled.value || mousedOver.value) && !props.disabled;
        });

        const tooltipBoxStyles = computed(() => {
            // note that we let the browser calculate height automatically
            return {
                ...props.styles,
                top: top.value + 'px',
                left: left.value + 'px',
                width: props.container && props.autoWidth ? width.value + 'px' : (props.styles || {}).width,
                maxWidth: props.container ? maxWidth.value + 'px' : (props.styles || {}).maxWidth,
            } as StyleValue;
        });

        onMounted(() => {
            if ('icon' in context.slots) {
                console.warn('Tooltip: Slot `icon` is deprecated and support will be removed in the future.'
                    + ' Use slot `trigger` instead.');
            }
            // Manually trigger an update instead of using immediate watchers to avoid unnecessary initial double updates
            if (props.container) setContainer(props.container);
        });

        onUnmounted(() => {
            if (props.container) {
                props.container.removeEventListener('scroll', updatePosition);
            }
        });

        function show() {
            tooltipToggled.value = true;
        }

        function hide(force: boolean = false) {
            tooltipToggled.value = false;
            if (tooltipTrigger$.value) tooltipTrigger$.value.blur();
            if (!force) return;
            mousedOver.value = false;
        }

        function toggle(force: boolean = false) {
            if (tooltipToggled.value || mousedOver.value) {
                hide(force);
            } else {
                show();
            }
        }

        watch(isShown, update);
        async function update(newWatcherValue?: boolean) {
            // updates dimensions and repositions tooltip
            if (!isShown.value) {
                transitionPosition.value = false; // when shown next time, render immediately at correct position
                if (newWatcherValue === false) {
                    lastToggle.value = Date.now();
                    context.emit('hide');
                }
                return; // no need to update as tooltip not visible
            } else if (newWatcherValue === true) {
                lastToggle.value = Date.now();
                context.emit('show');
            }

            if (props.container) {
                await new Promise((resolve) => requestAnimationFrame(() => {
                    if (!props.container) return;

                    // avoid potential forced layouting / reflow by taking measurements within a requestAnimationFrame
                    // (see https://gist.github.com/paulirish/5d52fb081b3570c81e3a#appendix)
                    const leftMargin = getMargin(TooltipHorizontalPosition.LEFT) || 0;
                    const rightMargin = getMargin(TooltipHorizontalPosition.RIGHT) || 0;

                    maxWidth.value = props.container.offsetWidth - leftMargin - rightMargin;
                    if (props.autoWidth) width.value = maxWidth.value;
                    resolve(null);
                }));
            }

            // make sure that tooltipBox is created, then update measurements
            await nextTick();
            if (!isShown.value || !tooltipBox$.value) return; // not visible anymore?
            // here we need the quick reflow to avoid that the visible tooltip gets rendered at the wrong position,
            // potentially causing scroll bars
            height.value = tooltipBox$.value.offsetHeight;
            width.value = tooltipBox$.value.offsetWidth;

            updatePosition();

            // wait for updated position to be effective and rendered, then enable transitions
            await nextTick();
            await new Promise((resolve) => requestAnimationFrame(resolve));
            transitionPosition.value = true;
        }

        watch(() => props.preferredPosition, updatePosition);
        function updatePosition() {
            if (!isShown.value || !tooltipTrigger$.value) return;
            // Note that in his method we do not need to use requestAnimationFrame to avoid reflows, as the method is
            // already called as a scroll event listener or manually in update after a reflow.
            // tslint:disable-next-line:prefer-const
            let [preferredVerticalPosition, preferredHorizontalPosition] = props.preferredPosition.split(' ');
            preferredHorizontalPosition = preferredHorizontalPosition || TooltipHorizontalPosition.RIGHT;
            left.value = preferredHorizontalPosition === TooltipHorizontalPosition.RIGHT
                ? Math.round(tooltipTrigger$.value.offsetWidth / 2 - 25) // offset by 25px according to designs
                : Math.round(tooltipTrigger$.value.offsetWidth / 2 - width.value + 25);

            if (props.container) {
                // position tooltip such that it best fits container element
                const triggerBoundingRect = tooltipTrigger$.value.getBoundingClientRect();
                const containerBoundingRect = props.container.getBoundingClientRect();
                const topMargin = getMargin(TooltipVerticalPosition.TOP) || 0;
                const bottomMargin = getMargin(TooltipVerticalPosition.BOTTOM) || 0;
                const spaceNeeded = height.value + 16; // 16 for arrow, assuming same height on mobile for simplicity
                const fitsTop = triggerBoundingRect.top - containerBoundingRect.top - topMargin >= spaceNeeded;
                const fitsBottom = containerBoundingRect.bottom - triggerBoundingRect.bottom - bottomMargin >= spaceNeeded;
                if ((preferredVerticalPosition === TooltipVerticalPosition.TOP && (fitsTop || !fitsBottom))
                    || (preferredVerticalPosition === TooltipVerticalPosition.BOTTOM) && (fitsTop && !fitsBottom)) {
                    verticalPosition.value = TooltipVerticalPosition.TOP;
                } else {
                    verticalPosition.value = TooltipVerticalPosition.BOTTOM;
                }

                // constrain horizontal position
                const leftMargin = getMargin(TooltipHorizontalPosition.LEFT) || 0;
                const rightMargin = getMargin(TooltipHorizontalPosition.RIGHT) || 0;
                // left and right bound of container, expressed in trigger's coordinate system
                const leftBound = containerBoundingRect.left + leftMargin - triggerBoundingRect.left;
                const rightBound = containerBoundingRect.right - rightMargin - triggerBoundingRect.left;
                left.value = Math.max(
                    leftBound,
                    Math.min(
                        rightBound - width.value,
                        left.value,
                    ),
                );
            } else {
                verticalPosition.value = preferredVerticalPosition as TooltipVerticalPosition;
            }

            top.value = verticalPosition.value === TooltipVerticalPosition.BOTTOM
                ? tooltipTrigger$.value.offsetHeight
                : -height.value;
        }

        watch(() => props.container, setContainer);
        async function setContainer(newContainer?: HTMLElement, oldContainer?: HTMLElement) {
            if (oldContainer) {
                oldContainer.removeEventListener('scroll', updatePosition);
            }

            if (newContainer) {
                // In case the container is scrollable add a listener
                await new Promise((resolve) => requestAnimationFrame(()  => {
                    if (newContainer.scrollHeight !== newContainer.offsetHeight) {
                        newContainer.addEventListener('scroll', updatePosition);
                    }
                    resolve(null);
                }));
            }

            await update();
        }

        function getMargin(position: TooltipVerticalPosition | TooltipHorizontalPosition) {
            if (props.margin && props.margin[position] !== undefined) return props.margin[position];

            const containerEl = props.container || null;
            if (!containerEl) return 0;

            if ((position === TooltipVerticalPosition.TOP || position === TooltipVerticalPosition.BOTTOM)
                && containerEl.scrollHeight !== containerEl.offsetHeight) {
                // If container is scrollable, the padding scrolls with the content. Therefore we consider the whole
                // offsetHeight as valid area for the tooltip and return a margin of 0.
                return 0;
            }
            return parseInt(window.getComputedStyle(containerEl, null).getPropertyValue(`padding-${position}`), 10);
        }

        function mouseOver(mouseOverTooltip: boolean) {
            if (!mouseOverTooltip) { // mouseleave
                mouseOverTimeout.value = window.setTimeout(
                    () => mousedOver.value = false,
                    100,
                );
            } else { // mouseenter
                if (mouseOverTimeout.value) window.clearTimeout(mouseOverTimeout.value);
                mousedOver.value = true;
            }
        }

        function onClick() {
            if (Date.now() - lastToggle.value < 200) return; // just toggled by mouseover or focus
            toggle(/* force */ true);
            context.emit('click');
        }

        context.expose({ show, hide, toggle, update });

        return {
            TooltipThemes,

            tooltipTrigger$,
            tooltipBox$,
            root$,

            verticalPosition,
            transitionPosition,

            isShown,
            tooltipBoxStyles,

            show,
            hide,
            mouseOver,
            onClick,
        };
    },
    components: { AlertTriangleIcon }
})
</script>

<style scoped>
    .tooltip {
        display: inline-block;
        position: relative;
        line-height: 1;
    }

    .trigger {
        position: relative;
        display: inline-block;
        vertical-align: bottom;
        text-decoration: none;
        outline: none;
        cursor: default;
        color: inherit;
    }

    .trigger:deep(svg:first-child:last-child),
    .trigger:deep(img:first-child:last-child) {
        display: block;
    }

    .trigger::after {
        opacity: 0;
        content: '';
        display: block;
        position: absolute;
        width: 2.25rem;
        height: 2rem;
        left: calc(50% - 1.125rem);
        mask-image: url('data:image/svg+xml,<svg viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 7.12c-.47 0-.93.2-1.23.64L3.2 14.29A4 4 0 0 1 0 16h18a4 4 0 0 1-3.2-1.7l-4.57-6.54c-.3-.43-.76-.64-1.23-.64z" fill="white"/></svg>');
        transition: opacity .3s var(--nimiq-ease), .3s visibility;
        transition-delay: 16ms; /* delay one animation frame for better sync with tooltipBox */
        visibility: hidden;
        z-index: 1000; /* move above tooltip-box's box-shadow */
    }

    .transition-position .trigger::after {
        transition: top .2s var(--nimiq-ease), left .2s var(--nimiq-ease), transform .2s var(--nimiq-ease),
            opacity .3s var(--nimiq-ease), .3s visibility;
    }

    .top .trigger::after {
        top: -2rem;
        background: #250636; /* a color of the nimiq-blue-bg gradient in the lower area */
        transform: scaleY(-1);
    }

    .bottom .trigger::after {
        top: 100%;
        background: #201e45; /* a color of the nimiq-blue-bg gradient in the upper area */
    }

    .inverse-theme .trigger::after {
        background: white;
    }

    .shown .trigger::after {
        opacity: 1;
        visibility: visible;
    }

    .tooltip-box {
        position: absolute;
        color: white;
        background: var(--nimiq-blue-bg);
        padding: 1.5rem;
        border-radius: .5rem;
        font-size: 1.75rem;
        line-height: 1.5;
        font-weight: 600;
        transition: opacity .3s var(--nimiq-ease);
        box-shadow: 0 1.125rem 2.275rem rgba(0, 0, 0, 0.11);
        z-index: 999;
    }

    .inverse-theme .tooltip-box {
        color: var(--nimiq-blue);
        background: white;
    }

    .transition-position .tooltip-box {
        transition: opacity .3s var(--nimiq-ease), transform .2s var(--nimiq-ease), top .2s var(--nimiq-ease);
    }

    .tooltip-box.transition-fade-enter,
    .tooltip-box.transition-fade-leave-to {
        opacity: 0;
    }

    .top .tooltip-box {
        transform: translateY(-2rem);
    }

    .bottom .tooltip-box {
        transform: translateY(2rem);
    }
</style>

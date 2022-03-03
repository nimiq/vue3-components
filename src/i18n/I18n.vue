<script lang="ts">
import { defineComponent, h } from '@vue/runtime-core';
import { loadI18n, I18n$tVariables } from './I18nComposable';

/**
 * Component for slot interpolation, similar to vue-i18n's interpolation component,
 * see https://kazupon.github.io/vue-i18n/guide/interpolation.html#slots-syntax-usage
 */

export default defineComponent({
    name: 'I18n',
    props: {
        path: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: 'span',
        },
    },
    methods: {
        $t(key: string, variablesOrLang?: I18n$tVariables | string, variables?: I18n$tVariables) {
            return loadI18n(this.tag)(key, variablesOrLang, variables);
        },
    },
    render() {
        if (!Object.keys(this.$slots).length) {
            throw new Error(
                'I18n: the component must contain at least 1 template slot, otherwise simply use the $t function.',
            );
        }

        const message = this.$t(this.$options.name!, this.path.replace(/\\n/g, '\n'));
        const children = message.split(/({\w+})/g)
            .map((part) => {
                const variableNameMatch = part.match(/^{(\w+)}$/);
                if (!variableNameMatch) return part; // plain text part or empty part
                return this.$slots[variableNameMatch[1]] || part;
            });

        return h(this.$props.tag, h(children));
    }
});
</script>

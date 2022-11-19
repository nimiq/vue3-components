import { action } from "@storybook/addon-actions";

export const getEventListenerFromEnum = (eventEnum) => Object.assign(...Object.values(eventEnum).map((e) => ({
    [e]: (...a) => action(e)(...a)
})));

export const getEventArgTypeFromEnum = (eventEnum) => Object.assign(...Object.values(eventEnum).map((e) => ({
    [e]: {
        control: false,
        table: { category: 'Events' },
    }
})));

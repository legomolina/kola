import { writable } from 'svelte/store';

export type MenuState = {
    visible: boolean;
}

export const menuStore = writable<MenuState>({
    visible: false,
});
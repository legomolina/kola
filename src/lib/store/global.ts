import { writable } from 'svelte/store';

export type GlobalState = {
    animatedBackgroundColor: string;
    staticBackgroundColor: string;
}

export const globalStore = writable<GlobalState>({
    animatedBackgroundColor: 'var(--accent-color)',
    staticBackgroundColor: 'var(--accent-color)',
});

import { get, type Updater, writable } from 'svelte/store';
import type { StorageRecords } from '$lib/utils/manageLocalStorage';
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/utils/manageLocalStorage';

export type RecordsState = StorageRecords;

const store = writable<RecordsState>();

function updateStorage() {
    const localStorage = loadFromLocalStorage();
    saveToLocalStorage({
        ...localStorage,
        records: get(store)
    });
}

export const recordsStore = {
    subscribe: store.subscribe,
    update(updater: Updater<RecordsState>) {
        store.update(updater);
        updateStorage();
    },
    set(value: RecordsState) {
        store.set(value);
        updateStorage();
    }
};
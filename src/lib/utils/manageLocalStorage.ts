const STORAGE_KEY = 'KOLA_DATA';

export type StorageData = {
    records: StorageRecords;
};

export type StorageRecords = {
    discardedApp: boolean;
    firstTimeRecord: boolean;
}

export const saveToLocalStorage = (data: StorageData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const loadFromLocalStorage = (): StorageData => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return {
        records: {
            discardedApp: false,
            firstTimeRecord: true,
        }
    };
}
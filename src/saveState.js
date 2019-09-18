export function restoreState (key, defaultData) {
    const saved = localStorage.getItem(key);

    if (saved === null) return defaultData;

    try {
        return JSON.parse(saved);
    } catch (e) {
        return defaultData;
    }
}

export function saveState (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
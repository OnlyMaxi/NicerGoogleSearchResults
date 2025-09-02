document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        removeAIO: document.querySelector("#removeAIOverview"),
        removePAA: document.querySelector("#removePeopleAlso")
    }

    chrome.storage.sync.get(["preferences"], (data) => {
        const preferences = data.preferences || {};
        elements.removeAIO.checked = preferences.removeAIO ?? false;
        elements.removePAA.checked = preferences.removePAA ?? false;
    });

    function updatePreference(key, value) {
        chrome.storage.sync.get(["preferences"], (data) => {
            const preferences = data.preferences || {};
            preferences[key] = value;
            chrome.storage.sync.set({preferences});
        })
    }

    elements.removeAIO.addEventListener('change', (e) => {
        console.log("remove ai overview: " + elements.removeAIO.checked);
        updatePreference("removeAIO", elements.removeAIO.checked);
    });

    elements.removePAA.addEventListener('change', (e) => {
        console.log("remove people also: " + elements.removePAA.checked);
        updatePreference("removePAA", elements.removePAA.checked);
    });
});
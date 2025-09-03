function createApply() {
    if (document.querySelector("#applyButton")) return; //button already exists

    const apply = document.createElement("div");
    const applyButton = document.createElement("button");
    apply.id = "apply";
    applyButton.id = "applyButton";

    applyButton.textContent = "Apply changes (will reload page!)";
    applyButton.addEventListener("click", applyChanges);

    apply.appendChild(applyButton);
    document.body.appendChild(apply);
}

function applyChanges() {
    const apply = document.querySelector("#apply");
    if (apply) apply.innerHTML = "";

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0].id) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}

function updatePreference(key, value) {
    chrome.storage.sync.get(["preferences"], (data) => {
        const preferences = data.preferences || {};
        preferences[key] = value;
        chrome.storage.sync.set({preferences});
        createApply();
    })
}

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

    elements.removeAIO.addEventListener('change', (e) => {
        console.log("remove ai overview: " + elements.removeAIO.checked);
        updatePreference("removeAIO", elements.removeAIO.checked);
    });

    elements.removePAA.addEventListener('change', (e) => {
        console.log("remove people also: " + elements.removePAA.checked);
        updatePreference("removePAA", elements.removePAA.checked);
    });
});
function updateApply() {
    //check if button should be removed or not removed (object equality tested through stringified equality for simplicity)
    if (JSON.stringify(initialPreferences) === JSON.stringify(currentPreferences)) removeApply();
    else createApply();
}

function createApply() {
    if (document.querySelector("#applyButton")) return; //apply already exists

    const apply = document.querySelector("#apply") || document.createElement("div");
    const applyButton = document.createElement("button");
    apply.id = "apply";
    applyButton.id = "applyButton";

    applyButton.textContent = "Apply changes (will reload page!)";
    applyButton.addEventListener("click", applyChanges);

    apply.appendChild(applyButton);
    document.body.appendChild(apply);
}

function removeApply() {
    const apply = document.querySelector("#apply");
    if (apply) {
        document.body.removeChild(apply);
    }
}

function applyChanges() {
    removeApply();

    initialPreferences = {...currentPreferences};

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
        currentPreferences[key] = value;
        chrome.storage.sync.set({preferences});
        updateApply();
    });
}

let initialPreferences = {};
let currentPreferences = {};

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        removeAIO: document.querySelector("#removeAIOverview"),
        removePAA: document.querySelector("#removePeopleAlso")
    }

    chrome.storage.sync.get(["preferences"], (data) => {
        initialPreferences = {...(data.preferences || {})};
        currentPreferences = {...initialPreferences};
        elements.removeAIO.checked = currentPreferences.removeAIO ?? false;
        elements.removePAA.checked = currentPreferences.removePAA ?? false;
    });

    elements.removeAIO.addEventListener('change', (e) => {
        updatePreference("removeAIO", elements.removeAIO.checked);
    });

    elements.removePAA.addEventListener('change', (e) => {
        updatePreference("removePAA", elements.removePAA.checked);
    });
});
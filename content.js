const centerCol = document.querySelector("#center_col");

chrome.storage.sync.get("preferences", data => {
    const preferences = data.preferences || {};

    if (preferences.removeAIO) {
        console.log("removeAIO found");
        document.querySelectorAll("h1").forEach(result => {
            if (result.innerHTML !== "AI overview") return;

            result.parentElement.style.border = "5px dashed lime"; //testing
            result.parentElement.remove();
        });
        //sometimes and on smaller screens, the heading is a h2 instead of a h1
        document.querySelectorAll("h2").forEach(result => {
            if (result.innerHTML !== "AI overview") return;

            result.parentElement.style.border = "5px dashed lime"; //testing
            result.parentElement.remove();
        });
    }


    if (preferences.removePAA) {
        document.querySelectorAll("span").forEach(result => {
            if (result.innerHTML !== "People also ask" && result.innerHTML !== "People also search for") return;

            const parent = result.parentElement.parentElement.parentElement.parentElement; //4 steps up should always be safe
            //parent.style.border = "5px dashed lime"; //testing
            parent.remove();
        });
    }
});
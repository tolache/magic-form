const formDataLocalStorageKey = "formData";
const formInputElements = document.querySelectorAll("form input");
addEventListeners();
setInterval(populateInputValues, 100);

function addEventListeners() {
    window.addEventListener("load", populateInputValues);
    formInputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", (event) => saveFormData(event));
    });
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", () => {
        createHistoryEntry();
        localStorage.removeItem(formDataLocalStorageKey);
    });
}

function populateInputValues() {
    let formData = JSON.parse(localStorage.getItem(formDataLocalStorageKey));
    if (formData === null) {
        return;
    }
    formInputElements.forEach((inputElement) => {
        if (formData[inputElement.id]) {
            console.log(`Local storage item exists for ${inputElement.id} with value: ${formData[inputElement.id]}`);
            inputElement.value = formData[inputElement.id];
        }
    });
}

function saveFormData(event) {
    let localStorageValue = JSON.parse(localStorage.getItem(formDataLocalStorageKey));
    if (localStorageValue === null) {
        localStorageValue = {};
    }
    localStorageValue[event.target.id] = event.target.value;
    localStorage.setItem(formDataLocalStorageKey,JSON.stringify(localStorageValue));
}

function createHistoryEntry() {
    const entryId = `entry${Date.now()}`;
    const localStorageValue = {};
    formInputElements.forEach((inputElement) => {
        localStorageValue[inputElement.id] = inputElement.value;
    });
    localStorage.setItem(entryId, JSON.stringify(localStorageValue));
}

// TODO:
//  1. Save input values in one storage value as a JSON
//  2. sync input values between browser tabs

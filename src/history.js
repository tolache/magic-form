window.addEventListener("load", () => {
    const historyEntryIds = getHistoryEntryIdsFromLocalStorage();
    historyEntryIds.forEach((entryId) => {
        checkAndAddHistoryCard(entryId);
    });
});

setInterval(updateHistoryCards, 100);

function getHistoryEntryIdsFromLocalStorage() {
    const entryIdsArr = [];
    const allLocalStorageItems = {...localStorage};
    Object.keys(allLocalStorageItems).forEach((key) => {
        const entryIdRegex = /^entry\d+$/; // substring "entry" followed by one or more digits
        if (!entryIdRegex.test(key)) {
            return; // storage value is not history-card-related
        }
        if (!entryIdsArr.includes(key)) {
            entryIdsArr.push(key);
        }
    });
    return entryIdsArr;
}

function checkAndAddHistoryCard(entryId) {
    if (checkCardAlreadyAdded(entryId)) {
        return;
    }
    const entryValue = JSON.parse(localStorage.getItem(entryId));
    const template = document.getElementById("history-card-template");
    const card = template.content.cloneNode(true);
    const cardDiv = card.querySelector(".submit-history-card");
    cardDiv.id = entryId;
    card.querySelector(".card-first-name").textContent = entryValue["first-name"];
    card.querySelector(".card-last-name").textContent = entryValue["last-name"];
    card.querySelector(".card-email").textContent = entryValue["email"];
    card.querySelector(".card-phone").textContent = entryValue["phone"];
    card.querySelector(".card-company").textContent = entryValue["company"];
    card.querySelector(".card-address").textContent = entryValue["address"];
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", removeHistoryCard);
    const body = document.querySelector("body");
    body.appendChild(card);
}

function checkCardAlreadyAdded(entryId) {
    const cardArray = getHistoryCards();
    for (const card of cardArray) {
        if (card.id === entryId) {
            return true;
        }
    }
    return false;
}

function removeHistoryCard(event) {
    let card = event.target.parentNode;
    localStorage.removeItem(card.id);
    card.remove();
}

function checkAndRemoveHistoryCard(card) {
    if (localStorage.getItem(card.id)) {
        return;
    }
    card.remove();
}

function updateHistoryCards() {
    const entriesInLocalStorage = getHistoryEntryIdsFromLocalStorage();
    entriesInLocalStorage.forEach(checkAndAddHistoryCard);
    const cardsInUi = getHistoryCards();
    cardsInUi.forEach((card) => checkAndRemoveHistoryCard(card));
}

function getHistoryCards() {
    const htmlCollectionOfCards = document.getElementsByClassName("submit-history-card");
    return Array.from(htmlCollectionOfCards);
}

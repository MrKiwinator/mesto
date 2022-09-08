"use strict"

// Profile variables:

let profile = document.querySelector(".profile");

let profileName = profile.querySelector(".profile__name");
let profileStatus = profile.querySelector(".profile__status");

let editBtn = profile.querySelector(".profile__edit-button");
let addBtn = profile.querySelector(".profile__add-button");

// Popup form variables:

let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup__form");
let userNameInput = popup.querySelector("#username");
let userStatusInput = popup.querySelector("#user-info");
let submitBtn = popup.querySelector(".popup__submit");
let popupCloseBtn = popup.querySelector(".popup__close-btn");

// Popup state change:

function popupStageChange() {
    popup.classList.toggle("popup_opened");
}

editBtn.addEventListener("click", popupStageChange);

popupCloseBtn.addEventListener("click", popupStageChange);

// Username and Status:

userNameInput.setAttribute("value", profileName.textContent);
userStatusInput.setAttribute("value", profileStatus.textContent);

function formSubmitHandler (evt) {
    evt.preventDefault();

    // Username change:
    let userNameInputText = userNameInput.value;

    profileName.textContent = userNameInputText;

    // User status change:
    let userStatusInputText = userStatusInput.value;

    profileStatus.textContent = userStatusInputText;

    // Popup closing:
    popupStageChange();
}

formElement.addEventListener("submit", formSubmitHandler);
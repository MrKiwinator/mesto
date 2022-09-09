"use strict"

// Profile variables:

const profile = document.querySelector(".profile");

const profileName = profile.querySelector(".profile__name");
const profileStatus = profile.querySelector(".profile__status");

const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

// Popup form variables:

const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__form");
const userNameInput = popup.querySelector(".popup__input_type_username");
const userStatusInput = popup.querySelector(".popup__input_type_userstatus");
const popupCloseBtn = popup.querySelector(".popup__close-btn");

// Popup window:

function closingPopup() {
    popup.classList.remove("popup_opened");
}

function openingPopup() {
    popup.classList.add("popup_opened");

    userNameInput.value = profileName.textContent;
    userStatusInput.value = profileStatus.textContent;
}

function submitPopup(evt) {
    evt.preventDefault();

    profileName.textContent = userNameInput.value;
    profileStatus.textContent = userStatusInput.value;

    closingPopup();
}

editBtn.addEventListener("click", openingPopup);

popupCloseBtn.addEventListener("click", closingPopup);

formElement.addEventListener("submit", submitPopup);
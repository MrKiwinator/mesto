"use strict"

import Card from "./Card.js";
import initialCards from "./cards.js";
import FormValidator from "./FormValidator.js";

// VARIABLES:

//Profile:

const profile = document.querySelector(".profile");

const profileName = profile.querySelector(".profile__name");
const profileStatus = profile.querySelector(".profile__status");

const buttonEdit = profile.querySelector(".profile__edit-button");

const popupEdit = document.querySelector(".edit-profile");

const popupEditForm = popupEdit.querySelector(".popup__form");
const userNameInput = popupEdit.querySelector(".popup__input_type_username");
const userStatusInput = popupEdit.querySelector(".popup__input_type_userstatus");
const popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");

//Card variables:

const buttonAdd = profile.querySelector(".profile__add-button");

const popupAddCard = document.querySelector(".add-picture");
const popupCardCloseBtn = popupAddCard.querySelector(".popup__close-btn");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");

const pictureName = popupAddCard.querySelector(".popup__input_type_picture-name");
const pictureLink = popupAddCard.querySelector(".popup__input_type_picture-link");

const cardContainer = document.querySelector(".elements");

const popupZoomCard = document.querySelector(".zoom-card");
const popupZoomCardCloseBtn = popupZoomCard.querySelector(".popup__close-btn");

const cardImages = document.querySelectorAll(".element__picture");

// Validation settings:

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

// FUNCTIONS:

// Forms validation: 
const editForm = new FormValidator(settings, popupEditForm);
const addCardForm = new FormValidator(settings, popupAddCardForm);

editForm.enableValidation();
addCardForm.enableValidation();

// Opening popup:

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    
    document.addEventListener('keydown', closeByEsc);
}

// Closing popup:

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
   
    document.removeEventListener('keydown', closeByEsc);
}

const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}  

const closeByOverlay = (popup) => {
    popup.addEventListener("mousedown", (evt) => {
        const eventTarget = evt.target;

        if (eventTarget.classList.contains("popup")) {
            closePopup(popup);
        }
    });
}

// Edit profile popup:

const openEditPopup = () => {
    openPopup(popupEdit);

    userNameInput.value = profileName.textContent;
    userStatusInput.value = profileStatus.textContent;

    editForm.resetError();
}

buttonEdit.addEventListener("click", openEditPopup);

const closeEditPopup = () => {
    closePopup(popupEdit);
}

popupEditCloseBtn.addEventListener("click", closeEditPopup);
closeByOverlay(popupEdit);

const submitEditPopup = (evt) => {
    evt.preventDefault();

    profileName.textContent = userNameInput.value;
    profileStatus.textContent = userStatusInput.value;

    closeEditPopup();
}

popupEditForm.addEventListener("submit", submitEditPopup);

// Add picture popup:

const openAddCardPopup = () => {
    openPopup(popupAddCard);

    popupAddCardForm.reset();

    addCardForm.resetError();
}

buttonAdd.addEventListener("click", openAddCardPopup);
closeByOverlay(popupAddCard);

const closeAddCardPopup = () => {
    closePopup(popupAddCard);
}

popupCardCloseBtn.addEventListener("click", closeAddCardPopup);

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();

    const card = new Card(pictureName.value, pictureLink.value, "#card-template");

    cardContainer.prepend(card.createCard());

    closeAddCardPopup();
}

popupAddCardForm.addEventListener("submit", handleCardFormSubmit);

// Initial cards creation: 

initialCards.forEach(function(item) {
    const card = new Card(item.name, item.link, "#card-template");
    cardContainer.append(card.createCard());
});

// Zoom card popup:

export const handlePreviewPicture = (name, link) => {

    const popupZoomImg = popupZoomCard.querySelector(".popup__image");
    const popupZoomCaption = popupZoomCard.querySelector(".popup__caption");

    popupZoomImg.src = link;
    popupZoomImg.alt = name;
    popupZoomCaption.textContent = name;

    openPopup(popupZoomCard);
}

const closeZoomCardPopup = () => {
    closePopup(popupZoomCard);
}

popupZoomCardCloseBtn.addEventListener("click", closeZoomCardPopup);
closeByOverlay(popupZoomCard);

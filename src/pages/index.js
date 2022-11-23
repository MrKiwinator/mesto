"use strict"

import { 
    buttonEdit, 
    popupEditForm, 
    userNameInput, 
    userStatusInput, 
    buttonAdd, 
    popupAddCardForm, 
    cardContainerSelector, 
    settings, 
    initialCards } from "../components/variables.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Forms validation: 

const editForm = new FormValidator(settings, popupEditForm);
const addCardForm = new FormValidator(settings, popupAddCardForm);

editForm.enableValidation();
addCardForm.enableValidation();

// Initial cards creation:

const cardList = new Section(
    {
        items: initialCards,
        renderer: (cardData) => {
            const card = new Card (
                cardData.name, 
                cardData.link, 
                "#card-template",
                {
                    // Preview card popup: 
                    handleCardClick: () => { 
                        const previewPopup = new PopupWithImage(".zoom-card");
                        previewPopup.open(cardData.name, cardData.link);
                        previewPopup.setEventListeners();
                    }
                }
            )

            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }
    },
    cardContainerSelector
)

cardList.renderItems();

// Edit popup:

const userInfo = new UserInfo (".profile__name", ".profile__status");

const editPopup = new PopupWithForm (
    ".edit-profile", 
    {
        handleFormSubmit: (userData) => {
            userInfo.setUserInfo(userData.user_name, userData.user_status);
            editPopup.close();
        }
    }
)

buttonEdit.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    userNameInput.value = currentUserInfo.name;
    userStatusInput.value = currentUserInfo.status;

    editPopup.open();
    editForm.resetError();
});

editPopup.setEventListeners();

// Add card popup: 

const addCardPopup = new PopupWithForm (
    ".add-picture",
    {
        handleFormSubmit: (cardData) => {
            const card = new Card (
                cardData.picture_name, 
                cardData.picture_link, 
                "#card-template",
                {
                    // Preview card popup: 
                    handleCardClick: () => { 
                        const previewPopup = new PopupWithImage(".zoom-card");
                        previewPopup.open(cardData.picture_name, cardData.picture_link);
                        previewPopup.setEventListeners();
                    }
                }
            )

            const cardElement = card.createCard()
            cardList.addItemPrepend(cardElement);
        }
    }
);

buttonAdd.addEventListener("click", () => {
    addCardPopup.open();
    addCardForm.resetError();
});

addCardPopup.setEventListeners();
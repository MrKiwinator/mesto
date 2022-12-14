"use strict"

// VARIABLES:

//Profile:

export const profile = document.querySelector(".profile");

export const buttonEdit = profile.querySelector(".profile__edit-button");

export const popupEdit = document.querySelector(".edit-profile");
export const popupEditForm = popupEdit.querySelector(".popup__form");

export const userNameInput = popupEdit.querySelector(".popup__input_type_username");
export const userStatusInput = popupEdit.querySelector(".popup__input_type_userstatus");

export const buttonAvatar = profile.querySelector(".profile__edit-avatar-btn")

export const popupAvatar = document.querySelector(".edit-avatar");
export const popupAvatarForm = popupAvatar.querySelector(".popup__form");

export const avatarLinkInput = popupAvatar.querySelector(".popup__input_type_picture-link");

//Card variables:

export const buttonAdd = profile.querySelector(".profile__add-button");

export const popupAddCard = document.querySelector(".add-picture");
export const popupAddCardForm = popupAddCard.querySelector(".popup__form");

export const cardContainerSelector = ".elements";

// Validation settings:

export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}
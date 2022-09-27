"use strict"

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


const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".elements");

const popupZoomCard = document.querySelector(".zoom-card");
const popupZoomCardCloseBtn = popupZoomCard.querySelector(".popup__close-btn");

const cardImages = document.querySelectorAll(".element__picture");

// FUNCTIONS:

// Opening and closing popup:

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
}

// Edit profile popup:

function openEditPopup() {
    openPopup(popupEdit);

    userNameInput.value = profileName.textContent;
    userStatusInput.value = profileStatus.textContent;
}

buttonEdit.addEventListener("click", openEditPopup);

const closeEditPopup = () => {
    closePopup(popupEdit);
}

popupEditCloseBtn.addEventListener("click", closeEditPopup);

function submitEditPopup(evt) {
    evt.preventDefault();

    profileName.textContent = userNameInput.value;
    profileStatus.textContent = userStatusInput.value;

    closePopup(popupEdit);
}

popupEditForm.addEventListener("submit", submitEditPopup);

// Add picture popup:

function openAddCardPopup() {
    openPopup(popupAddCard);

    popupAddCardForm.reset();
}

buttonAdd.addEventListener("click", openAddCardPopup);

const closeAddCardPopup = () => {
    closePopup(popupAddCard);
}

popupCardCloseBtn.addEventListener("click", closeAddCardPopup);

function renderCard(name, link) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    
    const pictureElement = cardElement.querySelector(".element__picture");
    const picturePlace = cardElement.querySelector(".element__place");

    pictureElement.src = link;
    pictureElement.alt = name;

    picturePlace.textContent = name;

    return cardElement;
}

function createCard(evt) {
    evt.preventDefault();

    const card = renderCard(pictureName.value, pictureLink.value);

    cardContainer.prepend(card);

    closeAddCardPopup();
}

popupAddCardForm.addEventListener("submit", createCard);

// Initial cards creation: 

initialCards.forEach(function(item) {
    const card = renderCard(item.name, item.link);
    cardContainer.append(card);
});

// Zoom card popup:

cardContainer.addEventListener("click", function(event) {
    const eventTarget = event.target;

    const popupZoomImg = popupZoomCard.querySelector(".popup__image");
    const popupZoomCaption = popupZoomCard.querySelector(".popup__caption");
    
    if (eventTarget.classList.contains("element__picture")) {

        popupZoomImg.src = eventTarget.src;
        popupZoomImg.alt = eventTarget.alt;
        popupZoomCaption.textContent = eventTarget.alt;

        openPopup(popupZoomCard);
    }
});

const closeZoomCardPopup = () => {
    closePopup(popupZoomCard);
}

popupZoomCardCloseBtn.addEventListener("click", closeZoomCardPopup);

// Card deletion:

cardContainer.addEventListener("click", function(event) {
    const eventTarget = event.target;
    
    if (eventTarget.classList.contains("element__delete")) {
        eventTarget.closest(".element").remove();
    }
});

// Card Like:

cardContainer.addEventListener("click", function(event) {
    const eventTarget = event.target;

    if (eventTarget.classList.contains("element__like")) {
        eventTarget.classList.toggle("element__like_active");
    }
});
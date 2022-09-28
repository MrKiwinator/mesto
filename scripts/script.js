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

// Card Like:

const handleLikeIcon = (evt) => {
    const eventTarget = evt.target;

    eventTarget.classList.toggle("element__like_active");
};

// Card deletion:

const handleDeleteCard = (evt) => {
    const eventTarget = evt.target;
    
    eventTarget.closest(".element").remove();
};

popupCardCloseBtn.addEventListener("click", closeAddCardPopup);

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

    const pictureElement = cardElement.querySelector(".element__picture");
    const picturePlace = cardElement.querySelector(".element__place");

    pictureElement.src = link;
    pictureElement.alt = name;
    picturePlace.textContent = name;

    const likeButton = cardElement.querySelector('.element__like');
    const deleteButton = cardElement.querySelector('.element__delete');
    const cardImage = cardElement.querySelector('.element__picture');

    likeButton.addEventListener('click', handleLikeIcon);
    deleteButton.addEventListener('click', handleDeleteCard);
    cardImage.addEventListener('click', () => handlePreviewPicture(name, link));

    return cardElement;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = createCard(pictureName.value, pictureLink.value);

    cardContainer.prepend(card);

    closeAddCardPopup();
}

popupAddCardForm.addEventListener("submit", handleCardFormSubmit);

// Initial cards creation: 

initialCards.forEach(function(item) {
    const card = createCard(item.name, item.link);
    cardContainer.append(card);
});

// Zoom card popup:

const handlePreviewPicture = (name, link) => {

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




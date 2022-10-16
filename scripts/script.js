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

// Opening popup:

const openPopup = (popup) => {
    popup.classList.add("popup_opened");

    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('mousedown', closeByOverlay);
    document.addEventListener('click', closeByButton);
}

// Closing popup:

const closeOpenedPopup = (popup) => {
    popup.classList.remove("popup_opened");

    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('mousedown', closeByOverlay);
    document.removeEventListener('click', closeByButton);
}

const closePopup = () => {
    const openedPopup = document.querySelector('.popup_opened');
    closeOpenedPopup(openedPopup); 
}

const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
        closePopup();
    }
}  

const closeByOverlay = (evt) => {
    if (evt.target.classList.contains("popup")) {
        closePopup();
    }
}

const closeByButton = (evt) => {
    if (evt.target.classList.contains("popup__close-btn")) {
        closePopup();
    }
}

// Edit profile popup:

const openEditPopup = () => {
    openPopup(popupEdit);

    userNameInput.value = profileName.textContent;
    userStatusInput.value = profileStatus.textContent;

    document.addEventListener('submit', submitEditPopup);
}

const closeEditPopup = () => {
    closeOpenedPopup(popupEdit);

    buttonEdit.addEventListener("click", openEditPopup);
}

closeEditPopup();

const submitEditPopup = (evt) => {
    evt.preventDefault();

    profileName.textContent = userNameInput.value;
    profileStatus.textContent = userStatusInput.value;

    closeOpenedPopup(popupEdit);
}

// Add picture popup:

const openAddCardPopup = () => {
    openPopup(popupAddCard);

    popupAddCardForm.reset();

    popupAddCardForm.addEventListener("submit", handleCardFormSubmit);
}

const closeAddCardPopup = () => {
    closeOpenedPopup(popupAddCard);

    buttonAdd.addEventListener("click", openAddCardPopup);
}

closeAddCardPopup();

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

// Card creation:

const createCard = (name, link) => {
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

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();

    const card = createCard(pictureName.value, pictureLink.value);

    cardContainer.prepend(card);

    closeAddCardPopup();
}

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
    closeOpenedPopup(popupZoomCard);
}
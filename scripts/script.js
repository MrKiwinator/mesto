"use strict"

// Profile variables:

const profile = document.querySelector(".profile");


// Opening and closing popup:

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
}

// Edit profile popup:

const profileName = profile.querySelector(".profile__name");
const profileStatus = profile.querySelector(".profile__status");

const buttonEdit = profile.querySelector(".profile__edit-button");

const popupEdit = document.querySelector(".edit-profile");

const popupEditForm = popupEdit.querySelector(".popup__form");
const userNameInput = popupEdit.querySelector(".popup__input_type_username");
const userStatusInput = popupEdit.querySelector(".popup__input_type_userstatus");
const popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");

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

const buttonAdd = profile.querySelector(".profile__add-button");

const popupAddCard = document.querySelector(".add-picture");
const popupCardCloseBtn = popupAddCard.querySelector(".popup__close-btn");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");

const pictureName = popupAddCard.querySelector(".popup__input_type_picture-name");
const pictureLink = popupAddCard.querySelector(".popup__input_type_picture-link");

function openAddCardPopup() {
    openPopup(popupAddCard);

    popupAddCardForm.reset();
}

buttonAdd.addEventListener("click", openAddCardPopup);

const closeAddCardPopup = () => {
    closePopup(popupAddCard);
}

popupCardCloseBtn.addEventListener("click", closeAddCardPopup);

const cardTemplate = document.querySelector("#card-template").content;
const cardElements = document.querySelector(".elements");

function createCard(evt) {
    evt.preventDefault();

    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    
    cardElement.querySelector(".element__picture").src = pictureLink.value;
    cardElement.querySelector(".element__picture").alt = pictureName.value;

    cardElement.querySelector(".element__place").textContent = pictureName.value;

    cardElements.prepend(cardElement);

    closeAddCardPopup();
}

popupAddCardForm.addEventListener("submit", createCard);

// Initial cards creation: 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

initialCards.forEach(function(item) {
    
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

    cardElement.querySelector(".element__picture").src = item.link;
    cardElement.querySelector(".element__picture").alt = item.name;

    cardElement.querySelector(".element__place").textContent = item.name;

    cardElements.append(cardElement);
});

// Zoom card popup:

const popupZoomCard = document.querySelector(".zoom-card");
const popupZoomCardCloseBtn = popupZoomCard.querySelector(".popup__close-btn");

const cardImages = document.querySelectorAll(".element__picture");

cardElements.addEventListener("click", function(event) {
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

cardElements.addEventListener("click", function(event) {
    const eventTarget = event.target;
    
    if (eventTarget.classList.contains("element__delete")) {
        eventTarget.closest(".element").remove();
    }
});

// Card Like:

cardElements.addEventListener("click", function(event) {
    const eventTarget = event.target;

    if (eventTarget.classList.contains("element__like")) {
        eventTarget.classList.toggle("element__like_active");
    }
});
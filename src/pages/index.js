"use strict"

import './index.css';
import { 
    buttonEdit, 
    popupEditForm,
    userNameInput, 
    popupAvatarForm, 
    avatarLinkInput,
    userStatusInput, 
    buttonAdd, 
    popupAddCardForm, 
    cardContainerSelector, 
    settings, 
    buttonAvatar} from "../components/variables.js";
import Api from "../components/Api.js"
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from "../components/UserInfo.js";
import { data } from 'autoprefixer';

// Forms validation: 

const editForm = new FormValidator(settings, popupEditForm);
const avatarForm = new FormValidator(settings, popupAvatarForm)
const addCardForm = new FormValidator(settings, popupAddCardForm);

editForm.enableValidation();
avatarForm.enableValidation();
addCardForm.enableValidation();

// API

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
      authorization: 'd2ba1a76-da30-4658-a46b-72cf4211de9c',
      'Content-Type': 'application/json'
    }
});

console.log("Карточки");
console.log(Promise.resolve(api.getCards()).then(res => {return res}));
console.log("Пользователь")
console.log(Promise.resolve(api.getUserInfo()).then(res => {return res}))

// API requests:

let userId; // Creating variable for current user ID

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([user, cards]) => {
        userId = user._id;
        // Filling user info upon page opening:
        userInfo.setUserInfo(user.name, user.about);
        userInfo.setUserAvatar(user.avatar);
        // Rendering initial cards:
        cardList.renderItems(cards.reverse())
        console.log(cards);
    })
    .catch((err) => console.log(err))

const createCard = (cardData) => {
    const card = new Card (
        {
            data: cardData,
            // Preview card popup: 
            handleCardClick: () => { 
                previewPopup.open(cardData.name, cardData.link);
            },
            handleLikeClick: () => {
                card.handleLikeBtn(
                    api.setLike(cardData._id)
                        .catch((err) => console.log(err)),
                    api.deleteLike(cardData._id)
                        .catch((err) => console.log(err))
                    )
            },
            handleDeleteClick: (id) => {
                confirmPopup.open();
                confirmPopup.changeSubmitHandler(() => {
                    confirmPopup.renderLoading(true)
                    api.delCard(id)
                        .then(() => {
                            card.deleteCard();
                            confirmPopup.close();
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {
                            confirmPopup.renderLoading(false)
                        })
                })
            }
        },
        "#card-template",
        userId
    )

    const cardElement = card.createCard();
    cardList.addItem(cardElement);
}

// Initial cards creation:

const cardList = new Section(
    {
        renderer: (cardData) => {
            createCard(cardData);
        }
    },
    cardContainerSelector
)

// Add card popup: 

const addCardPopup = new PopupWithForm (
    ".add-picture",
    {
        handleFormSubmit: (cardData) => {
            addCardPopup.renderLoading(true);
            api.addCard(cardData)
                .then((res) => {
                    createCard(res);
                    addCardPopup.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    addCardPopup.renderLoading(false);
                })
        }
    }
);

buttonAdd.addEventListener("click", () => {
    addCardPopup.open();
    addCardForm.resetError();
});

addCardPopup.setEventListeners();

// Information about user:

const userInfo = new UserInfo (".profile__name", ".profile__status", ".profile__avatar");

// Edit user info popup:

const editUserInfoPopup = new PopupWithForm (
    ".edit-profile", 
    {
        handleFormSubmit: (userData) => {
            editUserInfoPopup.renderLoading(true)
            console.log(userData)
            api.setUserInfo(userData)
                .then((res) => {
                    console.log(res);
                    userInfo.setUserInfo(res.name, res.about);
                    editUserInfoPopup.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editUserInfoPopup.renderLoading(false);
                })
        }
    }
)



buttonEdit.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    userNameInput.value = currentUserInfo.name;
    userStatusInput.value = currentUserInfo.status;

    editUserInfoPopup.open();
    editForm.resetError();
});

editUserInfoPopup.setEventListeners();

// Edit user avatar: 

const editUserAvatarPopup = new PopupWithForm (
    ".edit-avatar",
    {
        handleFormSubmit: (avatarData) => {
            editUserAvatarPopup.renderLoading(true);
            api.setUserAvatar(avatarData.user_avatar)
                .then((res) => {
                    userInfo.setUserAvatar(res.avatar)
                    editUserAvatarPopup.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editUserAvatarPopup.renderLoading(false);
                })
        }
    }
)

buttonAvatar.addEventListener("click", () => {
    avatarLinkInput.value = "";

    editUserAvatarPopup.open();
    avatarForm.resetError();
})

editUserAvatarPopup.setEventListeners();

// Preview popup:

const previewPopup = new PopupWithImage(".zoom-card");
previewPopup.setEventListeners();

// Confirm card deletion popup:

const confirmPopup = new PopupWithSubmit(".delete-image")

confirmPopup.setEventListeners();





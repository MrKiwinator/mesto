"use strict"

import { data } from "autoprefixer";

export default class Card {
    constructor ({ data, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector, userId) {
        this._data = data;
        this._likes = data.likes;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._userId = userId;
    }

    likeBtn () {
        console.log(this._likeBtn);
    }

    // Function return card template:
    _getTemplate () { 
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);

        return cardTemplate;
    }

    // Card creation:
    createCard () {
    
        this._element = this._getTemplate();
        
        this._elementPicture = this._element.querySelector(".element__picture");
        this._likeBtn = this._element.querySelector(".element__like");
        this._likeCounter = this._element.querySelector(".element__like-counter");
        this._delIconElement = this._element.querySelector(".element__delete")

        this._setEventListeners();
        
        this._elementPicture.src = this._data.link;
        this._elementPicture.alt = this._data.name;
        this._element.querySelector(".element__place").textContent = this._data.name;

        this._countLikes();
        this._handleUserCardLike();
        this._handleCardDelIcon();

        return this._element;
    }

    handleLikeBtn(setLikeOnServer, delLikeOnServer) {
        if(!this._likeBtn.classList.contains("element__like_active")) {
            setLikeOnServer;
        } else {
            delLikeOnServer;
        }
    }

    addLike (res) {
        this._likeBtn.classList.add("element__like_active");
        this._likeCounter.textContent = res.likes.length;
    }

    removeLike (res) {
        this._likeBtn.classList.remove("element__like_active");
        this._likeCounter.textContent = res.likes.length;
    }

    deleteCard () {
        this._element.remove();
        this._element = null;
    }

    _countLikes () { // Counting the amount of likes
        this._likeCounter.textContent = this._likes.length;
    }

    _handleUserCardLike () { // Check if current user already liked the card
        this._likes.forEach((like) => {
            if (this._userId === like._id) {
                this._likeBtn.classList.add("element__like_active");
            }
        })
    }

    _handleCardDelIcon () { // Show del icon only on current user

        if (!(this._userId === this._data.owner._id)) {
            this._delIconElement.remove();
        }
    }

    _setEventListeners () { // Card event listeners:
        this._element.querySelector(".element__like")
        .addEventListener("click", () => {
            this._handleLikeClick(this._element);
        });

        this._element.querySelector(".element__delete")
        .addEventListener("click", () => {
            this._handleDeleteClick(this._id);
        });
        this._element.querySelector(".element__picture")
        .addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link); 
        });
    }
}
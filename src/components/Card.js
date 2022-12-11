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
        // this._handleAddLike = handleAddLike;
        // this._handleDeleteLike = handleDeleteLike;
    }

    // Function return card template:
    _getTemplate () { 
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);

        return cardTemplate;
    }

    // Card creation:
    createCard () {
    
        this._element = this._getTemplate();
        this._setEventListeners();

        const elementPicture = this._element.querySelector(".element__picture");
        
        elementPicture.src = this._data.link;
        elementPicture.alt = this._data.name;
        this._element.querySelector(".element__place").textContent = this._data.name;

        this._countLikes();
        this._handleUserCardLike();
        this._handleCardDelIcon();

        return this._element;
    }

    handleLikeBtn(setLikeOnServer, delLikeOnServer) {
        const likeBtn = this._element.querySelector(".element__like");
        const likeCounter = this._element.querySelector(".element__like-counter");

        if(!likeBtn.classList.contains("element__like_active")) {
            setLikeOnServer;
            likeBtn.classList.add("element__like_active");
            likeCounter.textContent++;
        } else {
            delLikeOnServer;
            likeBtn.classList.remove("element__like_active");
            likeCounter.textContent--;
        }
    }

    deleteCard () {
        this._element.remove();
        this._element = null;
    }

    _countLikes () { // Counting the amount of likes
        const likeCounter = this._element.querySelector(".element__like-counter");

        likeCounter.textContent = this._likes.length;
    }

    _handleUserCardLike () { // Check if current user already liked the card
        this._likes.forEach((like) => {
            if (this._userId === like._id) {
                const likeBtn = this._element.querySelector(".element__like");

                likeBtn.classList.add("element__like_active");
            }
        })
    }

    _handleCardDelIcon () { // Show del icon only on current user
        const delIconElement = this._element.querySelector(".element__delete")

        if (!(this._userId === this._data.owner._id)) {
            delIconElement.remove();
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
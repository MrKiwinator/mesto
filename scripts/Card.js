"use strict"

import {handlePreviewPicture} from "./index.js";

export default class Card {
    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
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

        this._element.querySelector(".element__picture").src = this._link;
        this._element.querySelector(".element__picture").alt = this._name;
        this._element.querySelector(".element__place").textContent = this._name;

        return this._element;
    }

    // Like handler:
    _handleLikeCard () {
        this._element.querySelector(".element__like")
        .classList
        .toggle("element__like_active");
    }

    // Card deletion:
    _handleDeleteCard () {
        this._element.querySelector(".element__delete")
        .closest(".element")
        .remove();
    }

    // Card event listeners:
    _setEventListeners () {
        this._element.querySelector(".element__like")
        .addEventListener("click", () => {
            this._handleLikeCard();
        });

        this._element.querySelector(".element__delete")
        .addEventListener("click", () => {
            this._handleDeleteCard();
        });
        this._element.querySelector(".element__picture")
        .addEventListener("click", () => {
            handlePreviewPicture(this._name, this._link);
        });
    }
}
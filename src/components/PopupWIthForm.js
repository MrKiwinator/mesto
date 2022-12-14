import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        
        this._handleFormSubmit = handleFormSubmit;

        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupBtn = this._popupForm.querySelector('.popup__submit');
    }

    _getInputValues () {
        this._inputValues = {};
        console.log(this._inputValues)
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })

        return this._inputValues;
    }

    close () {
        this._popupForm.reset();

        super.close();
    }

    setEventListeners () {
        super.setEventListeners();

        this._popupForm.addEventListener ('submit', (evt) => {
            evt.preventDefault ();
            
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading (isLoading) {
        const popupBtnText = "Coхранить";

        if (isLoading) {
            this._popupBtn.textContent = "Coхранение..."
        } else {
            this._popupBtn.textContent = popupBtnText;
        }
    }
}
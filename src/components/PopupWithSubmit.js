import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleDeleteSubmit) {
        super (popupSelector);

        this._handleDeleteSubmit = handleDeleteSubmit;
        this._popupForm = this._popup.querySelector('.popup__form'); 
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleDeleteSubmit = newSubmitHandler;
    }

    setEventListeners () {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleDeleteSubmit();
        });
    }

    renderLoading (isLoading) {
        const popupBtn = this._popupForm.querySelector('.popup__submit');
        const popupBtnText = "Да";

        if (isLoading) {
            popupBtn.textContent = "Удаляем..."
        } else {
            popupBtn.textContent = popupBtnText;
        }
    }
}
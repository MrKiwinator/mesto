export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);

        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open () {
        this._popup.classList.add("popup_opened");

        document.addEventListener("keydown", this._handleEscClose);
    }

    close () {
        this._popup.classList.remove("popup_opened");

        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners () {
        this._popup.addEventListener("mousedown", (evt) => {
            const eventTarget = evt.target;

            if (eventTarget.classList.contains("popup") || eventTarget.classList.contains("popup__close-btn")) {
                this.close();
            }
        });
    }

    renderLoading (isLoading) {
        const popupBtn = this._popupForm.querySelector('.popup__submit');
        const popupBtnText = "Coхранить";

        if (isLoading) {
            popupBtn.textContent = "Coхранение..."
        } else {
            popupBtn.textContent = popupBtnText;
        }
    }
}
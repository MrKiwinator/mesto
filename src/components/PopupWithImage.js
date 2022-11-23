import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);

        this._previewImg = this._popup.querySelector(".popup__image");
        this._previewCaption = this._popup.querySelector(".popup__caption");
    }

    open(name, link) {
        super.open();
        this._previewImg.src = link;
        this._previewImg.alt = name;
        this._previewCaption.textContent = name;
    }
}
"use strict"

export { previewCardPopup, openPopup, closePopup, closeByOverlay, handlePreviewPicture, closePreviewPicture };

const previewCardPopup = document.querySelector(".zoom-card");

// Opening popup:

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    
    document.addEventListener('keydown', closeByEsc);
}

// Closing popup:

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
   
    document.removeEventListener('keydown', closeByEsc);
}

const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const closeByOverlay = (popup) => {
    popup.addEventListener("mousedown", (evt) => {
        const eventTarget = evt.target;

        if (eventTarget.classList.contains("popup")) {
            closePopup(popup);
        }
    });
}

// Preview picture popup:

const handlePreviewPicture = (name, link) => {

    const previewImg = previewCardPopup.querySelector(".popup__image");
    const previewCaption = previewCardPopup.querySelector(".popup__caption");

    previewImg.src = link;
    previewImg.alt = name;
    previewCaption.textContent = name;

    openPopup(previewCardPopup);
}

const closePreviewPicture = () => {
    closePopup(previewCardPopup);
}
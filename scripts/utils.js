"use strict"

export { popupZoomCard, openPopup, closePopup, closeByEsc, closeByOverlay, handlePreviewPicture, closeZoomCardPopup }

const popupZoomCard = document.querySelector(".zoom-card");

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

    const popupZoomImg = popupZoomCard.querySelector(".popup__image");
    const popupZoomCaption = popupZoomCard.querySelector(".popup__caption");

    popupZoomImg.src = link;
    popupZoomImg.alt = name;
    popupZoomCaption.textContent = name;

    openPopup(popupZoomCard);
}

const closeZoomCardPopup = () => {
    closePopup(popupZoomCard);
}
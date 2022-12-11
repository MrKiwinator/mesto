export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._url + "/users/me", {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    setUserInfo(userData) {
        return fetch(this._url + "/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: userData.user_name,
                about: userData.user_status,
                avatar: userData.user_avatar
            })
        })
            .then(this._checkResponse)
    }

    setUserAvatar(avatar) {
        return fetch(this._url + "/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._checkResponse)
    }

    getCards() {
        return fetch(this._url + "/cards", {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    addCard(cardData) {
        return fetch(this._url + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(this._checkResponse)
    }

    delCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }
}
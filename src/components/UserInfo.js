export default class UserInfo {
    constructor (nameSelector, statusSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._statusSelector = statusSelector;
        this._avatarSelector = avatarSelector;

        this._name = document.querySelector(this._nameSelector);
        this._status = document.querySelector(this._statusSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    } 

    getUserInfo () {
        this._userData = {};

        this._userData.name = this._name.textContent;
        this._userData.status = this._status.textContent;

        return this._userData;
    }

    setUserInfo (name, status) {
        this._name.textContent = name;
        this._status.textContent = status;
    }

    setUserAvatar (avatar) {
        this._avatar.src = avatar;
    }
}
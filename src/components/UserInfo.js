export default class UserInfo {
    constructor (nameSelector, statusSelector) {
        this._nameSelector = nameSelector;
        this._statusSelector = statusSelector;

        this._name = document.querySelector(this._nameSelector);
        this._status = document.querySelector(this._statusSelector);
    }

    getUserInfo () {
        this._userData = {};

        this._userData.name = this._name.textContent;
        this._userData.status = this._status.textContent;

        console.log(this._userData);
        return this._userData;
    }

    setUserInfo (name, status) {
        this._name.textContent = name;
        this._status.textContent = status;
    }
}
export default class Section {
    constructor( { items, renderer }, containerSelector) {
        this._itemsToRender = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._itemsToRender.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }
}
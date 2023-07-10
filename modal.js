"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
// Define the modal class
var Modal = /** @class */ (function () {
    function Modal(data) {
        this.data = data;
        this.createModal();
        this.setContent();
        this.showModal();
    }
    // Create the modal HTML structure
    Modal.prototype.createModal = function () {
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('modal');
        document.body.appendChild(this.modalElement);
        this.modalContentElement = document.createElement('div');
        this.modalContentElement.classList.add('modal-content');
        this.modalElement.appendChild(this.modalContentElement);
    };
    // Set the content of the modal
    Modal.prototype.setContent = function () {
        var _a = this.data, title = _a.title, content = _a.content;
        var titleElement = document.createElement('h2');
        titleElement.textContent = title;
        this.modalContentElement.appendChild(titleElement);
        var contentElement = document.createElement('p');
        contentElement.textContent = content;
        this.modalContentElement.appendChild(contentElement);
    };
    // Show the modal
    Modal.prototype.showModal = function () {
        this.modalElement.style.display = 'block';
    };
    return Modal;
}());
exports.Modal = Modal;
//const modal = new Modal(modalData);

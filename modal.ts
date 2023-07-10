import {ModalData} from './IModalData';

  // Define the modal class
  export class Modal {
    private modalElement: HTMLDivElement;
    private modalContentElement: HTMLDivElement;
  
    constructor(private data: ModalData) {
      this.createModal();
      this.setContent();
      this.showModal();
    }
  
    // Create the modal HTML structure
    private createModal(): void {
      this.modalElement = document.createElement('div');
      this.modalElement.classList.add('modal');
      document.body.appendChild(this.modalElement);
  
      this.modalContentElement = document.createElement('div');
      this.modalContentElement.classList.add('modal-content');
      this.modalElement.appendChild(this.modalContentElement);
    }
  
    // Set the content of the modal
    private setContent(): void {
      const { title, content } = this.data;
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      this.modalContentElement.appendChild(titleElement);
  
      const contentElement = document.createElement('p');
      contentElement.textContent = content;
      this.modalContentElement.appendChild(contentElement);
    }
  
    // Show the modal
    private showModal(): void {
      this.modalElement.style.display = 'block';
    }
  }
  

  //const modal = new Modal(modalData);
  
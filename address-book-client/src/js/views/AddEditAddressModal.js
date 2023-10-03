import Event from "../events/event";
import { MESSAGE, REGEX } from "../constants/message";

class AddEditAddressModal {
  constructor() {
    this.openEvent = new Event();
    this.closeEvent = new Event();
    this.formEvent = new Event();

    this.modalEl = document.querySelector(".modal");
    this.overlayEl = document.querySelector(".overlay");
    this.addBtnEl = document.querySelector(".features__add");
    this.cancelBtnEl = document.querySelector(".modal__buttons__cancel");

    // Attach event to the New-button using the handleOpenAddModal method
    this.addBtnEl.addEventListener("click", this.handleOpenAddModal.bind(this));

    // Attach event to the Cancel-button using the handleCloseAddModal method
    this.cancelBtnEl.addEventListener("click", this.handleCloseAddModal.bind(this));

    this.modalEl.addEventListener("submit", this.handleSubmit.bind(this));
  }

  // Handle open ADD-modal
  handleOpenAddModal() {
    this.modalEl.classList.add("modal--active");
    this.overlayEl.classList.add("overlay--active");
    this.openEvent.trigger();
  }

  // Handle close ADD-modal
  handleCloseAddModal() {
    this.modalEl.classList.remove("modal--active");
    this.overlayEl.classList.remove("overlay--active");

    // Clear any previous error messages and styles
    this.resetModal();
    this.modalEl.reset();

    this.closeEvent.trigger();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validateForm();
    this.formEvent.trigger();
  }

  //----- VALIDATE FORM -----//

  validateForm() {
    // Get values from the input fields
    const modalEl = document.querySelector(".modal");
    const nameInput = modalEl.name;
    const nameError = nameInput.nextElementSibling;
    const relationInput = modalEl.relation;
    const relationError = relationInput.nextElementSibling;
    const phoneInput = modalEl.phone;
    const phoneError = phoneInput.nextElementSibling;
    const emailInput = modalEl.email;
    const emailError = emailInput.nextElementSibling;
    const avatarInput = modalEl.avatar;
    const avatarError = avatarInput.nextElementSibling;

    let isValid = true;

    // Object to store field validation data
    const fields = [
      { name: "name", regex: REGEX.NAME, error: nameError, requiredMessage: MESSAGE.NAME_REQUIRED, invalidMessage: MESSAGE.INVALID_NAME },
      { name: "relation", regex: REGEX.NAME, error: relationError, requiredMessage: MESSAGE.RELATION_REQUIRED, invalidMessage: MESSAGE.INVALID_RELATION },
      { name: "phone", regex: REGEX.PHONE, error: phoneError, requiredMessage: MESSAGE.PHONE_REQUIRED, invalidMessage: MESSAGE.INVALID_PHONE },
      { name: "email", regex: REGEX.EMAIL, error: emailError, requiredMessage: MESSAGE.EMAIL_REQUIRED, invalidMessage: MESSAGE.INVALID_EMAIL },
      { name: "avatar", regex: REGEX.AVATAR, error: avatarError, requiredMessage: MESSAGE.AVATAR_REQUIRED, invalidMessage: MESSAGE.INVALID_AVATAR },
    ];

    // Loop through each field to perform validation
    for (const field of fields) {
      const value = field.name;
      const isValidField = field.regex.test(value);
      const inputEl = modalEl[field.name];
      const errorEl = field.error;

      // Check if the field value is empty
      if (value.trim() === "") {
        inputEl.classList.add("input--warning");
        errorEl.textContent = field.requiredMessage;
        errorEl.classList.add("warning-text--active");
        isValid = false;
      }
      // Check if the field value matches the regex pattern
      else if (!isValidField) {
        inputEl.classList.add("input--warning");
        errorEl.textContent = field.invalidMessage;
        errorEl.classList.add("warning-text--active");
        isValid = false;
      }
      // If the field is valid, remove any warning styling and message
      else {
        inputEl.classList.remove("input--warning");
        errorEl.textContent = "";
        errorEl.classList.remove("warning-text--active");
      }
    }

    return isValid;
  }

  // Clear any previous error messages and styles
  resetModal() {
    this.modalEl.name.classList.remove("input--warning");
    this.nameError.textContent = "";
    this.modalEl.phone.classList.remove("input--warning");
    this.phoneError.textContent = "";
    this.modalEl.email.classList.remove("input--warning");
    this.emailError.textContent = "";
    this.modalEl.avatar.classList.remove("input--warning");
    this.avatarError.textContent = "";
    this.modalEl.relation.classList.remove("input--warning");
    this.relationError.textContent = "";
  }

  //Handle render logic
  render() {}
}

export default AddEditAddressModal;
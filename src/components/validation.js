const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  classError,
  classActive
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classActive);
};

const hideInputError = (formElement, inputElement, classError, classActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classError);
  errorElement.classList.remove(classActive);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, classError, classActive) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classError,
      classActive
    );
  } else {
    hideInputError(formElement, inputElement, classError, classActive);
  }
};

export const enableValidation = (validationObj) => {
  const formList = Array.from(
    document.querySelectorAll(validationObj.formSelector)
  );
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationObj.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationObj.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(
          formElement,
          inputElement,
          validationObj.inputErrorClass,
          validationObj.errorClass
        );
        toggleButtonState(
          inputList,
          buttonElement,
          validationObj.inactiveButtonClass
        );
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, classInactive) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(classInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classInactive);
  }
};

export const clearValidation = (pageForm, validationConfig) => {
  const inputList = Array.from(
    pageForm.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      pageForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
};

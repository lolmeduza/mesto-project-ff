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

const isValid = (formElement, inputElement, validationConfig) => {
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
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
    });
  });
};

export const enableValidation = (validationObj) => {
  const formList = Array.from(
    document.querySelectorAll(validationObj.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationObj);
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

const disableSubmitButton = (buttonElement, classInactive) => {
  buttonElement.classList.add(classInactive);
  buttonElement.disabled = true;
};

export const enableSubmitButton = (buttonElement, classInactive) => {
  buttonElement.classList.remove(classInactive);
  buttonElement.disabled = false;
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
    inputElement.setCustomValidity("");
  });
  const button = pageForm.querySelector(validationConfig.submitButtonSelector);
  disableSubmitButton(button, validationConfig.inactiveButtonClass);
};

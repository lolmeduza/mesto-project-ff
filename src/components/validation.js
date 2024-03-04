// // описаны функции для валидации форм. Из файла экспортируется только функция активации валидации enableValidation и функция очистки ошибок валидации clearValidation;

// //Сделайте функцию enableValidation ответственной за включение валидации всех форм. Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек.

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

// //Создайте функцию clearValidation, которая очищает ошибки валидации формы и делает кнопку неактивной.
// // Эта функция должна принимать как параметры DOM-элемент формы, для которой очищаются ошибки валидации и объект с настройками валидации.
// //Используйте функцию clearValidation при заполнении формы профиля во время её открытия и при очистке формы добавления карточки.
// clearValidation(profileForm, validationConfig);

// // вызов функций enableValidation и clearValidation должен находиться в файле index.js.
// //  А все другие функции, включая декларирование функции enableValidation и валидации форм, — в отдельном файле validation.js.

// // Оба поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы.
// // const regex = /[a-zа-я\-]/gi; // все латинские буквы, и дефис
// //str.match(regex)
// // Оба поля обязательные.
// // В поле «Имя» должно быть от 2 до 40 символов.
// // В поле «О себе» должно быть от 2 до 200 символов.
const showInputError = (formElement, inputElement, errorMessage) => {
  // console.log(`.${inputElement.id}-error`);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  // console.log(`.${inputElement.id}-error`);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};
// Вызовем функцию

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

export const clearValidation = (pageForm, validationConfig) => {
  const inputList = Array.from(pageForm.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(pageForm, inputElement);
  });
};

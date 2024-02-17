// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { createCard, initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
// const whoIsTheGoat = [{ name: "avatar", link: "./images/avatar.jpg" }];

function handleDeleteCard(element) {
  element.remove();
}

function renderCard(element) {
  document.querySelector(".places__list").append(element);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

const keydownCallback = function (evt, modal) {
  console.log("Keydown callback");
  if (evt.key === "Escape") {
    closeModal(modal, keydownCallback, clickCallback);
    // evt.target.removeEventListener("keydown", keydownCallback);
  }
};

const clickCallback = function (evt, modal) {
  console.log("Click callback");
  const classList = evt.target.classList;
  if (
    classList.contains("popup_type_edit") ||
    classList.contains("popup_type_new-card")
  ) {
    closeModal(modal, keydownCallback, clickCallback);
    // evt.target.removeEventListener("click", clickCallback);
  }
};

const modalEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
buttonEdit.addEventListener("click", () => {
  openModal(modalEdit, keydownCallback, clickCallback);
});

const buttonClose = document.querySelector(".popup__close");
buttonClose.addEventListener("click", () => {
  closeModal(modalEdit);
});

const modalAdd = document.querySelector(".popup_type_new-card");
const buttonAdd = document.querySelector(".profile__add-button");
buttonAdd.addEventListener("click", () => {
  openModal(modalAdd, keydownCallback, clickCallback);
});

const buttonAddClose = document.querySelector(".button__add__close");
buttonAddClose.addEventListener("click", () => {
  closeModal(modalAdd);
});

document.querySelector(".popup__input_type_name").placeholder =
  document.querySelector(".profile__title").textContent;
document.querySelector(".popup__input_type_description").placeholder =
  document.querySelector(".profile__description").textContent;

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(modalEdit);
}
formElement.addEventListener("submit", handleFormSubmit);

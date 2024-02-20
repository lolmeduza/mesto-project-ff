// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { createCard, initialCards } from "./components/cards.js";
import { openModal, closeModal, openModalImage } from "./components/modal.js";
// const whoIsTheGoat = [{ name: "avatar", link: "./images/avatar.jpg" }];

function handleDeleteCard(element) {
  element.remove();
}

function renderCard(element) {
  document.querySelector(".places__list").append(element);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard, like, openModalImage));
});

const modalEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
buttonEdit.addEventListener("click", () => {
  openModal(modalEdit);
});

const buttonClose = document.querySelector(".popup__close");
buttonClose.addEventListener("click", () => {
  closeModal(modalEdit);
});
const popupImage = document.querySelector(".popup_type_image");
const buttonImageClose = document.querySelector(".popup__image__close");
buttonImageClose.addEventListener("click", () => {
  closeModal(popupImage);
});

const modalAdd = document.querySelector(".popup_type_new-card");
const buttonAdd = document.querySelector(".profile__add-button");
buttonAdd.addEventListener("click", () => {
  openModal(modalAdd);
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

//клик по фотке

// const modalImage = document.querySelector(".card__image");
// modal.addEventListener("click", () => {
//   openModal(modalImage);
// });

// const buttonClose = document.querySelector(".popup__close");
// buttonClose.addEventListener("click", () => {
//   closeModal(modalEdit);
// });

//это html
// popup_type_image">
//         <div class="popup__content popup__content_content_image">
//           <button type="button" class="popup__close"></button>

function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function addtoStartCard(element) {
  document.querySelector(".places__list").prepend(element);
}

const formCardAdd = document.querySelector('[name="new-place"]');
const cardInput = formCardAdd.querySelector(".popup__input_type_card-name");
const urlInput = formCardAdd.querySelector(".popup__input_type_url");
function handleAddSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: cardInput.value,
    link: urlInput.value,
    alt: cardInput.value,
  };

  addtoStartCard(createCard(data, handleDeleteCard, like, openModalImage));
  closeModal(modalAdd);
  formCardAdd.reset();
}
formCardAdd.addEventListener("submit", handleAddSubmit);

// const popupImage = document.querySelector(".popup__image");
// function popupImage(evt) {
//   openModal(popupImage);
// }

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

const modalEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
buttonEdit.addEventListener("click", () => {
  openModal(modalEdit);
});

const buttonClose = document.querySelector(".popup__close");
buttonClose.addEventListener("click", () => {
  closeModal(modalEdit);
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

// document.addEventListener("click", function (evt) {
//   if (evt.target.classList.contains("card__image")) {
//     evt.target.classList.toggle("popup_type_image");
//   }
// });

// const buttonClose = document.querySelector(".popup__close");
// buttonClose.addEventListener("click", () => {
//   closeModal(modalEdit);
// });

//это html
// popup_type_image">
//         <div class="popup__content popup__content_content_image">
//           <button type="button" class="popup__close"></button>

// добавление карточек
{
  //<form class="popup__form" name="new-place"></form>
  /* <button type="submit" class="button popup__button">Сохранить</button> */
}

// карточки
// function addCard() {
//   const cardTemplate = document.querySelector("#card-template").content;
//   const cardElement = cardTemplate
//     .querySelector(".places__item")
//     .cloneNode(true);
//   const imageElement = document
//     .querySelector(".places__list")
//     .append(cardElement);
//   songElement.querySelector(".song__artist").textContent = artistValue;
//   songElement.querySelector(".song__title").textContent = titleValue;
// }
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

  addtoStartCard(createCard(data, handleDeleteCard));
  closeModal(modalAdd);
  formCardAdd.reset();
}
formCardAdd.addEventListener("submit", handleAddSubmit);

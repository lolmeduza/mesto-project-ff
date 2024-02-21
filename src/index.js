// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  openModal,
  closeModal,
  // openModalImage,
  // openEditModal,
} from "./components/modal.js";
const placesList = document.querySelector(".places__list");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");

function renderCard(element) {
  placesList.append(element);
}
initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard, like, clickImageFullScreen));
});

const modalEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenModalEditProfile = document.querySelector(
  ".profile__edit-button"
);

buttonOpenModalEditProfile.addEventListener("click", () => {
  modalEditProfile.querySelector(".popup__input_type_name").value =
    profileTitle.textContent;
  modalEditProfile.querySelector(".popup__input_type_description").value =
    profileDescription.textContent;
  openModal(modalEditProfile);
});

const buttonCloseModalEditProfile = document.querySelector(".popup__close");
buttonCloseModalEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});
// const popupImage = document.querySelector(".popup_type_image"); //?
const buttonImageClose = document.querySelector(".popup__image__close");
buttonImageClose.addEventListener("click", () => {
  closeModal();
});

const modalAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
buttonOpenAddCardPopup.addEventListener("click", () => {
  openModal(modalAddCard);
});

const buttonCloseAddCardPopup = document.querySelector(".button__add__close");
buttonCloseAddCardPopup.addEventListener("click", () => {
  closeModal();
});

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
function submitFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}
formEditProfile.addEventListener("submit", submitFormEditProfile);

function prependCard(element) {
  placesList.prepend(element);
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

  prependCard(createCard(data, handleDeleteCard, like, clickImageFullScreen));
  closeModal();
  formCardAdd.reset();
}
formCardAdd.addEventListener("submit", handleAddSubmit);

function clickImageFullScreen(data) {
  const popupImage = document.querySelector(".popup_type_image");
  const popImageselected = popupImage.querySelector(".popup__image");
  popImageselected.src = data.link;
  popImageselected.alt = data.alt;
  popupImage.querySelector(".popup__caption").textContent = data.name;
  openModal(popupImage);
}

function createCard(data, onDelete, like, clickImageFullScreen) {
  const listTemplate = document.querySelector("#card-template").content;
  const listElement = listTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardName = listElement.querySelector(".card__image");
  cardName.src = data.link;
  cardName.alt = data.alt;
  listElement.querySelector(".card__title").textContent = data.name;
  const deleteButton = listElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    const listItem = deleteButton.closest(".card");
    onDelete(listItem);
  });

  cardName.addEventListener("click", () => {
    clickImageFullScreen(data);
  });

  listElement.addEventListener("click", () => {});
  const likeButton = listElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  return listElement;
}

function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function handleDeleteCard(element) {
  element.remove();
}

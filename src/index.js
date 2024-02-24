// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { like, handleDeleteCard, createCard } from "./components/card.js";
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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEditProfile);
});

const buttonCloseModalEditProfile = document.querySelector(".popup__close");
buttonCloseModalEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

const popupImage = document.querySelector(".popup_type_image");
const buttonImageClose = document.querySelector(".popup__image__close");
buttonImageClose.addEventListener("click", () => {
  closeModal(popupImage);
});

const modalAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
buttonOpenAddCardPopup.addEventListener("click", () => {
  formCardAdd.reset();
  openModal(modalAddCard);
});

const buttonCloseAddCardPopup = document.querySelector(".button__add__close");
buttonCloseAddCardPopup.addEventListener("click", () => {
  closeModal(modalAddCard);
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
  closeModal(modalEditProfile);
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
  closeModal(modalAddCard);
  formCardAdd.reset();
}
formCardAdd.addEventListener("submit", handleAddSubmit);

function clickImageFullScreen(data) {
  const selectedImage = popupImage.querySelector(".popup__image");
  selectedImage.src = data.link;
  selectedImage.alt = data.alt;
  popupImage.querySelector(".popup__caption").textContent = data.name;
  openModal(popupImage);
}

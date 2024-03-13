// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { handleDeleteCard, createCard } from "./components/card.js";
import {
  enableValidation,
  clearValidation,
  enableSubmitButton,
} from "./components/validation.js";
import {
  cardsServer,
  userServer,
  deleteCard,
  addNewCard,
  changeUserName,
  changeAvatar,
  usersLikeCardAdd,
  usersLikeCardDelete,
} from "./components/api.js";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
enableValidation(validationConfig);
const placesList = document.querySelector(".places__list");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");

function renderCard(element) {
  placesList.append(element);
}

let userGlobal = null;
const loadAvatar = document.querySelector(".profile__image");
Promise.all([cardsServer(), userServer()])
  .then(([cards, user]) => {
    userGlobal = user;
    loadAvatar.setAttribute("style", `background-image:url('${user.avatar}')`);
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    cards.forEach((card) => {
      renderCard(
        createCard(card, onDelete, like, clickImageFullScreen, user._id)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

const modalEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenModalEditProfile = document.querySelector(
  ".profile__edit-button"
);

const buttonChangeNamenJob = document.querySelector(
  ".popup__button_change_name"
);

buttonOpenModalEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  enableSubmitButton(
    buttonChangeNamenJob,
    validationConfig.inactiveButtonClass
  );
  openModal(modalEditProfile);
});

const buttonCloseModalEditProfile = document.querySelector(
  ".popup_type_edit_close"
);

buttonCloseModalEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

buttonChangeNamenJob.addEventListener("click", (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  changeUserName(nameValue, jobValue)
    .then((res) => {
      (profileTitle.textContent = res.name),
        (profileDescription.textContent = res.about);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonChangeNamenJob.textContent = "Сохранить";
    });
  buttonChangeNamenJob.textContent = "Сохранение...";
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
  clearValidation(modalAddCard, validationConfig);
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
  const buttonSaveNewPlace = document.querySelector(
    ".button__close_save_new_place"
  );

  buttonSaveNewPlace.textContent = "Сохранение...";

  addNewCard(cardInput.value, urlInput.value)
    .then((data) => {
      prependCard(
        createCard(data, onDelete, like, clickImageFullScreen, userGlobal._id)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaveNewPlace.textContent = "Сохранить";
    });
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

let cardToDeleteId = null;
let cardToDelete = null;

const confirmButton = document.querySelector(".popup__button_confirm");
const modalConfirm = document.querySelector(".popup_confirm");

const submitConfirm = (evt) => {
  evt.preventDefault();
  confirmButton.textContent = "Удаление...";
  deleteCard(cardToDeleteId)
    .then(() => {
      handleDeleteCard(cardToDelete);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      confirmButton.textContent = "Да";
    });
  closeModal(modalConfirm);
};

modalConfirm.addEventListener("submit", submitConfirm);

function onDelete(cardId, element) {
  const buttonCloseConfirmCardPopup = document.querySelector(
    ".button__confrim__close"
  );
  cardToDeleteId = cardId;
  cardToDelete = element;
  openModal(modalConfirm);
  buttonCloseConfirmCardPopup.addEventListener("click", () => {
    closeModal(modalConfirm);
  });
}

const modalAvatarChange = document.querySelector(".popup_avatar");
const buttonOpenModalAvatar = document.querySelector(".profile__image");

buttonOpenModalAvatar.addEventListener("click", () => {
  clearValidation(modalAvatarChange, validationConfig);
  const avatarInput = document.querySelector(".avatar_url");
  avatarInput.value = "";
  openModal(modalAvatarChange);
});

const buttonCloseModalAvatarChange = document.querySelector(
  ".button__avatar__close"
);

buttonCloseModalAvatarChange.addEventListener("click", () => {
  closeModal(modalAvatarChange);
});

const buttonChangeAvatar = document.querySelector(".popup__button_avatar");
buttonChangeAvatar.addEventListener("click", (evt) => {
  evt.preventDefault();
  const avatarUrl = document.querySelector(".avatar_url").value;
  changeAvatar(avatarUrl)
    .then((res) =>
      loadAvatar.setAttribute("style", `background-image:url('${res.avatar}')`)
    )
    .catch((err) => {
      console.log(err);
    });
  closeModal(modalAvatarChange);
});

const popUps = document.querySelectorAll(".popup");
popUps.forEach((popUp) => {
  popUp.classList.toggle("popup_is-animated");
});

function like(evt, id) {
  const likesCount = evt.target.querySelector(".likes_count");
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? usersLikeCardDelete
    : usersLikeCardAdd;
  likeMethod(id)
    .then((res) => {
      likesCount.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

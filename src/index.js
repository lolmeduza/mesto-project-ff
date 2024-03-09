// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { handleDeleteCard, createCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
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

Promise.all([cardsServer(), userServer()])
  .then(([cards, user]) => {
    userGlobal = user;
    // sessionStorage.setItem("user", user);
    cards.forEach((card) => {
      renderCard(
        createCard(card, onDelete, like, clickImageFullScreen, user._id)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

const loadAvatar = document.querySelector(".profile__image");
userServer()
  .then((res) => {
    loadAvatar.setAttribute("style", `background-image:url('${res.avatar}')`);
  })
  .catch((err) => {
    console.log(err);
  });

userServer()
  .then((res) => {
    profileTitle.innerHTML = `${res.name}`;
    profileDescription.innerHTML = `${res.about}`;
  })
  .catch((err) => {
    console.log(err);
  });

const modalEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenModalEditProfile = document.querySelector(
  ".profile__edit-button"
);

buttonOpenModalEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(modalEditProfile);
});

const buttonCloseModalEditProfile = document.querySelector(
  ".popup_type_edit_close"
);

buttonCloseModalEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

const buttonChangeNamenJob = document.querySelector(
  ".popup__button_change_name"
);
buttonChangeNamenJob.addEventListener("click", (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  changeUserName(nameValue, jobValue)
    .then((res) => {
      (profileTitle.innerHTML = `${res.name}`),
        (profileDescription.innerHTML = `${res.about}`);
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
  const user = userGlobal;

  addNewCard(cardInput.value, urlInput.value)
    .then((data) => {
      console.log(data);
      prependCard(
        createCard(data, onDelete, like, clickImageFullScreen, user._id)
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

const confirmButton = document.querySelector(".popup__button_confirm");
function onDelete(cardId, element) {
  const modalConfirm = document.querySelector(".popup_confirm");
  const buttonCloseConfirmCardPopup = document.querySelector(
    ".button__confrim__close"
  );
  openModal(modalConfirm);
  buttonCloseConfirmCardPopup.addEventListener("click", () => {
    closeModal(modalConfirm);
  });
  modalConfirm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    confirmButton.textContent = "Удаление...";
    deleteCard(cardId)
      .then(() => {
        handleDeleteCard(element);
      })
      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        confirmButton.textContent = "Да";
      });

    closeModal(modalConfirm);
  });
}

const modalAvatarChange = document.querySelector(".popup_avatar");
const buttonOpenModalAvatar = document.querySelector(".profile__image");

buttonOpenModalAvatar.addEventListener("click", () => {
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

function like(evt, id) {
  if (evt.target.classList.contains("card__like-button")) {
    const likesCount = evt.target.querySelector(".likes_count");
    if (evt.target.classList.contains("card__like-button_is-active")) {
      usersLikeCardDelete(id).then((res) => {
        likesCount.textContent = res.likes.length;
        console.log(res);
      });
    } else {
      usersLikeCardAdd(id)
        .then((res) => {
          likesCount.textContent = res.likes.length;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  evt.target.classList.toggle("card__like-button_is-active");
}

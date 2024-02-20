export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Челябинская область",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал",
  },
];

export function createCard(data, onDelete, like, openModalImage) {
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

  const popupImage = document.querySelector(".popup_type_image");
  cardName.addEventListener("click", () => {
    const popImageselected = popupImage.querySelector(".popup__image");
    popImageselected.src = cardName.src;
    popImageselected.alt = cardName.alt;
    popupImage.querySelector(".popup__caption").textContent = data.name;
    openModalImage(popupImage);
  });

  listElement.addEventListener("click", () => {});
  const likeButton = listElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  return listElement;
}

export function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function handleDeleteCard(element) {
  element.remove();
}

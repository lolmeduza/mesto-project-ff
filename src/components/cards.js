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

export function createCard(data, onDelete) {
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
  return listElement;
}

//Если лайкнуть карточку, сердечко поменяет цвет
//Обратите внимание что функцию обработчика лайка нужно передать в функцию создания карточки как аргумент.
// Это понадобится в будущем для интеграции с API.

// doc.addEventListener("click", ({ target }) => {
//   const likeBtn = target.closest(".selector")
// const likeButtonArray = document.querySelectorAll(".card__like-button");
// likeButtonArray.forEach((button, index) => {
//   button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
// });
// likeButtonArray.forEach((button, index) => {
//   button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
// });

// function toggleIsLiked(heart, button) {
//   heart.classList.toggle("is-liked");
//   setButtonText(heart, button);
// }

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
});

import { usersLikeCardAdd, usersLikeCardDelete } from "./api";

export function createCard(data, onDelete, like, clickImageFullScreen, userID) {
  const listTemplate = document.querySelector("#card-template").content;
  const listElement = listTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardName = listElement.querySelector(".card__image");
  cardName.src = data.link;
  cardName.alt = data.alt;
  listElement.querySelector(".card__title").textContent = data.name;
  const likesCount = listElement.querySelector(".likes_count");
  likesCount.textContent = data.likes.length;

  // const isLiked = data.likes.some((like) => like.id == userID);
  // if (isLiked) likeButton.classList.add("card__like-button_is-active");
  // likesCount.textContent = data.likes.length;

  const deleteButton = listElement.querySelector(".card__delete-button");
  // console.log(userID);
  // console.log(data.owner);
  const listItem = deleteButton.closest(".card");
  if (data.owner._id == userID) {
    deleteButton.addEventListener("click", () => {
      // openModal(modalConfirm);
      onDelete(data._id, listItem);
      // deleteCard(data._id);
    });
  } else {
    deleteButton.remove();
  }

  cardName.addEventListener("click", () => {
    clickImageFullScreen(data);
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

// export const createCardElement=(
// data,{
//   onPreviewPicture, onLikeIcon, onDeleteCard
// }userID
// )=>{
// const cardElement = getTemplate();
// const likeButton=cardElement.querySelector('.card__like-button')
// const deleteButton = cardElement.querySelector('.card__delete-button')
// const cardImage = cardElement.querySelector('.card__image')
// const likesCount = cardElement.querySelector('.card__like-count')
// }
//проверка лайка

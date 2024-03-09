export function createCard(data, onDelete, like, clickImageFullScreen, userID) {
  // console.log(data);
  const listTemplate = document.querySelector("#card-template").content;
  const listElement = listTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardName = listElement.querySelector(".card__image");
  cardName.src = data.link;
  cardName.alt = data.alt;
  listElement.querySelector(".card__title").textContent = data.name;
  const likesCount = listElement.querySelector(".likes_count");
  const isLiked = data.likes.some((like) => like._id == userID);
  const likeButton = listElement.querySelector(".card__like-button");
  if (isLiked) likeButton.classList.add("card__like-button_is-active");
  likesCount.textContent = data.likes.length;
  const deleteButton = listElement.querySelector(".card__delete-button");

  const listItem = deleteButton.closest(".card");
  if (data.owner._id == userID) {
    deleteButton.addEventListener("click", () => {
      onDelete(data._id, listItem);
    });
  } else {
    deleteButton.remove();
  }

  cardName.addEventListener("click", () => {
    clickImageFullScreen(data);
  });

  likeButton.addEventListener("click", (evt) => {
    like(evt, data._id);
  });

  return listElement;
}

export function handleDeleteCard(element) {
  element.remove();
}

export function createCard(data, onDelete, like, clickImageFullScreen) {
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

export function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function handleDeleteCard(element) {
  element.remove();
}

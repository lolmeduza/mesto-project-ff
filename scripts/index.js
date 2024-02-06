// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(data, onDelete) {
  const listTemplate = document.querySelector("#card-template").content;
  const listElement = listTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardName = listElement.querySelector(".card__image");
  cardName.src = data.link;
  cardName.alt = data.alt;
  listElement.querySelector(".card__description").textContent = data.name;
  const deleteButton = listElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    const listItem = deleteButton.closest(".card");
    onDelete(listItem);
  });
  return listElement;
}

function handleDeleteCard(element) {
  element.remove();
}

function renderCard(element) {
  document.querySelector(".places__list").append(element);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

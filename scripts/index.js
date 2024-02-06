// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function appendToList(cardList, callBack) {
  cardList.forEach((element) => {
    const cardtemplate = document.querySelector("#card-template").content;
    const listElement = cardtemplate
      .querySelector(".places__item")
      .cloneNode(true);
    listElement.querySelector(".card__image").src = element.link;
    list = document.querySelector(".places__list");
    list.append(listElement);
    const deleteButton = listElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      const listItem = deleteButton.closest(".card");
      callBack(listItem);
    });
  });
}
appendToList(initialCards, removeNode);
function removeNode(element) {
  element.remove();
}

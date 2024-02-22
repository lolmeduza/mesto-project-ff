function keydownCallback(evt) {
  if (evt.key === "Escape") {
    let popOpened = document.querySelector(".popup_is-opened");
    closeModal(popOpened);
  }
}

function clickCallback(evt) {
  const classList = evt.target.classList;
  if (
    classList.contains("popup_type_edit") ||
    classList.contains("popup_type_new-card") ||
    classList.contains("popup_type_image")
  ) {
    let popOpened = document.querySelector(".popup_is-opened");
    closeModal(popOpened);
  }
}

const popUps = document.querySelectorAll(".popup");
popUps.forEach((popUp) => {
  popUp.classList.toggle("popup_is-animated");
});

export function openModal(modal) {
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  modal.classList.toggle("popup_is-opened");
}

export function closeModal(modal) {
  document.removeEventListener("keydown", keydownCallback);
  document.removeEventListener("click", clickCallback);
  modal.classList.remove("popup_is-opened");
}

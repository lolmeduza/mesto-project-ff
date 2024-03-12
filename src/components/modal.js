function keydownCallback(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

function clickCallback(evt) {
  const classList = evt.target.classList;
  if (classList.contains("popup")) {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

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

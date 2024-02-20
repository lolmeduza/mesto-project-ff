let openedModal = "";

function keydownCallback(evt) {
  if (evt.key === "Escape") {
    closeModal(keydownCallback, clickCallback);
  }
}

function clickCallback(evt) {
  const classList = evt.target.classList;
  if (
    classList.contains("popup_type_edit") ||
    classList.contains("popup_type_new-card") ||
    classList.contains("popup_type_image")
  ) {
    closeModal(keydownCallback, clickCallback);
  }
}
const popUps = document.querySelectorAll(".popup");
popUps.forEach((popUp) => {
  popUp.classList.toggle("popup_is-animated");
});

export function openEditModal(modal) {
  modal.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").textContent;
  modal.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").textContent;
  openedModal = modal;
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  openedModal.classList.toggle("popup_is-opened");
}

export function openModal(modal) {
  openedModal = modal;
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  openedModal.classList.toggle("popup_is-opened");
}

export function closeModal() {
  document.removeEventListener("keydown", keydownCallback);
  document.removeEventListener("click", clickCallback);
  openedModal.classList.remove("popup_is-opened");
  if (
    openedModal.querySelector("form") &&
    openedModal.querySelector("form").name === "new-place"
  ) {
    openedModal.querySelector("form").reset();
  }
}

export function openModalImage(modal) {
  openedModal = modal;
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  openedModal.classList.toggle("popup_is-opened");
}

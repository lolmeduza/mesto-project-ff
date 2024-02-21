// let openedModal = "";

function keydownCallback(evt) {
  console.log(evt.target);
  if (evt.key === "Escape") {
    let popOpened = document.querySelector(".popup_is-opened");
    closeModal(popOpened);
  }
}

function clickCallback(evt) {
  console.log(evt.target);
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

// export function openEditModal(modal) {
//   modal.querySelector(".popup__input_type_name").value =
//     document.querySelector(".profile__title").textContent;
//   modal.querySelector(".popup__input_type_description").value =
//     document.querySelector(".profile__description").textContent;
//   openedModal = modal;
//   document.addEventListener("keydown", keydownCallback);
//   document.addEventListener("click", clickCallback);
//   openedModal.classList.toggle("popup_is-opened");
// }

// export function openModal(modal) {
//   openedModal = modal;
//   document.addEventListener("keydown", keydownCallback);
//   document.addEventListener("click", clickCallback);
//   openedModal.classList.toggle("popup_is-opened");
// }

// export function openModalImage(modal) {
//   openedModal = modal;
//   document.addEventListener("keydown", keydownCallback);
//   document.addEventListener("click", clickCallback);
//   openedModal.classList.toggle("popup_is-opened");
// }

export function openModal(modal) {
  // openedModal = modal;
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  modal.classList.toggle("popup_is-opened");
  //
}

export function closeModal(modal) {
  document.removeEventListener("keydown", keydownCallback);
  document.removeEventListener("click", clickCallback);
  console.log(modal.classList);
  modal.classList.remove("popup_is-opened");
  if (
    modal.querySelector("form") &&
    modal.querySelector("form").name === "new-place"
  ) {
    modal.querySelector("form").reset();
  }
}

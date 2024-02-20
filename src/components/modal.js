//  <button type="button" class="popup__close"></button>
// <h3 class="popup__title">Редактировать профиль</h3>
// <form class="popup__form" name="edit-profile">это попап редактировать
// <button class="profile__edit-button" type="button"></button>
//Оттуда экспортируйте функции openModal и closeModal\
function keydownCallback(evt, modal) {
  console.log("Keydown callback", evt, modal);
  if (evt.key === "Escape") {
    closeModal(modal, keydownCallback, clickCallback);
    // evt.target.removeEventListener("keydown", keydownCallback);
  }
}

function clickCallback(evt, modal) {
  console.log("Click callback");
  const classList = evt.target.classList;
  if (
    classList.contains("popup_type_edit") ||
    classList.contains("popup_type_new-card")
  ) {
    closeModal(modal, keydownCallback, clickCallback);
    // evt.target.removeEventListener("click", clickCallback);
  }
}

export function openEditModal(modal) {
  modal.style.display = "flex";
  document.addEventListener("keydown", keydownCallback(evt));
  document.addEventListener("click", clickCallback);
}

export function openModal(modal) {
  modal.style.display = "flex";
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
}

export function closeModal(modal) {
  document.removeEventListener("keydown", keydownCallback);
  document.removeEventListener("click", clickCallback);

  modal.style.display = "none";
}

/* <dialog style="padding: 0">
  <div id="modal-box" style="padding: 1rem">
    <div>Modal content</div>
    <button id="close-modal-btn">Close</button>
  </div>
</dialog>
<button id="show-modal-btn">Show modal</button>
const modal = document.querySelector('dialog')
const modalBox = document.getElementById('modal-box')
const showModalBtn = document.getElementById('show-modal-btn')
const closeModalBtn = document.getElementById('close-modal-btn')

let isModalOpen = false

showModalBtn.addEventListener('click', (e) => {
  modal.showModal()
  isModalOpen = true
  e.stopPropagation()
})

closeModalBtn.addEventListener('click', () => {
  modal.close()
  isModalOpen = false
})

document.addEventListener('click', (e) => {
  if (isModalOpen && !modalBox.contains(e.target)) {
    modal.close()
  }
}) */

export function openModalImage(modal) {
  modal.style.display = "flex";
  document.addEventListener("keydown", keydownCallback);
  document.addEventListener("click", clickCallback);
  console.log(modal);
}

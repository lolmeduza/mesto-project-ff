//  <button type="button" class="popup__close"></button>
// <h3 class="popup__title">Редактировать профиль</h3>
// <form class="popup__form" name="edit-profile">это попап редактировать
// <button class="profile__edit-button" type="button"></button>
//Оттуда экспортируйте функции openModal и closeModal
export function openEditModal(modal, keydownCallback, clickCallback) {
  modal.style.display = "flex";
  document.addEventListener("keydown", (evt) => {
    evt.stopPropagation();
    keydownCallback(evt, modal);
  });
  document.addEventListener("click", (evt) => {
    evt.stopPropagation();
    clickCallback(evt, modal);
  });
}

export function openModal(modal, keydownCallback, clickCallback) {
  modal.style.display = "flex";
  document.addEventListener("keydown", (evt) => {
    evt.stopPropagation();
    keydownCallback(evt, modal);
  });
  document.addEventListener("click", (evt) => {
    evt.stopPropagation();
    clickCallback(evt, modal);
  });
}

export function closeModal(modal, keydownCallback, clickCallback) {
  modal.removeEventListener("keydown", keydownCallback);
  modal.removeEventListener("click", clickCallback);
  // document.removeEventListener("keydown", (evt) => {
  //   evt.stopPropagation();
  //   keydownCallback(evt, modal);
  // });
  // document.removeEventListener("click", (evt) => {
  //   evt.stopPropagation();
  //   clickCallback(evt, modal);
  // });
  modal.style.display = "none";
}

//const buttonOpen = document.querySelector(".popup__close");
{
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
}

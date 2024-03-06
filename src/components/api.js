// описаны функции для взаимодействия с сервером;

// import { createCard } from "./card";

// https://mesto.nomoreparties.co/
export const cardsServer = async () => {
  const res = await fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
    },
  });
  const result_1 = await res.json();
  return result_1;
};

export const userServer = async () => {
  const res = await fetch(
    "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
    {
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      },
    }
  );
  const result_1 = await res.json();
  return result_1;
};

// export const userServer = fetch(
//   "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
//   {
//     method: "GET",
//     headers: {
//       authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((result) => {
//     return result;
//   });

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const changeUserName = fetch(
  "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
  {
    method: "PATCH",
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Andrey Syrbu",
      about: "front student",
    }),
  }
)
  .then((res) => res.json())
  .then((result) => {});

//Добавление новой карточки
export const addNewCard = (nameCard, imageNew) => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameCard,
      link: imageNew,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};
// https://images.unsplash.com/photo-1601042879364-f3947d3f9c16

// DELETE https://nomoreparties.co/v1/cohortId/cards/cardId

export const deleteCard = async (cardId) => {
  const res = await fetch(
    `https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      },
    }
  );
  const result_1 = await res.json();
  return result_1;
};
// https://nomoreparties.co/v1/cohortId/cards/65e21582889c8e0019b3e684

// лайк;
// export const usersLikeCard = fetch(
//   `https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`,
//   {
//     method: "PUT",
//     headers: {
//       authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
//       "Content-Type": "text/json",
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

export const usersLikeCardAdd = async (cardId) => {
  const res = await fetch(
    `https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
        "Content-Type": "application/json",
      },
    }
  );
  const result_likes = await res.json();
  return result_likes;
};

export const usersLikeCardDelete = async (cardId) => {
  const res = await fetch(
    `https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
        "Content-Type": "application/json",
      },
    }
  );
  const result_deleteLikes = await res.json();
  return result_deleteLikes;
};

export const usersLikeChange = async (cardId) => {
  const res = await fetch(
    `https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`,
    {
      method: "PATCH",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
        "Content-Type": "application/json",
      },
    }
  );
  const result_Changelikes = await res.json();
  return result_Changelikes;
};

//АВАТАР
export const changeAvatar = (avatar) => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: avatar,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

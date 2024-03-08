// описаны функции для взаимодействия с сервером;

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

export const changeUserName = async (name, description) => {
  const res = await fetch(
    "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
    {
      method: "PATCH",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }
  );
  const result_1 = await res.json();
  return result_1;
};

export const addNewCard = async (nameCard, imageNew) => {
  const res = await fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameCard,
      link: imageNew,
    }),
  });
  const result_1 = await res.json();
  return result_1;
};

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

export const changeAvatar = async (avatar) => {
  const res = await fetch(
    "https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }
  );
  const result_1 = await res.json();
  return result_1;
};

// описаны функции для взаимодействия с сервером;

const configFetch = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
};

export const cardsServer = async () => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/cards`, {
      headers: {
        authorization: configFetch.authorization,
      },
    });
    const userCards = await res.json();
    return userCards;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const userServer = async () => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/users/me`, {
      headers: {
        authorization: configFetch.authorization,
      },
    });
    const userInfo = await res.json();
    return userInfo;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const changeUserName = async (name, description) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: configFetch.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    });
    const userChangeName = await res.json();
    return userChangeName;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const addNewCard = async (nameCard, imageNew) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: configFetch.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameCard,
        link: imageNew,
      }),
    });
    const userAddNCard = await res.json();
    return userAddNCard;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: configFetch.authorization,
      },
    });
    const userDeleteCard = await res.json();
    return userDeleteCard;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const usersLikeCardAdd = async (cardId) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: configFetch.authorization,
        "Content-Type": "application/json",
      },
    });
    const result_likes = await res.json();
    return result_likes;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const usersLikeCardDelete = async (cardId) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: configFetch.authorization,
        "Content-Type": "application/json",
      },
    });
    const result_deleteLikes = await res.json();
    return result_deleteLikes;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

export const changeAvatar = async (avatar) => {
  try {
    const res = await fetch(`${configFetch.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: configFetch.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    const userChangeAvatar = await res.json();
    return userChangeAvatar;
  } catch (err) {
    return Promise.reject(`Ошибка: ${err}`);
  }
};

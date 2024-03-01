// описаны функции для взаимодействия с сервером;
// https://mesto.nomoreparties.co/
export const cardsServer = fetch(
  "https://nomoreparties.co/v1/pwff-cohort-1/cards",
  {
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
    },
  }
)
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

export const userServer = fetch(
  "https://nomoreparties.co/v1/pwff-cohort-1/users/me",
  {
    method: "GET",
    headers: {
      authorization: "9d491a38-0ff6-417b-ad82-82b9e97a5eb8",
    },
  }
)
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

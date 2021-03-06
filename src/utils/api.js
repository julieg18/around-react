class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Err: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserInfo),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(newCardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCardInfo),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editCardLikes({ cardWasLiked, cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: cardWasLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-1',
  headers: {
    authorization: 'b5addf89-e4e2-4334-ba86-da0986124fda',
    'Content-Type': 'application/json',
  },
});

export default api;

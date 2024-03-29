export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

// ЗАПРОС ДЛЯ ИНФОРМАЦИИ О КАРТОЧКАХ
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
            .then(this._getResponsData)
  }

  // ЗАПРОС ДЛЯ ИНФОРМАЦИИ О ЮЗЕРЕ
  getResponsInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
            .then(this._getResponsData)
  }

  // ЗАПРОС ДЛЯ ОБНОВЛЕНИЯ ИНФОРМАЦИИ ПРОФИЛЯ
  patchRequestPrifile(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
            .then(this._getResponsData)
  }

  //ЗАПРОС НА ДОБАВЛЕНИЕ КАРТОЧЕК
  gitInitialCards({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
  })
            .then(this._getResponsData)
  }

  //ЗАПРОС НА УДАЛЕНИЕ ЛАЙКА
  deleteRequestCardId(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
  })
            .then(this._getResponsData)
  }

  // ЗАПРОС НА ДОБАВЛЕНИЯ ЛАЙКА
  putRequestCardsLikesID(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
            .then(this._getResponsData)
  }

  // ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ
  deleteRequestCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
            .then(this._getResponsData)
  }

  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.avatarlink
      })
    })
            .then(this._getResponsData)
  }

  _getResponsData = res => {
    if(res.ok) return res.json()
    return Promise.reject(err => console.log(`Ошибка - ${err}`))
  }
}





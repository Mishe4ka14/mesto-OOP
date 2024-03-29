import './index.css';
import {
  buttonOpenPopupCard,
  buttonOpenPopupProfile,
  buttonClosePopupCards,
  buttonClosePopupProfile,
  buttonClosePopupImage,
  nameInput,
  nameProfile,
  jobInput,
  jobProfile,
  placeInput,
  linkInput,
  buttonClosePopupAvatar,
  buttonAvatar,
  sectionCards,
  avatarImage,
  templateSelector,
  settings,
} from '../utils/consts.js'

// **************** ИМПОРТ ВСЕХ КЛАССОВ ****************
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

// создаем экземпляр апи, потом вызываем его с нужными методами
const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '19feaa3d-4124-4771-a3db-87bef0dcd15a',
    'Content-Type': 'application/json'
  }
})

// СОЗДАЁМ ЭКЗЕМПЛЯРЫ КЛАССОВ
const cardValidation = new FormValidator(settings, document.querySelector('#form-cards'))
const profileValidation = new FormValidator(settings, document.querySelector('#form-profile'))
const avatarValidation = new FormValidator(settings, document.querySelector('#form-avatar'))
const imagePopup = new PopupWithImage("popup-image", "popup_opened");
const userInfo = new UserInfo(nameProfile,jobProfile, avatarImage);
const section = new Section({
  renderer: (card) => {
    const newItem = addNewCard(card);
    return newItem;
  }
}, sectionCards)

const popupCard = new PopupWithForm('popup-cards', 'popup_opened', (values) =>
  {
  const data = {};
  data.name = values.titleinput
  data.link = values.linkinput
    api.gitInitialCards(data)
      .then(res => {
        popupCard.setBtnStatus(true)
        section.addItem(addNewCard(res, userInfo._userId))
        popupCard.close()
      })
      .catch(err => console.log(`Ошибка - ${err.status}`))
      .finally(() => popupCard.setBtnStatus(false))
  }
)

const popupInfo = new PopupWithForm('popup-profile', 'popup_opened', (values) =>
  {
  const data = {};
  data.name = values.yourname
  data.about = values.aboutyou
    api.patchRequestPrifile(data)
      .then((res) => {
        popupInfo.setBtnStatus(true)
        userInfo.setUserInfo(res)
        popupInfo.close()
      })
      .catch(err => console.log(`Ошибка - ${err.status}`))
      .finally(() => popupInfo.setBtnStatus(false))
  }
)

const popupChangeAvatar = new PopupWithForm('popup-avatar', 'popup_opened', (values) => {

  api.changeAvatar(values)
    .then(res => {
      popupChangeAvatar.setBtnStatus(true)
      userInfo.setUserInfo(res)
      popupChangeAvatar.close()
    })

    .catch(err => console.log(`Ошибка - ${err.status}`))
    .finally(() => popupChangeAvatar.setBtnStatus(false))
})


// ФУНКЦИИ ДЛЯ addNewCard
//удаление карточки с апи
function deleteCard(card, cardId) {
  api.deleteRequestCard(cardId)
  .then(() => {
    card.remove()
  })
  .catch(err => console.log(`Ошибка - ${err.status}`))
}

  // СОЗДАНИЕ КАРТОЧКИ СО СЛУШАТЕЛЯМИ
  function addNewCard (card) {
    const newCard = new Card(card, userInfo._userId, templateSelector, {
      handleCardClick: (link, name) => {
        imagePopup.open(link, name)
      },
      removeCard: deleteCard,
      deleteHandle: function(e, id) {
        api.deleteRequestCardId(id)
        .then((res) => {
        newCard.handleLike(e, res)
      })
        .catch(err => console.log(err))
    },
      putHandle: function(e, id) {
        api.putRequestCardsLikesID(id)
          .then((res) => {
          newCard.handleLike(e, res)
        })
          .catch(err => console.log(err))
    }
  })
  const cardElement = newCard.generate();
  return cardElement
}

  Promise.all([api.getInitialCards(), api.getResponsInfo()])
    .then(([cards, user]) => {
      userInfo.setUserInfo(user)
      section.rendererElement(cards, user._id)
    })
    .catch(err => console.log(err))


    // ЗАПУСК ВАЛИДАЦИИ
    cardValidation.enableValidation()
    profileValidation.enableValidation()
    avatarValidation.enableValidation()

    // ЗАПУСК СЛУШАТЕЛЕЙ
    imagePopup.setEventListeners()
    popupCard.setEventListeners()
    popupInfo.setEventListeners()
    popupChangeAvatar.setEventListeners()


    // слушатели
    buttonOpenPopupProfile.addEventListener('click', () => {
      const userData = userInfo.getUserInfo();
      nameInput.value = userData.name
      jobInput.value = userData.about
      popupInfo.open()
    })

    buttonOpenPopupCard.addEventListener('click', () => {
      popupCard.open()
    })

    buttonAvatar.addEventListener('click', () => {
      popupChangeAvatar.open()
    })




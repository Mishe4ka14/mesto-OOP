import '../pages/index.css';
import { getRequestCards, getRequestUsersMe } from './api.js'
import { createCard, renderCard } from './card.js'
import {openPopup, closePopup} from './modal.js'
import {enableValidation} from './valid.js'
import {handleFormSubmitProfile, handleFormSubmitCards, handleFormSubmitAvatar} from './utils.js'
import {
  buttonOpenPopupCard,
  buttonOpenPopupProfile,
  buttonClosePopupCards,
  buttonClosePopupProfile,
  buttonClosePopupImage,
  formElementCards,
  formElementProfile,
  popupImage,
  popupCards,
  popupProfile,
  nameInput,
  nameProfile,
  jobInput,
  jobProfile,
  placeInput,
  linkInput,
  popupAvatar,
  buttonClosePopupAvatar,
  buttonAvatar,
  formElementAvatar,
  sectionCards,
  avatarImage,
  id,
  templateSelector,
} from './consts.js'
import Api from './classApi.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Card from "./ClassCard.js"


const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '19feaa3d-4124-4771-a3db-87bef0dcd15a',
    'Content-Type': 'application/json'
  }
})

function deleteCard(card, cardId) {
  api.deleteRequestCard(cardId)
    .then(() => {
      card.remove()
    })
    .catch(err => console.log(`Ошибка - ${err.status}`))
}
function deleteLike(id,button, likeCounter) {
  api.deleteRequestCardId(id)
    .then((res) => {
      button.classList.remove('card__heart_active')
      likeCounter.textContent = res.likes.lenght
    })
}

function putLike(id,button, likeCounter) {
  api.putRequestCardsLikesID(id)
    .then((res) => {
      button.classList.add('card__heart_active')
      likeCounter.textContent = res.likes.lenght
    })
}

function addNewCard (card, id) {
  const newCard = new Card(card, userInfo._userId, templateSelector, {
    // handleCardClick: handleOpenImage,

    deleteClickCard: deleteCard,

    deleteHandle: deleteLike,

    putHandle: putLike,
  })
  const cardElement = newCard.generate();
  return cardElement
}



const userInfo = new UserInfo(nameProfile,jobProfile, avatarImage);
const section = new Section({
  renderer: (card) => {
    const newItem = addNewCard(card);
    return newItem;
  }
}, sectionCards)

Promise.all([api.getInitialCards(), api.getResponsInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user)
    section.rendererElement(cards, user._id)
  })



// Promise.all([getRequestUsersMe(), getRequestCards()])
//   .then(([info, cards]) => {
//     nameProfile.textContent = info.name
//     jobProfile.textContent = info.about
//     avatarImage.src = info.avatar
//     id.id = info._id
//     cards.forEach(element => {
//       const cardElemnt = createCard(element)
//       renderCard(cardElemnt, sectionCards)
//     })
//   })
//   .catch(err => console.log(err))


enableValidation({
  formSelector: '.form',
  inputSelector: '.form-input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active',
});

// слушатели
buttonOpenPopupProfile.addEventListener('click', () => {

  nameInput.value = nameProfile.textContent
  jobInput.value = jobProfile.textContent

  openPopup(popupProfile)
})

buttonOpenPopupCard.addEventListener('click', () => {
  placeInput.value = ''
  linkInput.value = ''
  openPopup(popupCards)
})

buttonAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
})

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile)
})

buttonClosePopupCards.addEventListener('click', () => {
  closePopup(popupCards)
})

buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImage)
})

buttonClosePopupAvatar.addEventListener('click', () => {
  closePopup(popupAvatar)
})

formElementCards.addEventListener('submit', handleFormSubmitCards)
formElementProfile.addEventListener('submit', handleFormSubmitProfile)
formElementAvatar.addEventListener('submit', handleFormSubmitAvatar)

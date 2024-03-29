const popupCards = document.querySelector('.popup-cards')
const popupProfile = document.querySelector('.popup-profile')
const popupAvatar = document.querySelector('.popup-avatar')
const formElementAvatar = popupAvatar.querySelector('.popup__form')
const formElementCards = popupCards.querySelector('.popup__form')
const linkInput = formElementCards.querySelector('.name_link')
const nameProfile = document.querySelector('.profile__name')
const jobProfile = document.querySelector('.profile__text')
const formElementProfile = popupProfile.querySelector('.popup__form')
const nameInput = formElementProfile.querySelector('.name_input')
const jobInput = formElementProfile.querySelector('.job_input')
const placeInput = formElementCards.querySelector('.name_place')
const avatarInput = popupAvatar.querySelector('.avatar_input')
const popupImage = document.querySelector('.popup-image')
const buttonCard = popupCards.querySelector('.popup__button')
const buttonClosePopupImage = popupImage.querySelector('.popup__close-image')
const imagePopup = popupImage.querySelector('.popup-image__image')
const popupTitle = popupImage.querySelector('.popup-image__title')
const buttonAvatar = document.querySelector('.avatar__button')
const avatarImage = document.querySelector('.profile__image')
const formCard = document.getElementsByName('#form-profile')
// Для открытия и закрытия попапа
const buttonOpenPopupProfile = document.querySelector('.profile__button') // для открытия кнопки редактирования
const buttonOpenPopupCard = document.querySelector('.profile__add-button') // для открытия попапа добавления карточек
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-image')
const buttonClosePopupCards = popupCards.querySelector('.popup__close-image')
const buttonClosePopupAvatar = popupAvatar.querySelector('.popup__close-image')
const sectionCards = document.querySelector('.cards')
const templateSelector = '#card'
const buttonSaveAvatar = popupAvatar.querySelector('.popup__button')
const id = []
const popups = document.querySelectorAll('.popup')
const settings = {
    formSelector: '.form',
  inputSelector: '.form-input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active',
}


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


export {
    popupCards,
    popupProfile,
    formElementCards,
    linkInput,
    nameProfile,
    jobProfile,
    formElementProfile,
    nameInput,
    jobInput,
    placeInput,
    popupImage,
    buttonClosePopupImage,
    imagePopup,
    popupTitle,
    initialCards,
    buttonOpenPopupCard,
    buttonOpenPopupProfile,
    buttonClosePopupCards,
    buttonClosePopupProfile,
    sectionCards,
    buttonCard,
    templateSelector,
    buttonClosePopupAvatar,
    popupAvatar,
    buttonAvatar,
    buttonSaveAvatar,
    formElementAvatar,
    avatarInput,
    avatarImage,
    id,
    popups,
    settings,
    formCard
}

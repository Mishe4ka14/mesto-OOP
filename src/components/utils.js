import { createCard, renderCard} from './card.js'
import {closePopup, renderLoading} from './modal.js'
import { changeAvatar, gitInitialCards, patchRequestPrifile } from './api.js'
import {
    placeInput,
    linkInput,
    popupCards,
    popupProfile,
    buttonCard,
    sectionCards,
    popupAvatar,
    avatarInput,
    avatarImage,
    nameInput,
    jobInput,
    nameProfile,
    jobProfile,
} from './consts.js'
import UserInfo from './UserInfo.js';

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
<<<<<<< HEAD
  debugger
  const user = new UserInfo(nameProfile, jobProfile, avatarImage)
  debugger
  console.log(user.getUserInfo())
  user.setUserInfo(user.getUserInfo())
=======
  const userInfo = new UserInfo (nameProfile, jobProfile, {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
    headers: {
      authorization: '19feaa3d-4124-4771-a3db-87bef0dcd15a',
      'Content-Type': 'application/json'
    }
  })
  
  userInfo.setUserInfo(nameInput.value, jobInput.value)

  closePopup(popupProfile)
>>>>>>> b08ddca79451fedcc70f0351a2a05b9364948163
  // renderLoading(true, evt)
  // patchRequestPrifile(nameInput.value, jobInput.value)
  //   .then(data => {
  //     nameProfile.textContent = data.name
  //     jobProfile.textContent = data.about
  //     closePopup(popupProfile)
  //   })
  //   .catch(err => console.log(`Ошибка - ${err}`))
  //   .finally(() => renderLoading(false, evt))
}

function handleFormSubmitCards(evt) {
  evt.preventDefault()
  renderLoading(true, evt)
  gitInitialCards(placeInput.value, linkInput.value)
  .then(item => {
    const card = createCard(item);
    renderCard(card, sectionCards);
    closePopup(popupCards)
    buttonCard.disabled = true
    buttonCard.classList.add('form__submit_inactive')
    placeInput.value = ''
    linkInput.value = ''
  })
  .catch(err => console.log(`Ошибка: - ${err.status}`))

  .finally(() => renderLoading(false, evt))
  }

function handleFormSubmitAvatar(evt) {
  evt.preventDefault()
  renderLoading(true, evt)
  changeAvatar(avatarInput.value)
  .then(() => {
    avatarImage.src = avatarInput.value
    closePopup(popupAvatar)
    buttonCard.disabled = true
    buttonCard.classList.add('form__submit_inactive')
    avatarInput.value = ''
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(false, evt))
}

export {handleFormSubmitProfile, handleFormSubmitCards, handleFormSubmitAvatar}


// const logo = new URL('../images/logo/logo.svg', import.meta.url)
// const avatar = new URL('../images/avatar.jpg', import.meta.url)
// const closeImage = new URL('../images/logo/Close-icon.svg', import.meta.url)

// const pictures = [
//   {name: 'logo-header', image: logo},
//   {name: 'avatar', link: avatar},
//   {name: 'Close-image', link: closeImage}
// ]
// ВДРУГ ПРИГОДИТСЯ



function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }


  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true
      buttonElement.classList.add(config.inactiveButtonClass)

    } else {
      buttonElement.disabled = false
      buttonElement.classList.remove(config.inactiveButtonClass)

    }
  }

  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(config.errorClass)
  }

  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = '';
  }

  const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      inputElement.setCustomValidity("");
    }

    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
      hideInputError(formElement, inputElement, config)
    }
  }
  const setEventListener = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config)
        toggleButtonState(inputList, buttonElement, config)
      })
    })
  }

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })


      setEventListener(formElement, config)
    })
  }

  export {enableValidation}

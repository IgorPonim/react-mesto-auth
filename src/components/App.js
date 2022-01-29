import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const [currentUser, setCurrentUser] = useState('иогу писать что хочу, api рулит')


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null)
    setIsPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true)
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }
  function onAddPlace() {
    setIsPlacePopupOpen(true)
  }
  function onCardClick(card) {
    setSelectedCard(card)
  }

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (

    <div className='page'>
      <CurrentUserContext.Provider value={currentUser} >
        <Header />
        <Main
          onEditProfile={onEditProfile}
          onAddPlace={onAddPlace}
          onEditAvatar={onEditAvatar}
          onCardClick={onCardClick}
        />
        <Footer />

        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title='Редактировать профиль' name='profile'>
          <input id='input-name' name='name' minLength='2' maxLength='40' required type='text' placeholder='Имя'
            className='popup__input popup__input_type_name' />
          <span id='input-name-error' className='popup__error popup-username-error'></span>
          <input id='input-job' name='job' minLength='2' maxLength='200' required type='text' placeholder='Род занятий'
            className='popup__input popup__input_type_job' />
          <span id='input-job-error' className='popup__error popup-job-error '></span>
        </PopupWithForm>

        <PopupWithForm isOpen={isPlacePopupOpen} onClose={closeAllPopups} title='Новое место' name='place-info'>
          <input id='input-element-name' name='name' minLength='2' maxLength='40' required type='text'
            placeholder='Название' className='popup__input popup__input_type_name-element' />
          <span id='input-element-name-error' className='popup__error popup-element-error'></span>
          <input id='input-element-link' name='link' type='url' required placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_link' />
          <span id='input-element-link-error' className='popup__error popup-link-error'></span>
        </PopupWithForm>


        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title='Обновить аватар' name='avatar-info'>
          <input id='input-ava-link' name='link' type='url' required placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_link' />
          <span id='input-ava-link-error' className='popup__error popup-link-error'></span>
        </PopupWithForm>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
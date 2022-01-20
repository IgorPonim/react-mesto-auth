import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  document.body.classList.add('body')
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)//изначально нет класса visible
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState() //undefined


  function closeAllPopups() {//функция закрытия попапов
    setIsEditProfilePopupOpen(false);
    setSelectedCard('');
    setIsPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true)//меняем false на true
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }
  function onAddPlace() {
    setIsPlacePopupOpen(true)
  }
  function onCardClick(el) {
    setSelectedCard(el)
  }


  return (

    <div className='page'>
      <Header />
      <Main
        // onEditProfile={() => setIsEditProfilePopupOpen(true)} //можно и так
        // onAddPlace={() => setIsPlacePopupOpen(true)}
        // onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        // onCardClick={(el) => setSelectedCard(el)}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}//прописал фукнции и передал в компонент main, как в задании
        onEditAvatar={onEditAvatar}
        onCardClick={onCardClick}
      />
      <Footer />

      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title='Редактировать профиль' name='profile'>
        <><input id='input-name' name='name' minLength='2' maxLength='40' required type='text' placeholder='Имя'
          className='popup__input popup__input_type_name' />
          <span id='input-name-error' className='popup__error popup-username-error'></span>
          <input id='input-job' name='job' minLength='2' maxLength='200' required type='text' placeholder='Род занятий'
            className='popup__input popup__input_type_job' />
          <span id='input-job-error' className='popup__error popup-job-error '></span></>
      </PopupWithForm>

      <PopupWithForm isOpen={isPlacePopupOpen} onClose={closeAllPopups} title='Новое место' name='place-info'>
        <>  <input id='input-element-name' name='name' minLength='2' maxLength='40' required type='text'
          placeholder='Название' className='popup__input popup__input_type_name-element' />
          <span id='input-element-name-error' className='popup__error popup-element-error'></span>
          <input id='input-element-link' name='link' type='url' required placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_link' />
          <span id='input-element-link-error' className='popup__error popup-link-error'></span></>
      </PopupWithForm>


      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title='Обновить аватар' name='avatar-info'>
        <input id='input-ava-link' name='link' type='url' required placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_link' />
        <span id='input-ava-link-error' className='popup__error popup-link-error'></span>
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

    </div>

  );
}

export default App;
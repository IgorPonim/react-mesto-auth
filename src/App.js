import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  useEffect(() => {
    document.querySelector('body').classList.add('page');
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  return (
    <>
      <Header />
      <Main
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
        onAddPlace={() => setIsPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
      />
      <Footer />

      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={() => setIsEditProfilePopupOpen(false)} title='Редактировать профиль' name='profile'>
        <><input id='input-name' name='name' minLength='2' maxLength='40' required type='text' placeholder='Имя'
          className='popup__input popup__input_type_name' />
          <span id='input-name-error' className='popup__error popup-username-error'></span>
          <input id='input-job' name='job' minLength='2' maxLength='200' required type='text' placeholder='Род занятий'
            className='popup__input popup__input_type_job' />
          <span id='input-job-error' className='popup__error popup-job-error '></span></>
      </PopupWithForm>

      <PopupWithForm isOpen={isPlacePopupOpen} onClose={() => setIsPlacePopupOpen(false)} title='Новое место' name='place-info'>
        <>  <input id='input-element-name' name='name' minLength='2' maxLength='40' required type='text'
          placeholder='Название' className='popup__input popup__input_type_name-element' />
          <span id='input-element-name-error' className='popup__error popup-element-error'></span>
          <input id='input-element-link' name='link' type='url' required placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_link' />
          <span id='input-element-link-error' className='popup__error popup-link-error'></span></>
      </PopupWithForm>


      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={() => setIsEditAvatarPopupOpen(false)} title='Обновить аватар' name='avatar-info'>
        <input id='input-ava-link' name='link' type='url' required placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_link' />
        <span id='input-ava-link-error' className='popup__error popup-link-error'></span>
      </PopupWithForm>

<ImagePopup isOpen={isImagePopupOpen} onClose={() => setisImagePopupOpen(false)}  name='image-popup'></ImagePopup>


    </>
  );
}

export default App;
import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const [currentUser, setCurrentUser] = useState('')//ок
  const [cards, setCards] = useState([]);

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
  //запрос на сервер с данными по профилю, как в пр10
  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  //отправка запроса с новыми данными пользователя
  function editUserInfo(newInfo) {
    api.editUserInfo(newInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //отправка запроса с новой аватаркой
  function handleUpdateAvatar(newLink) {
    api.changeAvatar(newLink)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }




  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //секция куда перенес из main работу с карточками





  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        // cards.sort(() => 0.5 - Math.random()) //надоели одни и те же карточки
        setCards(cards)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }



  function handleCardDelete(card) {
    api.deleteСards(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id)); //наконец то fiter пригодился, я уж думал где его используют..
      })
      .catch((err) => {
        console.log(err)
      })

  }


  function handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])   //обновите стейт cards с помощью расширенной копии текущего массива — используйте оператор ...cards
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }




  return (

    <div className='page'>
      {/* обернул контекстом всю страницу */}
      <CurrentUserContext.Provider value={currentUser} >
        <Header />
        <Main
          onEditProfile={onEditProfile}
          onAddPlace={onAddPlace}
          onEditAvatar={onEditAvatar}
          onCardClick={onCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup  buttonText={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} sendInfo={editUserInfo} />

        <AddPlacePopup buttonText={'Создать'} isOpen={isPlacePopupOpen} onClose={closeAllPopups} addElement={handleAddPlaceSubmit} />

        <EditAvatarPopup  buttonText={'Изменить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} sendInfoAvatar={handleUpdateAvatar} />


        <ImagePopup  onClose={closeAllPopups} card={selectedCard} />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
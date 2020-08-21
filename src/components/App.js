import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    api.getUser().then((user) => {
      setCurrentUser(user);
    });
  });

  function handleEscPopupClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    window.addEventListener('keyup', handleEscPopupClose);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    window.removeEventListener('keyup', handleEscPopupClose);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(newUserInfo) {
    api.editUserInfo(newUserInfo).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onUpdateUser={handleUpdateUser}
        onCardClick={handleCardClick}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isImagePopupOpen={isImagePopupOpen}
        onClosePopup={closeAllPopups}
        selectedCard={selectedCard}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;

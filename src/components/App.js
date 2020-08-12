import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isImagePopupOpen={isImagePopupOpen}
        onClosePopup={closeAllPopups}
        selectedCard={selectedCard}
      />
      <Footer />
    </>
  );
}

export default App;

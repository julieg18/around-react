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
  const [cards, setCards] = useState([]);

  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    api.getUser().then((user) => {
      setCurrentUser(user);
    });

    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  });

  function handleCardLike(card) {
    const cardWasLiked = !card.likes.some((c) => c._id === currentUser._id);

    api.editCardLikes({ cardWasLiked, cardId: card._id }).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter((c) => c._id !== cardId);
      setCards(newCards);
    });
  }

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
    return api.editUserInfo(newUserInfo).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    return api.editUserAvatar(avatar).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  }

  function handleCreatePlace(place) {
    return api.addCard(place).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        selectedCard={selectedCard}
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onUpdateUser={handleUpdateUser}
        onUpdateAvatar={handleUpdateAvatar}
        onCreatePlace={handleCreatePlace}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isImagePopupOpen={isImagePopupOpen}
        onClosePopup={closeAllPopups}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;

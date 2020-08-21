import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatarImage from '../images/avatar-image.jpg';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isImagePopupOpen,
  onClosePopup,
  onUpdateUser,
  selectedCard,
}) {
  const { avatar, about, name, _id: currentUserId } = useContext(
    CurrentUserContext,
  );
  const [cards, setCards] = useState([]);
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  });

  function handleCardLike(card) {
    const cardWasLiked = !card.likes.some((c) => c._id === currentUserId);

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

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={avatar || avatarImage}
            alt="avatar"
            className="profile__avatar-img"
          />
          <button
            className="profile__change-avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <p className="profile__name">{name}</p>
          <button
            className="button profile__button profile__button_type_edit"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{about}</p>
        </div>
        <button
          className="button profile__button profile__button_type_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardClick={onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={onClosePopup}
        onUpdateUser={onUpdateUser}
      />

      <PopupWithForm
        name="add-card-form"
        title="New place"
        isOpen={isAddPlacePopupOpen}
        onClose={onClosePopup}
      >
        <label htmlFor="title-field" className="form__label">
          <input
            placeholder="Title"
            type="text"
            className="form__field form__field_type_title"
            id="title-field"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__field-error" id="title-field-error"></span>
        </label>
        <label htmlFor="img-link-field" className="form__label">
          <input
            placeholder="Image-link"
            type="url"
            className="form__field form__field_type_img-link"
            id="img-link-field"
            required
          />
          <span className="form__field-error" id="img-link-field-error"></span>
        </label>
        <button
          type="submit"
          className="form__submit-button form__submit-button_type_add-card"
        >
          Create
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="change-avatar-form"
        title="Change profile picture"
        isOpen={isEditAvatarPopupOpen}
        onClose={onClosePopup}
      >
        <label htmlFor="avatar-img-field" className="form__label">
          <input
            placeholder="Image-link"
            type="url"
            className="form__field form__field_type_avatar-img"
            id="avatar-img-field"
            required
          />
          <span
            className="form__field-error"
            id="avatar-img-field-error"
          ></span>
        </label>
        <button
          type="submit"
          className="form__submit-button form__submit-button_inactive form__submit-button_type_change-avatar"
        >
          Save
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="delete-cart-form"
        title="Are you sure?"
        onClose={onClosePopup}
      >
        <button className="form__submit-button form__submit-button_type_delete-card">
          Yes
        </button>
      </PopupWithForm>

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={onClosePopup}
      />
    </main>
  );
}

export default Main;

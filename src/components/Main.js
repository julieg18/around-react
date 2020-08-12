import React, { useEffect, useState } from 'react';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
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
  selectedCard,
}) {
  const [userAvatar, setUserAvatar] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [cards, setCards] = useState([]);
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    const getInitalCards = api.getInitialCards();
    const getUser = api.getUser();

    Promise.all([getInitalCards, getUser]).then((data) => {
      const [initialCards, user] = data;
      const { name, about, avatar, _id: userId } = user;
      const updatedCards = initialCards.map((card) => ({
        ...card,
        belongsToUser: card.owner._id === userId,
        isLiked: card.likes.some((user) => user._id === userId),
      }));

      setUserAvatar(avatar);
      setUserDescription(about);
      setUserName(name);
      setCards(updatedCards);
    });
  });

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userAvatar || avatarImage}
            alt="avatar"
            className="profile__avatar-img"
          />
          <button
            className="profile__change-avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <p className="profile__name">{userName}</p>
          <button
            className="button profile__button profile__button_type_edit"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="button profile__button profile__button_type_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card onCardClick={onCardClick} card={card} key={card._id} />
          ))}
        </ul>
      </section>

      <PopupWithForm
        name="edit-profile-form"
        title="Edit profile"
        isOpen={isEditProfilePopupOpen}
        onClose={onClosePopup}
      >
        <label className="form__label" htmlFor="name-field">
          <input
            defaultValue="Jacques Cousteau"
            type="text"
            className="form__field form__field_type_name"
            id="name-field"
            minLength="2"
            maxLength="40"
            pattern="[a-zA-Z -]{1,}"
            required
          />
          <span className="form__field-error" id="name-field-error"></span>
        </label>
        <label className="form__label" htmlFor="job-field">
          <input
            defaultValue="Explorer"
            type="text"
            className="form__field form__field_type_job"
            id="job-field"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__field-error" id="job-field-error"></span>
        </label>
        <button
          type="submit"
          className="form__submit-button form__submit-button_type_edit-profile"
        >
          Save
        </button>
      </PopupWithForm>

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

import React, { useContext } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatarImage from '../images/avatar-image.jpg';

function Main({
  cards,
  onCardLike,
  onCardDelete,
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
  onUpdateAvatar,
  onCreatePlace,
  selectedCard,
}) {
  const { avatar, about, name } = useContext(CurrentUserContext);

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
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
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

      <EditAvatarProfilePopup
        isOpen={isEditAvatarPopupOpen}
        onClose={onClosePopup}
        onUpdateAvatar={onUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={onClosePopup}
        onCreatePlace={onCreatePlace}
      />

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

import React, { useContext } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
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
  onDeleteCardClick,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isDeleteCardPopupOpen,
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
              onCardDelete={onDeleteCardClick}
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

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={onClosePopup}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={onClosePopup}
        onDeleteCard={onCardDelete}
      />
    </main>
  );
}

export default Main;

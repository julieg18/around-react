import React from 'react';

function Card({ onCardClick, card }) {
  const { link, name, likes, isLiked, belongsToUser } = card;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <button
        className={`button element__delete-button ${
          !belongsToUser && 'element__delete-button_hidden'
        }`}
      ></button>
      <img
        className="element__image"
        alt={name}
        src={link}
        onClick={handleClick}
      />
      <div className="element__info">
        <p className="element__title">{name}</p>
        <button
          className={`button element__like-button ${
            isLiked && 'element__like-button_active'
          }`}
        ></button>
        <p className="element__likes-num">{likes.length}</p>
      </div>
    </li>
  );
}

export default Card;

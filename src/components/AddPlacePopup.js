import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onCreatePlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    onCreatePlace({ name, link })
      .then(() => {
        setName('');
        setLink('');
      })
      .then(() => {
        setIsLoading(false);
      });
  }

  function handleTitleInputChange(e) {
    setName(e.target.value);
  }

  function handleImgInputChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-card-form"
      title="New place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title-field" className="form__label">
        <input
          onChange={handleTitleInputChange}
          value={name}
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
          onChange={handleImgInputChange}
          placeholder="Image-link"
          type="url"
          value={link}
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
        {isLoading ? 'Saving...' : 'Create'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

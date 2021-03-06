import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onCreatePlace }) {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameValidationMessage, setNameValidationMessage] = useState('');

  const [link, setLink] = useState('');
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function handleTitleInputChange(e) {
    const input = e.target;
    setName(input.value);
    setIsNameValid(input.validity.valid);
    setNameValidationMessage(input.validationMessage);
  }

  function handleImgInputChange(e) {
    const input = e.target;
    setLink(input.value);
    setIsLinkValid(input.validity.valid);
    setLinkValidationMessage(input.validationMessage);
  }

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
          className={`form__field form__field_type_title ${
            !isNameValid && 'form__field_type_error'
          }`}
          id="title-field"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`form__field-error ${
            !isNameValid && 'form__field-error_active'
          }`}
          id="title-field-error"
        >
          {nameValidationMessage}
        </span>
      </label>
      <label htmlFor="img-link-field" className="form__label">
        <input
          onChange={handleImgInputChange}
          placeholder="Image-link"
          type="url"
          value={link}
          className={`form__field form__field_type_img-link ${
            !isLinkValid && 'form__field_type_error'
          }`}
          id="img-link-field"
          required
        />
        <span
          className={`form__field-error ${
            !isLinkValid && 'form__field-error_active'
          }`}
          id="img-link-field-error"
        >
          {linkValidationMessage}
        </span>
      </label>
      <button
        type="submit"
        className="form__submit-button form__submit-button_type_add-card"
        disabled={
          !isNameValid || !isLinkValid || name.length === 0 || link.length === 0
        }
      >
        {isLoading ? 'Saving...' : 'Create'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

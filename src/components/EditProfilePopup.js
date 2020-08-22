import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const CurrentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const { name: currentUserName, about } = CurrentUser;
    setDescription(about);
    setName(currentUserName);
  }, [CurrentUser]);

  function handleNameInputChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionInputChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile-form"
      title="Edit profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label" htmlFor="name-field">
        <input
          onChange={handleNameInputChange}
          defaultValue={name}
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
          onChange={handleDescriptionInputChange}
          defaultValue={description}
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
  );
};

export default EditProfilePopup;

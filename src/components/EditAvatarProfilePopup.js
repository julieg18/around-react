import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });

    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm
      name="change-avatar-form"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar-img-field" className="form__label">
        <input
          ref={avatarInput}
          placeholder="Image-link"
          type="url"
          className="form__field form__field_type_avatar-img"
          id="avatar-img-field"
          required
        />
        <span className="form__field-error" id="avatar-img-field-error"></span>
      </label>
      <button
        type="submit"
        className="form__submit-button form__submit-button_type_change-avatar"
      >
        Save
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarProfilePopup;

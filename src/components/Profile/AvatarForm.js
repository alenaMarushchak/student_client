import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input/Input'
import urlJoin from 'url-join';

function AvatarForm({
  onChange,
  preview,
  cleanAvatar
}) {
  return (
    <React.Fragment>
      <div className="avatar-block">
        <div className="upload-file">
          <div className="user-avatar" style={{ backgroundImage: `url(${preview})` }}></div>
          <label className="btn-upload-file">
            <span className="icon-file-upload"></span>
            <input type="file" onChange={onChange} accept="image/*" />
          </label>
          <button type="button" className="button-icon delete" onClick={cleanAvatar}>
            <span className="icon-clear"></span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AvatarForm;

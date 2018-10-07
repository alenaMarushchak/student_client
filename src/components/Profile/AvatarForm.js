import React from 'react';

function AvatarForm({
  onChange,
  preview,
  cleanAvatar
}) {
  return (
    <React.Fragment>
      <div className="avatar-block">
          <div className="upload-file">

          <div className="user-avatar">There will be avatar</div>

          <label className="btn-upload-file">

            <span className="icon-file-upload"/>

              <input type="file" onChange={onChange} accept="image/*" />

          </label>

          <button type="button" className="button-icon delete" onClick={cleanAvatar}>

            <span className="icon-clear"/>

          </button>
        </div>


      </div>

    </React.Fragment>
  );
}

export default AvatarForm;

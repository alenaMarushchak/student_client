import React from 'react';

const Item = ({
                  item: {
                      _id,
                      firstName,
                      lastName,
                      email,
                      role
                  },
                  navigateTo
              }) => (

    <tr key={_id} onClick={() => navigateTo(`/users/${_id}`)}>

        <td className="full-name-cell">{`${firstName} ${lastName}`}</td>
        <td className="email-cell">{email}</td>
        <td className="role-cell">{role}</td>

    </tr>
);

export default Item;

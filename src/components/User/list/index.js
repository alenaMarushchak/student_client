import React from 'react';
import Item from './listItem'

function UsersList({
                       values = [],
                       navigateTo
                   }) {
    return (
        <React.Fragment>
            <div className="card">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="full-name-cell">Name</th>
                        <th className="email-cell">Email</th>
                        <th>Role</th>

                    </tr>
                    </thead>

                    <tbody>
                    {values.map(item => (
                        <Item
                            item={item}
                            key={item._id}
                            navigateTo={navigateTo}
                        />
                    ))}
                    </tbody>

                </table>
            </div>
        </React.Fragment>
    );
}

export default UsersList;

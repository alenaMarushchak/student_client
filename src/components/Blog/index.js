import React from 'react';
import Item from './listItem'

function BlogList({
                          values = [],
                          navigateTo,
                          canDeleted,
                          deleteItem
                      }) {
    return (<React.Fragment>
            {values && values.length && values.map( value => <Item item={value} navigateTo={navigateTo} key={value._id}  canDeleted={canDeleted}
                deleteItem={deleteItem} />)}
            </React.Fragment>
    );
}

export default BlogList;

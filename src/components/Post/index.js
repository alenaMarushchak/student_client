import React from 'react';
import Item from './listItem'

function PostList({
                      values = [],
                      navigateTo,
                      canDeleted,
                      deleteItem
                  }) {
    return (<React.Fragment>
            {values.map(value => <Item item={value} navigateTo={navigateTo} key={value._id}
                                       canDeleted={canDeleted} deleteItem={deleteItem}
            />)}
        </React.Fragment>
    );
}

export default PostList;

import React from 'react';
import Item from './listItem'
import {Segment} from 'semantic-ui-react'

function BlogList({
                          values = [],
                          navigateTo
                      }) {
    return (<Segment>
            {values.map( value => <Item item={value} navigateTo={navigateTo} key={value._id}/>)}
            </Segment>
    );
}

export default BlogList;

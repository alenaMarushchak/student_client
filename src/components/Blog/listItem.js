import React from 'react';
import {Card, Icon, Label} from 'semantic-ui-react'

import {formatDate} from '../../services/formatDate'

const Item = ({
                  item: {
                      _id,
                      name,
                      tags = [],
                      author,
                      createdAt,
                      postCount
                  },
                  navigateTo,
                  canDeleted,
                  deleteItem
              }) => (
    <React.Fragment key={_id}>
        <Card>
            {canDeleted ? <Label as='a' onClick={() => {
                deleteItem(_id)
            }}>
                Delete
                <Icon name='delete'/>
            </Label> : null}
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{formatDate(createdAt)}</Card.Meta>
                <Card.Description>{author.name}</Card.Description>
            </Card.Content>
            <Card.Content extra>

                <a style={{marginTop: '20px'}} onClick={() => {
                    navigateTo(_id);
                }}>
                    <Icon name='align left'/>
                    Posts: {postCount}
                </a>

                <div style={{marginTop: '20px'}}>
                    {tags.map(tag => <Label key={tag}>
                        <Icon name='tag'/> {tag}
                    </Label>)}
                </div>
            </Card.Content>
        </Card>
    </React.Fragment>


);

export default Item;

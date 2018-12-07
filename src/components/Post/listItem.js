import React from 'react';
import {Card, Icon, Label} from 'semantic-ui-react'

import {formatDate} from '../../services/formatDate'

const Item = ({
                  item: {
                      _id,
                      title,
                      description,
                      tags = [],
                      author,
                      createdAt,
                      commentCount
                  },
                  navigateTo,
                  canDeleted,
                  deleteItem
              }) => (
    <React.Fragment>
        <Card>
            {canDeleted ? <Label as='a' onClick={() => {
                deleteItem(_id);
            }}>
                Delete
                <Icon name='delete'/>
            </Label> : null}
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>{formatDate(createdAt)} | {author.name}</Card.Meta>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a onClick={() => {
                    navigateTo(_id);
                }}>
                    <Icon name='align left'/>
                    Comment: {commentCount}
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

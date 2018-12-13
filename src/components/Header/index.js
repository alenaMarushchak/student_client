import React from 'react';
import {Header, Image, Button, Grid} from 'semantic-ui-react'

function HeaderComponent({
                             logged,
                             user,
                             logout,
                             redirectToProfile
                         }) {
    return (
        <Grid>
            <Grid.Row>
                {logged && <React.Fragment>
                    <Grid.Column floated='left' width={5} style={{'padding': '20px'}}>

                        <Image circular src={user.avatar ? user.avatar : "/img/logo.jpg"} size='tiny'
                               verticalAlign='middle'
                               onClick={redirectToProfile}/>
                        <div style={{display: 'inline'}}>
                            <Header as={'h2'}>
                                {`${user.firstName} ${user.lastName}`}
                            </Header>
                            <Button content={'Log out'} onClick={logout} size='mini'/>
                        </div>
                    </Grid.Column>
                </React.Fragment>
                }
            </Grid.Row>
        </Grid>
    );
}

export default HeaderComponent;

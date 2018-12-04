import React from 'react';
import {Table} from "semantic-ui-react";

const Item = ({points, getKey}) => (<React.Fragment>
    {points && points.length ? points.map(point => <Table.Cell key={getKey()}>
        <Table.Cell>
            {point.typeOfPoint}
        </Table.Cell>
        <Table.Cell>
            {point.value}
        </Table.Cell>
    </Table.Cell>) : null}
</React.Fragment>);

export default Item;
import React, {Component} from 'react';

import {Segment} from "semantic-ui-react";

import SelectList from '../../../components/CustomElements/TagsInput/selectList';
import Input from '../../../components/CustomElements/TagsInput/input';

class TagsInputComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    onAddItem = (selectedOption) => {
        this.props.addItem(selectedOption);

        console.log(selectedOption);
        this.setState({
            value: ''
        });
    };

    onChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    onDeleteItem = (selectedOption) => {
        this.props.deleteItem(selectedOption);
    };

    onKeyDown = (event) => {
        const key = event.key;

        if (key !== "Enter") {
            return;
        }

        this.onAddItem(this.state.value);
    };

    render() {
        let {selectedOptions} = this.props;

        return <React.Fragment>
            <Segment>
                <SelectList
                    values={selectedOptions}
                    onDeleteItem={this.onDeleteItem}
                />

                <Input
                    loadOptions={this.openDropDown}
                    onChange={this.onChange}
                    value={this.state.value}
                    onKeyDown={this.onKeyDown}
                />
            </Segment>
        </React.Fragment>
    }
}

export default TagsInputComponent;
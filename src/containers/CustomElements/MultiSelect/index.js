import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Segment} from "semantic-ui-react";

import actions from '../../../actions'

import Pagination from '../../../components/CustomElements/Pagination'

import SelectedOptions from '../../../components/CustomElements/MultiSelect/selectedOptions';
import Toolbar from '../../../components/CustomElements/MultiSelect/toolbar';
import DropDown from '../../../components/CustomElements/MultiSelect/dropDown';

const {
    loadSelectListSaga,
} = actions;


const filterSelectedValues = (selectedOptions, options) => {

    return options.filter(item => {
        const index = selectedOptions.findIndex(selectedItem => selectedItem._id === item._id);

        return index === -1;
    })
};

class MultiSelectComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropDownOpen: false,
            search        : ''
        }
    }

    search = (event) => {
        const {
            typeOfApi
        } = this.props;

        this.setState({
            search: event.target.value
        });

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getOptions(typeOfApi, 1, this.state.search);
        }, 500);
    };

    onPageChange = (page) => {
        const {typeOfApi} = this.props;
        this.props.getOptions(typeOfApi, page.selected + 1, this.state.search)
    };

    onAddItem = (selectedOption) => {
        this.props.addItem(selectedOption);

        this.setState({
            isDropDownOpen: false,
            search        : ''
        });
    };

    onClose = () => {
        this.setState({
            isDropDownOpen: false,
            search        : ''
        });
    };

    openDropDown = () => {
        const {typeOfApi} = this.props;

        this.setState({
            isDropDownOpen: true
        });

        this.props.getOptions(typeOfApi, 1, this.state.search);
    };

    onDeleteItem = (selectedOption) => {
        this.props.deleteItem(selectedOption);
    };

    render() {
        const {isDropDownOpen} = this.state;

        let {select: options, totalPages, page, selectedOptions} = this.props;

        options = filterSelectedValues(selectedOptions, options);

        const pagination = options.length ? <Pagination
            value={page}
            totalPages={totalPages}
            onChange={this.onPageChange}
        /> : null;

        const List = isDropDownOpen ?
            <React.Fragment>
                <DropDown
                    options={options}
                    onAddItem={this.onAddItem}
                    onClose={this.onClose}
                />
                {pagination}
            </React.Fragment>
            : null;

        return <React.Fragment>
            <Segment>
                <SelectedOptions
                    values={selectedOptions}
                    onDeleteItem={this.onDeleteItem}
                />

                <Toolbar
                    loadOptions={this.openDropDown}
                    onChange={this.search}
                    value={this.state.search}
                />

                {List}

            </Segment>
        </React.Fragment>
    }
}

const connectedMultiSelectComponent = connect(
    store => {
        return ({
            select    : store.selectOptions.list.values,
            page      : store.selectOptions.list.page,
            totalPages: store.selectOptions.list.totalPages,
        })
    },
    dispatch => ({
        getOptions: (typeOfApi, page, search) => dispatch(loadSelectListSaga(typeOfApi, page, search)),
    }))(MultiSelectComponent);

export default connectedMultiSelectComponent;
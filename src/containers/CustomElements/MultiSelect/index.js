import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Segment} from "semantic-ui-react";

import actions from '../../../actions'

import Pagination from '../../../components/CustomElements/Pagination'

import SelectedOptions from '../../../components/CustomElements/MultiSelect/selectedOptions';
import Toolbar from '../../../components/CustomElements/MultiSelect/toolbar';
import DropDown from '../../../components/CustomElements/MultiSelect/dropDown';

import {getFormValues} from "redux-form";

const {
    loadSelectListSaga,
} = actions;


const initialSubjects = [
    {
        name: 'Some subject1',
        _id : 1
    },
    {
        name: 'Some subject2',
        _id : 2
    }
];

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
            isDropDownOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    search = () => {
        const {
            typeOfApi
        } = this.props;

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getOptions(typeOfApi, 1);
        }, 500);
    };

    onPageChange = (page) => {
        const {typeOfApi} = this.props;
        this.props.getOptions(typeOfApi, page.selected + 1)
    };

    onAddItem = (selectedOption) => {
        this.props.addItem(selectedOption);
        this.setState({
            isDropDownOpen : false
        });
    };

    onClose = () => {
        this.setState({
            isDropDownOpen: false
        });
    };

    openDropDown = () => {
        const {typeOfApi} = this.props;

        this.setState({
            isDropDownOpen: true
        });

        this.props.getOptions(typeOfApi, 1);
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
                />

                {List}

            </Segment>
        </React.Fragment>
    }
}

const connectedMultiSelectComponent = connect(
    store => ({
        select     : store.selectOptions.list.values,
        page       : store.selectOptions.list.page,
        totalPages : store.selectOptions.list.totalPages,
        toolbarVals: getFormValues('selectToolbar')(store)
    }),
    dispatch => ({
        getOptions: (typeOfApi, page) => dispatch(loadSelectListSaga(typeOfApi, page)),
    }))(MultiSelectComponent);

export default connectedMultiSelectComponent;
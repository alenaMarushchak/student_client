import React, {Component} from "react";
import {Tab} from 'semantic-ui-react'

import OwnSubjects from '../OwnSubjects';
import SubjectsList from '../SubjectsList';

class TeachersHomePage extends Component {
    constructor(props) {
        super(props);
    }

    panes = [
        {menuItem: 'My subjects', render: () => <OwnSubjects/>},
        {menuItem: 'All Subjects', render: () => <SubjectsList/>},
    ];

    render() {
        return (<Tab panes={this.panes}/>)
    }
}

export default TeachersHomePage;
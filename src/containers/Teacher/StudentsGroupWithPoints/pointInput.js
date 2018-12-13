import React, {Component} from 'react'
import {Label} from 'semantic-ui-react'

class PointInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : this.props.value,
            edited: false,
            saved : false
        };
    }

    handleChange = (event) => {
        const value = +event.target.value;

        if (isNaN(value) || value < 0 || value > 100) {
            return;
        }

        this.setState({
            value : value,
            edited: true,
            saved : false
        });
    };

    handleKeyDown = (event) => {
        const key = event.key;

        if (key !== "Enter") {
            return;
        }

        this.setState({
            edited: false,
            saved : true
        });

        let type = this.props.type;
        let value = this.state.value;

        this.props.saveChanges({
            value,
            type
        });
    };

    render() {
        const {value, edited} = this.state;

        return (<React.Fragment>
            {edited ? <Label pointing='right'>Press enter to save changes</Label> : null}
            <input type="text" value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        </React.Fragment>);
    }
}

export default PointInput;
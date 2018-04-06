import React from 'react'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'


export default class DropDownInput extends React.Component {
    render() {
        return (
            <ButtonToolbar>
                <DropdownButton
                    title={this.props.dropDownTitle}
                    id="dropdown-size-medium"
                >
                    {
                        this.props.selections.map((selection, idx) => {
                            return (
                                <MenuItem
                                    eventKey={idx}
                                    key={idx}
                                    onClick={() => this.props.makeSelection(selection)}
                                >
                                    {selection}
                                </MenuItem>
                            )
                        })
                    }
                </DropdownButton>
            </ButtonToolbar>
        )
    }
}

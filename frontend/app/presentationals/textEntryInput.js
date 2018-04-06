import React from 'react'
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap'


export default class TextEntryInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: ''
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(event) {
        this.setState({ textValue: event.target.value });
    }
    render() {
        return (
            <Form horizontal>
                <FormGroup controlId={this.props.title}>
                    <Col sm={2}>
                        {this.props.title}
                    </Col>
                    <Col sm={6}>

                        <FormControl
                            onChange={this.handleTextChange}
                            type="text"
                            placeholder={this.props.placeholder}
                            value={this.state.textValue}
                        />
                    </Col>
                    <Col sm={2}>
                        <Button
                            onClick={() => this.props.setValue(this.state.textValue)}
                            bsStyle="primary">{this.props.buttonTitle}
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

import React from 'react';
import {
    Button,

    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,

} from 'reactstrap';

class ModelCusttom extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (

            <Modal
                isOpen={true}
            >
                <ModalHeader >Are you sure to delete?</ModalHeader>
                <ModalBody>
                    You won't revert this action
</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.doSomething} >
                        Delete
</Button>{' '}
                    <Button color="secondary" onClick={this.props.cancel}>
                        Cancel
</Button>
                </ModalFooter>
            </Modal>


        )
    }

}
export default ModelCusttom;
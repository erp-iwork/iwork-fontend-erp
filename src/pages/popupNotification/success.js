import React from 'react';
import {
    Button,

    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,

} from 'reactstrap';

class SuccessModal extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (

            <Modal
                isOpen={true}
            >
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody color="primary" >{this.props.message} </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.okFun}>
                        OK
              </Button>{' '}

                </ModalFooter>
            </Modal>


        )
    }

}
export default SuccessModal;

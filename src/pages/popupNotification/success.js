import React from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';

class SuccessModal extends React.Component {
    constructor(props) {
        super(props);
        this.onShow = this.onShow.bind(this)
    }
    componentWillMount() {
        this.onShow()
    }
    onShow() {
        setTimeout(this.props.okFun, 1000)
    }
    render() {

        return (
            <Modal
                isOpen={this.props.show}
            >
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody color="primary" >{this.props.message} </ModalBody>
            </Modal>


        )
    }

}
export default SuccessModal;
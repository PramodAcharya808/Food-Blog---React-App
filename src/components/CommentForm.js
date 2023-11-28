import React,{Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody,
    Row,Col,Label } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';

    const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          
            isModalOpen:false,
            
        }

        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        
    }

    
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    handleSubmitComment(values) {
        alert('Current State is: ' + JSON.stringify(values));
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
render(){
    return(
        <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                <Row className="form-group">
                <Label htmlFor="firstname" md={2}>Rating</Label>
                <Col md={10}>
                    <Control.select model=".rating" id="rating" name="rating"
                        placeholder="Rating"
                        className="form-control" >
                        <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
                        </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="yourname" md={2}>Your Name</Label>
                <Col md={10}>
                    <Control.text model=".yourname" id="yourname" name="yourname"
                        placeholder="Last Name"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(2), maxLength: maxLength(15)
                        }}
                         />
                    <Errors
                        className="text-danger"
                        model=".yourname"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                     />
                </Col>
            </Row>
            
            <Row className="form-group">
                <Label htmlFor="email" md={2}>Comment</Label>
                <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        placeholder="Comment"
                        className="form-control"
                        
                     />
                </Col>
            </Row>
                    <Row className="form-group">
                        <Col md={{size:10, offset: 2}}>
                            <Button type="submit" color="primary">
                           Submit Comment
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
                

                </ModalBody>
                </Modal>
                </div>
    );
}
}

export default CommentForm;
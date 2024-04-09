import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import { useBlogMutations } from "../../../hooks/useBlogMutations";


export function CreateBlogModal({ show, handleClose }) {
    const [formState, setFormState ] = useState({
        topic: '',
        title: '',
        author: '',
        content: ''
    })
    const { isLoading, error, postBlog } = useBlogMutations()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await postBlog(formState)
            handleClose()
            window.location.reload();
        } catch {
            console.error('could not save blog entry, please try again later')
        }
        
    }

    return (
        
        <Modal show={show}
            onHide={handleClose}
            size="lg"
            centered
        >            
            <Modal.Header closeButton>
                <Modal.Title>Create Blog Post</Modal.Title>
            </Modal.Header>
            
                <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <fieldset disabled={isLoading}>
                        <Form.Group className="mb-3" controlId="formTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" 
                                          onChange={(e) => setFormState({ ...formState, topic: e.target.value ?? ''})} 
                                          placeholder="Enter a topic" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" 
                                          onChange={(e) => setFormState({ ...formState,  title: e.target.value ?? ''})}
                                          placeholder="Enter a title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" 
                                          onChange={(e) => setFormState({ ...formState, author: e.target.value ?? ''})}
                                          placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" 
                                          rows={3} 
                                          onChange={(e) => setFormState({ ...formState, content: e.target.value ?? ''})}
                                          placeholder="What do you want to say?" />
                        </Form.Group>
                    </fieldset>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        
    )
}

CreateBlogModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}
import Button from "react-bootstrap/esm/Button";
import { BlogsList } from "../../Components/blogs/blogs-list";
import "./blog.css"
import { CreateBlogModal } from "../../Components/Modals/create-blog-modal/create-blog-modal";
import { useState } from "react";

export function Blog() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <div className="blogs-heading">
                <h1>Blog Page</h1>
                <Button onClick={handleShow}>New</Button>
            </div>
            <BlogsList/>
            <CreateBlogModal show={show} handleClose={handleClose}></CreateBlogModal>
        </>
    )
        
}
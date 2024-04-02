import { BlogType } from '../../types/blog'
import BSCard from 'react-bootstrap/Card'
import BSButton from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export function BlogCard (props) {
    
    if (props.blog === undefined) {
        return <p>Blog was not passed in props</p>
    }

    const { title, topic, content, author, created_date } = props.blog
    const navigate = useNavigate();

    function readMore(blog) {
        navigate(blog.id)
    }

    return (
        <BSCard>
            <BSCard.Header>{topic}</BSCard.Header>
            <BSCard.Body> 
                <BSCard.Title>{title}</BSCard.Title>
                <BSCard.Text>{content}</BSCard.Text>
                <BSCard.Footer>
                    <p>{author}</p>
                    <p>{created_date}</p>
                    <BSButton variant="primary" onClick={() => readMore(props.blog)}>Read More</BSButton>
                </BSCard.Footer>
            </BSCard.Body>
        </BSCard>
    )
}

BlogCard.propTypes = {
    blog: BlogType
}

BlogCard.defaultProps = {
    blog: undefined
}
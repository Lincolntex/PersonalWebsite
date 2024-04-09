import { BlogType } from '../../types/blog'
import BSCard from 'react-bootstrap/Card'
import BSButton from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useBlogMutations } from '../../hooks/useBlogMutations'

export function BlogCard (props) {
    const { error, deleteBlog } = useBlogMutations()
    if (props.blog === undefined) {
        return <p>Blog was not passed in props</p>
    }

    const { title, topic, content, author, created_date } = props.blog
    const navigate = useNavigate();

    function readMore(blog) {
        navigate(blog.id)
    }

    async function handleDeleteBlog (blog) {
        try {
            await deleteBlog(blog)
            window.location.reload();
        } catch {
            console.error('Could not delete blog entery. Do it again!')
        }
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
                    <BSButton variant="primary" style={{marginRight: `0.5rem`}}onClick={() => readMore(props.blog)}>Read More</BSButton>
                    <BSButton variant="danger" onClick={() => handleDeleteBlog(props.blog)}>Delete</BSButton>
                    {error && <p style={{ color: 'red'}}>{error}</p>}
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
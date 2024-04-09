import { BlogType } from "../../types/blog";

export function BlogDetails ({ blog }) {
    
    if (blog === undefined) {
        return <p>No blog entry found</p>
    }

    const { title, topic, author, content, created_date, last_updated } = blog

    return (
        <>
            <h1>{ topic }</h1>
            <h2>{ title } - { author }</h2>
            <p>{ content }</p>
            <p>Created: { created_date } | Last Updated: { last_updated }</p>
        </>
    )
}

BlogDetails.propTypes = {
    blog: BlogType.isRequired
}
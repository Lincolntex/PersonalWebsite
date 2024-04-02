import { useBlogs } from "../../hooks/useBlogs";
import { BlogCard } from "./blog-card";
import './blogs-list.css'


export function BlogsList() {
    const { response, error, loading } = useBlogs()

    if (loading) {
        return <p>Fetching Blogs</p>
    }
    return (
        <div className="grid-container">
            {(response && error === undefined) 
                ? response.map(blog => <BlogCard key={blog.id}blog={blog}/>)
                : <p>No blogs to display.</p>
            }
            {error && <p style={{ color: 'red' }}>Could not retrieve blogs, check console.</p>}
        </div>
    )
}
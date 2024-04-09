import { useBlogById } from "../../hooks/useBlogById"
import { useParams } from "react-router-dom"
import { BlogDetails } from "../../Components/blogs/blog-details"

export function BlogDetailsPage() {
    
    const params = useParams()
    const { response, error, isLoading } = useBlogById( params.uuid )
    
    if (error) {
        return <p style={{color:'red'}}>Could not fetch blog with id {params.uuid}</p>
    }
    
    if (isLoading) {
        return <p>Fetching blog details... </p>
    }

    console.log(response)

    return (
        <BlogDetails blog={response}/>
    )
}
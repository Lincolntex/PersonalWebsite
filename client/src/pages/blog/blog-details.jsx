import { useBlogById } from "../../hooks/useBlogById"
import { useParams } from "react-router-dom"

export function BlogDetails() {
    
    const params = useParams()
    const { response, error, isLoading } = useBlogById( params.uuid )
    
    if (error) {
        return <p style={{color:'red'}}>Could not fetch blog with id {params.uuid}</p>
    }
    
    if (isLoading) {
        return <p>Fetching blog details... </p>
    }

    return (
        <p>{JSON.stringify(response)}</p>
    )
}
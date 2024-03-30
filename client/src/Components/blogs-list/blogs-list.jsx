import { useBlogs } from "../hooks/useBlogs";


export function BlogsList() {
    const { response, error, loading } = useBlogs()

    if (loading) {
        return <p>Fetching Blogs</p>
    }
    return (
        <>
            {response && <p>{JSON.stringify(response)}</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </>
    )
}
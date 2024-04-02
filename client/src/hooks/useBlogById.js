import { useEffect, useState } from "react";

export function useBlogById(id) {
    const [apiResponse, setApiResponse] = useState(undefined)
    const [apiError, setApiError] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function makeBlogsFetch() {
            try {
                setIsLoading(true);
        
                const response = await fetch(`/blogs/${id}`);
                try {
                    const json = await response.json();
                    setApiResponse(json);
                } catch (err) {
                    setApiError(new Error('Could not parse json response' + err))
                } finally {
                    setIsLoading(false)
                }
            } catch (err) {
                setApiError(new Error('request failure', err))
                setIsLoading(false)
            }
        }

        makeBlogsFetch()
    }, [])

    

    return {
        response: apiResponse,
        error: apiError,
        loading: isLoading
    }
}
import { useState } from "react";

export function useBlogMutations() {
    const [apiResponse, setApiResponse] = useState(undefined)
    const [apiError, setApiError] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    async function postBlog(payload) {
        try {
            setIsLoading(true);

            const response = await fetch(`/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            try {
                const json = await response.json();
                setApiResponse(json[0]);
                setApiError(undefined)
            } catch (err) {
                setApiError(new Error('Could not parse json response' + err))
            } finally {
                setIsLoading(false)
            }
        } catch (err) {
            setApiError(new Error('Could not post new Blog', err))
            setIsLoading(false)
        }
    }

    async function deleteBlog(blog) {
        try {
            setIsLoading(true);

            const response = await fetch(`/blogs/${blog.id}`, {
                method: 'DELETE',
            });
            try {
                const json = await response.json();
                setApiResponse(json);
                setApiError(undefined)
            } catch (err) {
                setApiError(new Error('Could not parse json response' + err))
            } finally {
                setIsLoading(false)
            }
        } catch (err) {
            setApiError(new Error('Could not delete Blog entry', err))
            setIsLoading(false)
        }
    }





    return {
        response: apiResponse,
        error: apiError,
        loading: isLoading,
        postBlog,
        deleteBlog
    }
}

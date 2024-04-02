import PropTypes from 'prop-types'

export const BlogType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_date: PropTypes.string.isRequired,
    last_updated: PropTypes.string.isRequired
})
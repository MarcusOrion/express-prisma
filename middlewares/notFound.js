function notFound( req, res, next) {
    res.status(404).json({
        status: 404,
        error: 'Resource not found'
    })
}

export default notFound;
module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        error: {
            status_code: statusCode,
            message: err.message,
            validation: err.validation
        }
    });
}
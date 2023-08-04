const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        statusCode: statusCode,
        message: err.message,
      });

}
module.exports = errorHandler

// middleware/internalServerError.js
module.exports = function(err, req, res, next) {
    console.error(err.stack); // Log the error
    res.status(500).render('500', { title: 'Internal Server Error' });
};

const tMiddleware = (request, response, next) => {
	console.log('middleware running');
	next();
};

module.exports = {
	tMiddleware,
};

if (process.env.NODE_ENV === 'production') {
    exports.API_URL = 'http://18.233.195.47/v1';
}
else {
    exports.API_URL = "http://localhost:3000/v1"
}
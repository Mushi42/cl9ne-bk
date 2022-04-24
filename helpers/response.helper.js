const success = (res, message, data) => {
    res.status(200).json({
        status: 'success',
        message,
        data
    });
};

const bad = (res, message, data) => {
    res.status(400).json({
        status: 'Error',
        message,
        data
    });
};

const notFound = (res, message) => {
    res.status(404).json({
        status: 'Error',
        message: 'Not found!',
    });
};

const serverError = (res, data) => {
    res.status(202).json({
        status: 'Error',
        message: 'Internal Server Error',
        data: process.env.ENV === "dev" ? data: undefined
    });
};

const setResponse = (res, { type, message = '', data = {} }) => {
    switch (type) {
        case 'success':
            success(res, message, data)
            break;
        case 'bad':
            bad(res, message, data);
            break;
        case 'notFound':
            notFound(res)
            break;
        case 'serverError':
            serverError(res, data)
            break;

        default:
            break;
    }
};

module.exports = {
    setResponse
}
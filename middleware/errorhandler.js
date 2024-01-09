const { constants } = require("../constants");
const errorhandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {

        case constants.Not_found:
            res.json({ title: "Not Founded", message: err.message, stacktrack: err.stack });
            break;

        case constants.Validation_error:
            res.json({ title: "Validation Failed", message: err.message, stacktrack: err.stack });
            break;

        case constants.Forbidden:
            res.json({ title: "Forbidden Page", message: err.message, stacktrack: err.stack });
            break;

        case constants.Unauthoriaed:
            res.json({ title: "Unauthorized", message: err.message, stacktrack: err.stack });
            break;

        case constants.Server_error:
            res.json({ title: "Server_error", message: err.message, stacktrack: err.stack });
            break;

        default:
            res.json({ title: "Unkown Error", error: err.message, stacktrack: err.stack });
            break;
    }
}

module.exports = errorhandler;
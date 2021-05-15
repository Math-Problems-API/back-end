"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    const status = req.status || 500;
    res.status(status);
    console.log(err);
    res.send({
        status,
        message: err.message,
    });
};
//# sourceMappingURL=error.js.map
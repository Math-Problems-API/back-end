"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const err = new Error("Not Found");
    req.status = 404;
    next(err);
};
//# sourceMappingURL=not-found.js.map
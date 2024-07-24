"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationQuery = void 0;
const paginationQuery = ({ page, limit }) => {
    let pagee = 1;
    let limitt = 10;
    if (page) {
        pagee = parseInt(page);
    }
    if (limit) {
        limitt = parseInt(limit);
    }
    return { page: pagee, limit: limitt };
};
exports.paginationQuery = paginationQuery;

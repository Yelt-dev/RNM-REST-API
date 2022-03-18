"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
function mainRoute(req, res) {
    let today = new Date();
    return res.json({
        Application: 'Rick And Morty Multiverse REST API',
        Status: 'Running',
        Mode: 'Production',
        Auth: true
    });
}
exports.mainRoute = mainRoute;

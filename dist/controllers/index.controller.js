"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
function mainRoute(req, res) {
    let today = new Date();
    let date = 'day: ' + today.getDate() + ', week: ' + today.getDay() + ', month: ' + today.getMonth() + ', year: ' + today.getFullYear() + ', hours: ' + today.getHours() + ', minutes: ' + today.getMinutes() + ', seconds: ' + today.getSeconds();
    return res.json({
        Application: 'Rick N Morty REST API',
        Status: 'Running',
        Mode: 'Production',
        SSL: 'Active',
        Access: date,
        Auth: true
    });
}
exports.mainRoute = mainRoute;

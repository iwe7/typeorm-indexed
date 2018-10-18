"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const connection_1 = require("../connection");
const select_1 = require("./select");
function update(table, data) {
    return connection_1.ConnectionManager.ready().pipe(operators_1.filter(res => res), operators_1.switchMap(() => {
        return select_1.select(table).save(data);
    }));
}
exports.update = update;
//# sourceMappingURL=update.js.map
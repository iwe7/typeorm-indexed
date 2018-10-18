"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const connection_1 = require("../connection");
const select_1 = require("./select");
const operators_2 = require("rxjs/operators");
function remove(table, data) {
    return connection_1.ConnectionManager.ready().pipe(operators_2.filter(res => res), operators_1.switchMap(() => {
        const table$ = select_1.select(table);
        return table$.hasValue(data).pipe(operators_1.switchMap(() => {
            return table$.remove(data);
        }));
    }));
}
exports.remove = remove;
//# sourceMappingURL=remove.js.map
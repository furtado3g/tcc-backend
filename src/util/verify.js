"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Verify = /** @class */ (function () {
    function Verify() {
    }
    Verify.prototype.verifyNullIncommingFields = function (values) {
        var returnable = true;
        Object.keys(values).forEach(function (key) {
            if (values[key] == undefined || values[key] == 'null' || values[key] == '') {
                returnable = false;
            }
        });
        return returnable;
    };
    return Verify;
}());
exports.default = Verify;

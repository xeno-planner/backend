"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOptionalEnum = exports.IsOptionalNumber = exports.IsOptionalBoolean = exports.IsOptionalString = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const OptionalField = (...decorators) => {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), ...decorators);
};
const IsOptionalString = () => {
    return OptionalField((0, class_validator_1.IsString)());
};
exports.IsOptionalString = IsOptionalString;
const IsOptionalBoolean = () => {
    return OptionalField((0, class_validator_1.IsBoolean)());
};
exports.IsOptionalBoolean = IsOptionalBoolean;
const IsOptionalNumber = () => {
    return OptionalField((0, class_validator_1.IsNumber)());
};
exports.IsOptionalNumber = IsOptionalNumber;
const IsOptionalEnum = (...params) => {
    return OptionalField((0, class_validator_1.IsEnum)(...params));
};
exports.IsOptionalEnum = IsOptionalEnum;
//# sourceMappingURL=validation.js.map
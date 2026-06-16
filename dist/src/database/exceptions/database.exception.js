"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = exports.EntityAlreadyExistsException = exports.EntityNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class EntityNotFoundException extends common_1.NotFoundException {
    constructor(entity, identifier) {
        super(`${entity} with identifier '${identifier}' not found`);
    }
}
exports.EntityNotFoundException = EntityNotFoundException;
class EntityAlreadyExistsException extends common_1.BadRequestException {
    constructor(entity, identifier) {
        super(`${entity} with identifier '${identifier}' already exists`);
    }
}
exports.EntityAlreadyExistsException = EntityAlreadyExistsException;
class DatabaseException extends common_1.BadRequestException {
    constructor(message) {
        super(message);
    }
}
exports.DatabaseException = DatabaseException;
//# sourceMappingURL=database.exception.js.map
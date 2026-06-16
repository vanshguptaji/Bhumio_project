import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class EntityNotFoundException extends NotFoundException {
    constructor(entity: string, identifier: string);
}
export declare class EntityAlreadyExistsException extends BadRequestException {
    constructor(entity: string, identifier: string);
}
export declare class DatabaseException extends BadRequestException {
    constructor(message: string);
}

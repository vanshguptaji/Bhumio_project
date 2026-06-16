import { BadRequestException, NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity: string, identifier: string) {
    super(`${entity} with identifier '${identifier}' not found`);
  }
}

export class EntityAlreadyExistsException extends BadRequestException {
  constructor(entity: string, identifier: string) {
    super(`${entity} with identifier '${identifier}' already exists`);
  }
}

export class DatabaseException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateInitialSchema1717513600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create properties table
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'zipCode',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            columnNames: ['address', 'zipCode'],
            isUnique: false,
          },
          {
            columnNames: ['city'],
          },
        ],
      }),
      true,
    );

    // Create disclosures table
    await queryRunner.createTable(
      new Table({
        name: 'disclosures',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'propertyId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'fileUrl',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'summary',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'structuralRisk',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'legalRisk',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'financialRisk',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'environmentalRisk',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'overallRisk',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'extractedData',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            columnNames: ['propertyId'],
          },
          {
            columnNames: ['createdAt'],
          },
        ],
      }),
      true,
    );

    // Create offers table
    await queryRunner.createTable(
      new Table({
        name: 'offers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'propertyId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'buyerName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'buyerEmail',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'offerPrice',
            type: 'numeric',
            precision: 15,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'closingDays',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'inspectionContingency',
            type: 'boolean',
            default: false,
          },
          {
            name: 'financingContingency',
            type: 'boolean',
            default: false,
          },
          {
            name: 'appraisalContingency',
            type: 'boolean',
            default: false,
          },
          {
            name: 'additionalConditions',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'strengthScore',
            type: 'numeric',
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'closingProbability',
            type: 'numeric',
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'riskLevel',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'explanation',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'extractedData',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            columnNames: ['propertyId'],
          },
          {
            columnNames: ['buyerEmail'],
          },
          {
            columnNames: ['strengthScore'],
          },
          {
            columnNames: ['createdAt'],
          },
        ],
      }),
      true,
    );

    // Create loan_documents table
    await queryRunner.createTable(
      new Table({
        name: 'loan_documents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'offerId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'lenderName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'approved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'loanAmount',
            type: 'numeric',
            precision: 15,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'financingType',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'financingStrength',
            type: 'numeric',
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'extractedData',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            columnNames: ['offerId'],
          },
          {
            columnNames: ['lenderName'],
          },
          {
            columnNames: ['approved'],
          },
        ],
      }),
      true,
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'disclosures',
      new TableForeignKey({
        columnNames: ['propertyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'properties',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'offers',
      new TableForeignKey({
        columnNames: ['propertyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'properties',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'loan_documents',
      new TableForeignKey({
        columnNames: ['offerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'offers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    const loansTable = await queryRunner.getTable('loan_documents');
    const offersTable = await queryRunner.getTable('offers');
    const disclosuresTable = await queryRunner.getTable('disclosures');

    if (loansTable) {
      const loansForeignKey = loansTable.foreignKeys.find(
        (fk) => fk.columnNames[0] === 'offerId',
      );
      if (loansForeignKey) {
        await queryRunner.dropForeignKey('loan_documents', loansForeignKey);
      }
    }

    if (offersTable) {
      const offersForeignKey = offersTable.foreignKeys.find(
        (fk) => fk.columnNames[0] === 'propertyId',
      );
      if (offersForeignKey) {
        await queryRunner.dropForeignKey('offers', offersForeignKey);
      }
    }

    if (disclosuresTable) {
      const disclosuresForeignKey = disclosuresTable.foreignKeys.find(
        (fk) => fk.columnNames[0] === 'propertyId',
      );
      if (disclosuresForeignKey) {
        await queryRunner.dropForeignKey('disclosures', disclosuresForeignKey);
      }
    }

    // Drop tables
    await queryRunner.dropTable('loan_documents', true);
    await queryRunner.dropTable('offers', true);
    await queryRunner.dropTable('disclosures', true);
    await queryRunner.dropTable('properties', true);
  }
}

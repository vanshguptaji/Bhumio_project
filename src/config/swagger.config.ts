import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Bhumio - AI-Powered Real Estate Intelligence API')
    .setDescription(
      'Backend system for processing real-estate transaction documents and generating AI-powered property intelligence',
    )
    .setVersion('1.0.0')
    .addTag(
      'Properties',
      'Property management endpoints',
    )
    .addTag(
      'Disclosures',
      'Property disclosure document processing',
    )
    .addTag(
      'Offers',
      'Buyer offer management',
    )
    .addTag(
      'Loans',
      'Loan document management',
    )
    .addTag(
      'Intelligence',
      'Offer scoring and analysis',
    )
    .addTag(
      'Dashboard',
      'Seller dashboard aggregation',
    )
    .addTag(
      'Health',
      'System health checks',
    )
    .setContact(
      'Bhumio Support',
      'https://bhumio.com',
      'support@bhumio.com',
    )
    .setLicense(
      'Proprietary',
      '',
    )
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://api.bhumio.com', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
    },
    customCss: `
      .topbar { display: none; }
      .swagger-ui .topbar { display: block; }
    `,
  });
}

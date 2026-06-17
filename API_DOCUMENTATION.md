# Bhumio AI Real Estate Intelligence API Documentation

**Base URL:** `http://localhost:3000`

---

## 📋 Table of Contents

1. [Properties](#properties)
2. [Disclosures](#disclosures)
3. [Offers](#offers)
4. [Loans](#loans)
5. [Intelligence](#intelligence)
6. [Dashboard](#dashboard)
7. [Response Formats](#response-formats)

---

## Properties

### Create Property

**Endpoint:** `POST /property` or `POST /api/v1/properties`

**Request Body:**
```json
{
  "address": "123 Main Street",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94102"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "address": "123 Main Street",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94102",
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

**Validation Rules:**
- `address`: 5-255 characters (required)
- `city`: 2-100 characters (required)
- `state`: 2-50 characters (required)
- `zipCode`: 5-10 characters (required)

---

### Get All Properties

**Endpoint:** `GET /property` or `GET /api/v1/properties`

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "address": "123 Main Street",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102",
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:30:00Z"
  }
]
```

---

### Get Property by ID

**Endpoint:** `GET /property/:id` or `GET /api/v1/properties/:id`

**Path Parameters:**
- `id` (UUID): Property ID

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "address": "123 Main Street",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94102",
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

**Error (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Property with identifier '550e8400-e29b-41d4-a716-446655440000' not found"
}
```

---

### Update Property

**Endpoint:** `PUT /property/:id` or `PUT /api/v1/properties/:id`

**Path Parameters:**
- `id` (UUID): Property ID

**Request Body (all fields optional):**
```json
{
  "address": "456 Oak Avenue",
  "city": "Los Angeles",
  "state": "CA",
  "zipCode": "90001"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "address": "456 Oak Avenue",
  "city": "Los Angeles",
  "state": "CA",
  "zipCode": "90001",
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:35:00Z"
}
```

---

### Delete Property

**Endpoint:** `DELETE /property/:id` or `DELETE /api/v1/properties/:id`

**Path Parameters:**
- `id` (UUID): Property ID

**Response (204 No Content):** Empty body

---

## Disclosures

### Create Disclosure

**Endpoint:** `POST /api/v1/disclosures`

**Request Body:**
```json
{
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "fileUrl": "s3://bucket-name/disclosure-2026-06-17.pdf"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "fileUrl": "s3://bucket-name/disclosure-2026-06-17.pdf",
  "summary": null,
  "structuralRisk": 0,
  "legalRisk": 0,
  "financialRisk": 0,
  "environmentalRisk": 0,
  "overallRisk": 0,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

**Validation Rules:**
- `propertyId`: Valid UUID (required)
- `fileUrl`: String, max 500 characters (required)

---

### Get All Disclosures

**Endpoint:** `GET /api/v1/disclosures`

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "propertyId": "550e8400-e29b-41d4-a716-446655440000",
    "fileUrl": "s3://bucket-name/disclosure-2026-06-17.pdf",
    "summary": "Property has excellent condition with no major issues",
    "structuralRisk": 10,
    "legalRisk": 5,
    "financialRisk": 8,
    "environmentalRisk": 3,
    "overallRisk": 8,
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:35:00Z"
  }
]
```

---

### Get Disclosure by ID

**Endpoint:** `GET /api/v1/disclosures/:id`

**Path Parameters:**
- `id` (UUID): Disclosure ID

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "fileUrl": "s3://bucket-name/disclosure-2026-06-17.pdf",
  "summary": "Property has excellent condition with no major issues",
  "structuralRisk": 10,
  "legalRisk": 5,
  "financialRisk": 8,
  "environmentalRisk": 3,
  "overallRisk": 8,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:35:00Z"
}
```

---

### Get Disclosures by Property ID

**Endpoint:** `GET /api/v1/disclosures/property/:propertyId`

**Path Parameters:**
- `propertyId` (UUID): Property ID

**Response (200 OK):**
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "propertyId": "550e8400-e29b-41d4-a716-446655440000",
    "fileUrl": "s3://bucket-name/disclosure-2026-06-17.pdf",
    "summary": "Property has excellent condition with no major issues",
    "structuralRisk": 10,
    "legalRisk": 5,
    "financialRisk": 8,
    "environmentalRisk": 3,
    "overallRisk": 8,
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:35:00Z"
  }
]
```

---

### Update Disclosure

**Endpoint:** `PUT /api/v1/disclosures/:id`

**Path Parameters:**
- `id` (UUID): Disclosure ID

**Request Body (all fields optional):**
```json
{
  "summary": "Updated summary",
  "fileUrl": "s3://bucket-name/disclosure-updated.pdf"
}
```

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "fileUrl": "s3://bucket-name/disclosure-updated.pdf",
  "summary": "Updated summary",
  "structuralRisk": 10,
  "legalRisk": 5,
  "financialRisk": 8,
  "environmentalRisk": 3,
  "overallRisk": 8,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:40:00Z"
}
```

---

### Delete Disclosure

**Endpoint:** `DELETE /api/v1/disclosures/:id`

**Path Parameters:**
- `id` (UUID): Disclosure ID

**Response (204 No Content):** Empty body

---

## Offers

### Create Offer

**Endpoint:** `POST /offer` or `POST /api/v1/offers`

**Request Body:**
```json
{
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "John Smith",
  "buyerEmail": "john.smith@example.com",
  "offerPrice": 850000,
  "closingDays": 30,
  "inspectionContingency": true,
  "financingContingency": true,
  "appraisalContingency": false,
  "additionalConditions": "Seller to provide home warranty"
}
```

**Response (201 Created):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "John Smith",
  "buyerEmail": "john.smith@example.com",
  "offerPrice": 850000,
  "closingDays": 30,
  "inspectionContingency": true,
  "financingContingency": true,
  "appraisalContingency": false,
  "additionalConditions": "Seller to provide home warranty",
  "strengthScore": null,
  "closingProbability": null,
  "riskLevel": null,
  "explanation": null,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

**Validation Rules:**
- `propertyId`: Valid UUID (required)
- `buyerName`: String, max 255 characters (required)
- `buyerEmail`: Valid email format (required)
- `offerPrice`: Positive number (required)
- `closingDays`: Positive integer (required)
- `inspectionContingency`: Boolean (optional, default: false)
- `financingContingency`: Boolean (optional, default: false)
- `appraisalContingency`: Boolean (optional, default: false)
- `additionalConditions`: String (optional)

---

### Get All Offers

**Endpoint:** `GET /offer` or `GET /api/v1/offers`

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "propertyId": "550e8400-e29b-41d4-a716-446655440000",
    "buyerName": "John Smith",
    "buyerEmail": "john.smith@example.com",
    "offerPrice": 850000,
    "closingDays": 30,
    "inspectionContingency": true,
    "financingContingency": true,
    "appraisalContingency": false,
    "additionalConditions": "Seller to provide home warranty",
    "strengthScore": 78.5,
    "closingProbability": 85,
    "riskLevel": "LOW",
    "explanation": "Strong offer with good financing and reasonable contingencies",
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:35:00Z"
  }
]
```

---

### Get Offer by ID

**Endpoint:** `GET /offer/:id` or `GET /api/v1/offers/:id`

**Path Parameters:**
- `id` (UUID): Offer ID

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "John Smith",
  "buyerEmail": "john.smith@example.com",
  "offerPrice": 850000,
  "closingDays": 30,
  "inspectionContingency": true,
  "financingContingency": true,
  "appraisalContingency": false,
  "additionalConditions": "Seller to provide home warranty",
  "strengthScore": 78.5,
  "closingProbability": 85,
  "riskLevel": "LOW",
  "explanation": "Strong offer with good financing and reasonable contingencies",
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:35:00Z"
}
```

---

### Get Offers by Property ID

**Endpoint:** `GET /offer/property/:propertyId` or `GET /api/v1/offers/property/:propertyId`

**Path Parameters:**
- `propertyId` (UUID): Property ID

**Response (200 OK):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "propertyId": "550e8400-e29b-41d4-a716-446655440000",
    "buyerName": "John Smith",
    "buyerEmail": "john.smith@example.com",
    "offerPrice": 850000,
    "closingDays": 30,
    "inspectionContingency": true,
    "financingContingency": true,
    "appraisalContingency": false,
    "additionalConditions": "Seller to provide home warranty",
    "strengthScore": 78.5,
    "closingProbability": 85,
    "riskLevel": "LOW",
    "explanation": "Strong offer with good financing and reasonable contingencies",
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:35:00Z"
  }
]
```

---

### Update Offer

**Endpoint:** `PUT /offer/:id` or `PUT /api/v1/offers/:id`

**Path Parameters:**
- `id` (UUID): Offer ID

**Request Body (all fields optional):**
```json
{
  "buyerName": "Jane Smith",
  "offerPrice": 870000,
  "inspectionContingency": false
}
```

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "propertyId": "550e8400-e29b-41d4-a716-446655440000",
  "buyerName": "Jane Smith",
  "buyerEmail": "john.smith@example.com",
  "offerPrice": 870000,
  "closingDays": 30,
  "inspectionContingency": false,
  "financingContingency": true,
  "appraisalContingency": false,
  "additionalConditions": "Seller to provide home warranty",
  "strengthScore": 82.1,
  "closingProbability": 88,
  "riskLevel": "LOW",
  "explanation": "Improved offer with higher price and fewer contingencies",
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:40:00Z"
}
```

---

### Delete Offer

**Endpoint:** `DELETE /offer/:id` or `DELETE /api/v1/offers/:id`

**Path Parameters:**
- `id` (UUID): Offer ID

**Response (204 No Content):** Empty body

---

## Loans

### Create Loan Document

**Endpoint:** `POST /loan` or `POST /api/v1/loans`

**Request Body:**
```json
{
  "offerId": "770e8400-e29b-41d4-a716-446655440002",
  "lenderName": "Chase Bank",
  "approved": true,
  "loanAmount": 680000,
  "financingType": "Conventional"
}
```

**Response (201 Created):**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "offerId": "770e8400-e29b-41d4-a716-446655440002",
  "lenderName": "Chase Bank",
  "approved": true,
  "loanAmount": 680000,
  "financingType": "Conventional",
  "financingStrength": 95,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

**Validation Rules:**
- `offerId`: Valid UUID (required)
- `lenderName`: String, max 255 characters (required)
- `approved`: Boolean (required)
- `loanAmount`: Positive number (required)
- `financingType`: String, max 100 characters (required)

---

### Get All Loans

**Endpoint:** `GET /loan` or `GET /api/v1/loans`

**Response (200 OK):**
```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "offerId": "770e8400-e29b-41d4-a716-446655440002",
    "lenderName": "Chase Bank",
    "approved": true,
    "loanAmount": 680000,
    "financingType": "Conventional",
    "financingStrength": 95,
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:30:00Z"
  }
]
```

---

### Get Loan by ID

**Endpoint:** `GET /loan/:id` or `GET /api/v1/loans/:id`

**Path Parameters:**
- `id` (UUID): Loan ID

**Response (200 OK):**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "offerId": "770e8400-e29b-41d4-a716-446655440002",
  "lenderName": "Chase Bank",
  "approved": true,
  "loanAmount": 680000,
  "financingType": "Conventional",
  "financingStrength": 95,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:30:00Z"
}
```

---

### Get Loans by Offer ID

**Endpoint:** `GET /loan/offer/:offerId` or `GET /api/v1/loans/offer/:offerId`

**Path Parameters:**
- `offerId` (UUID): Offer ID

**Response (200 OK):**
```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "offerId": "770e8400-e29b-41d4-a716-446655440002",
    "lenderName": "Chase Bank",
    "approved": true,
    "loanAmount": 680000,
    "financingType": "Conventional",
    "financingStrength": 95,
    "createdAt": "2026-06-17T10:30:00Z",
    "updatedAt": "2026-06-17T10:30:00Z"
  }
]
```

---

### Update Loan Document

**Endpoint:** `PUT /loan/:id` or `PUT /api/v1/loans/:id`

**Path Parameters:**
- `id` (UUID): Loan ID

**Request Body (all fields optional):**
```json
{
  "approved": true,
  "loanAmount": 700000
}
```

**Response (200 OK):**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "offerId": "770e8400-e29b-41d4-a716-446655440002",
  "lenderName": "Chase Bank",
  "approved": true,
  "loanAmount": 700000,
  "financingType": "Conventional",
  "financingStrength": 96,
  "createdAt": "2026-06-17T10:30:00Z",
  "updatedAt": "2026-06-17T10:40:00Z"
}
```

---

### Delete Loan Document

**Endpoint:** `DELETE /loan/:id` or `DELETE /api/v1/loans/:id`

**Path Parameters:**
- `id` (UUID): Loan ID

**Response (204 No Content):** Empty body

---

## Intelligence

### Get Offer Score

**Endpoint:** `GET /api/v1/intelligence/offer/:offerId/score`

**Path Parameters:**
- `offerId` (UUID): Offer ID

**Response (200 OK):**
```json
{
  "offerId": "770e8400-e29b-41d4-a716-446655440002",
  "strengthScore": 78.5,
  "closingProbability": 85,
  "riskLevel": "LOW",
  "explanation": "Strong offer with good financing and reasonable contingencies. Buyer has approved loan and is motivated.",
  "scoringDetails": {
    "offerPriceScore": 80,
    "financingStrengthScore": 95,
    "contingenciesScore": 70,
    "closingSpeedScore": 85
  }
}
```

---

## Dashboard

### Get Property Intelligence Dashboard

**Endpoint:** `GET /api/v1/dashboard/property/:propertyId`

**Path Parameters:**
- `propertyId` (UUID): Property ID

**Response (200 OK):**
```json
{
  "property": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "address": "123 Main Street",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102"
  },
  "disclosure": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "summary": "Property is in excellent condition with no major issues",
    "structuralRisk": 10,
    "legalRisk": 5,
    "financialRisk": 8,
    "environmentalRisk": 3,
    "overallRisk": 8
  },
  "offers": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "buyerName": "John Smith",
      "offerPrice": 850000,
      "closingDays": 30,
      "strengthScore": 78.5,
      "closingProbability": 85,
      "riskLevel": "LOW"
    }
  ],
  "rankings": [
    {
      "rank": 1,
      "offerId": "770e8400-e29b-41d4-a716-446655440002",
      "strengthScore": 78.5,
      "reason": "Best overall offer with strong financing and quick closing"
    }
  ],
  "strongestOffer": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "buyerName": "John Smith",
    "buyerEmail": "john.smith@example.com",
    "offerPrice": 850000,
    "closingDays": 30,
    "strengthScore": 78.5,
    "closingProbability": 85,
    "riskLevel": "LOW",
    "explanation": "Strong offer with good financing and reasonable contingencies"
  }
}
```

---

## Response Formats

### Success Response

All successful responses follow this pattern:

**Status Code:** 200 (OK), 201 (Created), 204 (No Content)

**Body:** Direct JSON object or array

```json
{
  "id": "uuid",
  "field1": "value1",
  "field2": 123,
  ...
}
```

---

### Error Response

**Status Code:** 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

**Body:**
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

### Common Error Codes

| Status Code | Message | Reason |
|---|---|---|
| 400 | Validation error | Invalid request body |
| 404 | Not found | Resource doesn't exist |
| 500 | Internal server error | Server error |

---

## Data Types

### UUID Format
```
550e8400-e29b-41d4-a716-446655440000
```

### Email Format
```
user@example.com
```

### Price Format
Decimal number (e.g., `850000`, `680000.50`)

### Date/Time Format
ISO 8601 (e.g., `2026-06-17T10:30:00Z`)

### Risk Levels
- `LOW` (0-33)
- `MEDIUM` (34-66)
- `HIGH` (67-100)

### Financing Types
- `Conventional`
- `FHA`
- `VA`
- `USDA`
- `Jumbo`

---

## Endpoints Summary Table

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/property` | Create property |
| GET | `/property` | Get all properties |
| GET | `/property/:id` | Get property by ID |
| PUT | `/property/:id` | Update property |
| DELETE | `/property/:id` | Delete property |
| POST | `/api/v1/disclosures` | Create disclosure |
| GET | `/api/v1/disclosures` | Get all disclosures |
| GET | `/api/v1/disclosures/:id` | Get disclosure by ID |
| GET | `/api/v1/disclosures/property/:propertyId` | Get property disclosures |
| PUT | `/api/v1/disclosures/:id` | Update disclosure |
| DELETE | `/api/v1/disclosures/:id` | Delete disclosure |
| POST | `/offer` | Create offer |
| GET | `/offer` | Get all offers |
| GET | `/offer/:id` | Get offer by ID |
| GET | `/offer/property/:propertyId` | Get property offers |
| PUT | `/offer/:id` | Update offer |
| DELETE | `/offer/:id` | Delete offer |
| POST | `/loan` | Create loan |
| GET | `/loan` | Get all loans |
| GET | `/loan/:id` | Get loan by ID |
| GET | `/loan/offer/:offerId` | Get offer loans |
| PUT | `/loan/:id` | Update loan |
| DELETE | `/loan/:id` | Delete loan |
| GET | `/api/v1/intelligence/offer/:offerId/score` | Get offer intelligence |
| GET | `/api/v1/dashboard/property/:propertyId` | Get dashboard |

---

## Usage Examples

### Frontend API Service Setup

```javascript
const API_BASE_URL = 'http://localhost:3000';

// Create Property
async function createProperty(propertyData) {
  const response = await fetch(`${API_BASE_URL}/property`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(propertyData)
  });
  return response.json();
}

// Get All Offers
async function getAllOffers() {
  const response = await fetch(`${API_BASE_URL}/offer`);
  return response.json();
}

// Create Offer
async function createOffer(offerData) {
  const response = await fetch(`${API_BASE_URL}/offer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offerData)
  });
  return response.json();
}
```

---

**Last Updated:** 2026-06-17

**API Version:** v1.0

**Frontend Framework:** React + Vite

**Backend Framework:** NestJS

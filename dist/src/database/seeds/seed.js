"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = __importDefault(require("../../../ormconfig"));
const property_entity_1 = require("../entities/property.entity");
const disclosure_entity_1 = require("../entities/disclosure.entity");
const offer_entity_1 = require("../entities/offer.entity");
const loan_document_entity_1 = require("../entities/loan-document.entity");
async function run() {
    console.log('🌱 Starting database seeding...');
    if (!ormconfig_1.default.isInitialized) {
        await ormconfig_1.default.initialize();
    }
    const queryRunner = ormconfig_1.default.createQueryRunner();
    await queryRunner.connect();
    try {
        console.log('Cleaning up existing tables...');
        await queryRunner.query('TRUNCATE TABLE loan_documents CASCADE');
        await queryRunner.query('TRUNCATE TABLE offers CASCADE');
        await queryRunner.query('TRUNCATE TABLE disclosures CASCADE');
        await queryRunner.query('TRUNCATE TABLE properties CASCADE');
        console.log('Seeding Properties...');
        const prop1 = await queryRunner.manager.save(property_entity_1.Property, {
            address: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'OR',
            zipCode: '97477',
        });
        const prop2 = await queryRunner.manager.save(property_entity_1.Property, {
            address: '1024 Ocean Drive',
            city: 'Miami Beach',
            state: 'FL',
            zipCode: '33139',
        });
        const prop3 = await queryRunner.manager.save(property_entity_1.Property, {
            address: '221B Baker Street',
            city: 'London',
            state: 'KY',
            zipCode: '40741',
        });
        console.log('Seeding Disclosures...');
        await queryRunner.manager.save(disclosure_entity_1.Disclosure, {
            propertyId: prop1.id,
            fileUrl: '/uploads/disclosures/742_evergreen_disclosure.pdf',
            summary: 'Disclosure report indicates minor basement water seepage during heavy storms, remediated via sump pump installation in 2022. Settling hairline cracks are present in the basement concrete wall. The roof was completely replaced in 2021.',
            structuralRisk: 30,
            legalRisk: 10,
            financialRisk: 15,
            environmentalRisk: 10,
            overallRisk: 16,
            extractedData: {
                roofYear: 2021,
                foundationCracks: 'Hairline cracks in basement foundation',
                sumpPump: true,
                waterSeepage: 'Remediated in 2022',
            },
        });
        await queryRunner.manager.save(disclosure_entity_1.Disclosure, {
            propertyId: prop2.id,
            fileUrl: '/uploads/disclosures/1024_ocean_disclosure.pdf',
            summary: 'Disclosure report indicates the property is located in Flood Zone AE (Special Flood Hazard Area), requiring mandatory flood insurance. A utility easement exists on the southern boundary line. Renovations in 2023 were fully permitted.',
            structuralRisk: 10,
            legalRisk: 40,
            financialRisk: 25,
            environmentalRisk: 75,
            overallRisk: 38,
            extractedData: {
                floodZone: 'AE',
                easement: 'Utility easement, southern boundary',
                permitStatus: 'Fully permitted 2023 renovation',
            },
        });
        await queryRunner.manager.save(disclosure_entity_1.Disclosure, {
            propertyId: prop3.id,
            fileUrl: '/uploads/disclosures/221b_baker_disclosure.pdf',
            summary: 'Property is in excellent condition. No history of water damage, structural faults, or legal disputes. The HVAC system was replaced in 2023 and has a transferrable warranty.',
            structuralRisk: 5,
            legalRisk: 5,
            financialRisk: 10,
            environmentalRisk: 5,
            overallRisk: 6,
            extractedData: {
                hvacAge: '1 year (replaced 2023)',
                warranty: 'Transferrable',
                disputes: 'None',
            },
        });
        console.log('Seeding Offers & Loan Documents...');
        const o1_1 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop1.id,
            buyerName: 'John Wick',
            buyerEmail: 'babayaga@continental.com',
            offerPrice: 535000,
            closingDays: 14,
            inspectionContingency: false,
            financingContingency: false,
            appraisalContingency: false,
            additionalConditions: 'All-cash offer. Fully waived contingencies. Proof of funds letter attached.',
            strengthScore: 95,
            closingProbability: 98,
            riskLevel: 'LOW',
            explanation: 'Outstanding cash offer well above asking price. With all contingencies waived and a very short 14-day closing timeframe, this is the highest strength and most secure offer for the seller.',
            extractedData: { source: 'seeder' },
        });
        const o1_2 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop1.id,
            buyerName: 'Sarah Connor',
            buyerEmail: 'sconnor@cyberdyne.org',
            offerPrice: 500000,
            closingDays: 30,
            inspectionContingency: true,
            financingContingency: true,
            appraisalContingency: true,
            additionalConditions: 'Seller to pay $3,000 towards buyer closing costs.',
            strengthScore: 68,
            closingProbability: 82,
            riskLevel: 'MEDIUM',
            explanation: 'Solid conventional offer at list price. Close timeline is standard at 30 days. Inspection and appraisal contingencies are active. Pre-approval letter is verified with strong financing metrics.',
            extractedData: { source: 'seeder' },
        });
        await queryRunner.manager.save(loan_document_entity_1.LoanDocument, {
            offerId: o1_2.id,
            lenderName: 'Wells Fargo Home Mortgage',
            approved: true,
            loanAmount: 400000,
            financingType: 'Conventional 30-Year Fixed',
            financingStrength: 85,
            extractedData: { preApproved: true, dti: 32 },
        });
        const o1_3 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop1.id,
            buyerName: 'Arthur Dent',
            buyerEmail: 'adent@heartofgold.net',
            offerPrice: 485000,
            closingDays: 45,
            inspectionContingency: true,
            financingContingency: true,
            appraisalContingency: true,
            additionalConditions: 'Subject to buyer selling their current property.',
            strengthScore: 42,
            closingProbability: 50,
            riskLevel: 'HIGH',
            explanation: 'Weak offer below asking price. FHA financing introduces stricter appraisal conditions. The closing period is long (45 days) and the offer is contingent on the sale of the buyer\'s own property, adding significant execution risk.',
            extractedData: { source: 'seeder' },
        });
        await queryRunner.manager.save(loan_document_entity_1.LoanDocument, {
            offerId: o1_3.id,
            lenderName: 'Federal Housing Administration (FHA)',
            approved: true,
            loanAmount: 468000,
            financingType: 'FHA 30-Year Fixed',
            financingStrength: 65,
            extractedData: { preApproved: true, downPaymentPercent: 3.5 },
        });
        const o1_4 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop1.id,
            buyerName: 'Lando Calrissian',
            buyerEmail: 'lando@cloudcity.org',
            offerPrice: 510000,
            closingDays: 30,
            inspectionContingency: true,
            financingContingency: true,
            appraisalContingency: true,
            additionalConditions: 'Seller to leave pool table.',
            strengthScore: 52,
            closingProbability: 25,
            riskLevel: 'HIGH',
            explanation: 'High transaction failure risk. Although the purchase price is above asking, the submitted pre-approval document indicates the buyer is not fully approved or has high debt ratio flags from the lender.',
            extractedData: { source: 'seeder' },
        });
        await queryRunner.manager.save(loan_document_entity_1.LoanDocument, {
            offerId: o1_4.id,
            lenderName: 'Cloud City Credit Union',
            approved: false,
            loanAmount: 450000,
            financingType: 'Conventional',
            financingStrength: 30,
            extractedData: { preApproved: false, reason: 'High credit usage' },
        });
        const o2_1 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop2.id,
            buyerName: 'Tony Stark',
            buyerEmail: 'tony@starkindustries.com',
            offerPrice: 1200000,
            closingDays: 25,
            inspectionContingency: true,
            financingContingency: true,
            appraisalContingency: false,
            additionalConditions: 'Appraisal contingency waived. Conv financing.',
            strengthScore: 78,
            closingProbability: 88,
            riskLevel: 'LOW',
            explanation: 'Strong conventional bid above ask. The buyer waived appraisal contingency, eliminating potential valuation gap issues. Pre-approval letter shows robust liquid assets.',
            extractedData: { source: 'seeder' },
        });
        await queryRunner.manager.save(loan_document_entity_1.LoanDocument, {
            offerId: o2_1.id,
            lenderName: 'JPMorgan Chase Bank',
            approved: true,
            loanAmount: 960000,
            financingType: 'Conventional Jumbo Fixed',
            financingStrength: 95,
            extractedData: { highNetWorth: true },
        });
        const o2_2 = await queryRunner.manager.save(offer_entity_1.Offer, {
            propertyId: prop2.id,
            buyerName: 'Peter Parker',
            buyerEmail: 'spidey@dailybugle.com',
            offerPrice: 1100000,
            closingDays: 40,
            inspectionContingency: true,
            financingContingency: true,
            appraisalContingency: true,
            additionalConditions: 'Standard FHA terms.',
            strengthScore: 55,
            closingProbability: 60,
            riskLevel: 'MEDIUM',
            explanation: 'Standard FHA offer. The property being in a high risk flood zone AE may trigger stricter FHA structural insurance requirements, which increases the likelihood of financing complications or renegotiations.',
            extractedData: { source: 'seeder' },
        });
        await queryRunner.manager.save(loan_document_entity_1.LoanDocument, {
            offerId: o2_2.id,
            lenderName: 'Queens Neighborhood Bank',
            approved: true,
            loanAmount: 1000000,
            financingType: 'FHA Fixed',
            financingStrength: 60,
        });
        console.log('✅ Database seeded successfully!');
    }
    catch (error) {
        console.error('❌ Database seeding failed:', error);
    }
    finally {
        await queryRunner.release();
        await ormconfig_1.default.destroy();
        console.log('Database connection closed.');
    }
}
run();
//# sourceMappingURL=seed.js.map
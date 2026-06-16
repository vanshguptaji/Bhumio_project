import { Disclosure } from './disclosure.entity';
import { Offer } from './offer.entity';
export declare class Property {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    disclosures: Disclosure[];
    offers: Offer[];
    createdAt: Date;
    updatedAt: Date;
}

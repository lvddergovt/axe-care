import { Models } from 'node-appwrite';

export interface Customer extends Models.Document {
	userId: string;
	name: string;
	email: string;
	phone: string;
	birthDate: Date;
	address: string;
	privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
	customer: Customer;
	schedule: Date;
	status: Status;
	reason: string;
	note: string;
	userId: string;
	cancellationReason: string | null;
}

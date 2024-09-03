/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = 'Male' | 'Female' | 'Other';
declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare interface CreateUserParams {
	name: string;
	email: string;
	phone: string;
}
declare interface User extends CreateUserParams {
	$id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
	userId: string;
	birthDate: Date;
	address: string;
	privacyConsent: boolean;
	treatmentConsent: boolean;
}

declare type CreateAppointmentParams = {
	userId: string;
	customer: string;
	technician: string;
	reason: string;
	schedule: Date;
	status: Status;
	note: string | undefined;
};

declare type UpdateAppointmentParams = {
	appointmentId: string;
	userId: string;
	appointment: Appointment;
	type: string;
};

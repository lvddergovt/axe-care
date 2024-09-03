import { z } from 'zod';

export const UserFormValidation = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	email: z.string().email('Invalid email address'),
	phone: z
		.string()
		.refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
});

export const CustomerFormValidation = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Name must be at least 2 characters.',
		})
		.max(50, "Name can't be more than 50 characters."),
	email: z.string().email('Invalid email address.'),
	phone: z
		.string()
		.refine(
			(phone) => /^\+?[0-9]{1,14}$/.test(phone),
			'Invalid phone number'
		),
	birthDate: z.coerce.date(),
	address: z
		.string()
		.min(5, 'Address must be at least 5 characters')
		.max(500, 'Address must be at most 500 characters'),
	treatmentConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'You must consent to treatment in order to proceed',
		}),
	privacyConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'You must consent to privacy in order to proceed',
		}),
});

export const CreateAppointmentSchema = z.object({
	technician: z.string().min(2, 'Select at least one technician'),
	schedule: z.coerce.date(),
	reason: z
		.string()
		.min(2, 'Reason must be at least 2 characters')
		.max(500, 'Reason must be at most 500 characters'),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
	technician: z.string().min(2, 'Select at least one technician'),
	schedule: z.coerce.date(),
	reason: z.string().optional(),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
	technician: z.string().min(2, 'Select at least one technician'),
	schedule: z.coerce.date(),
	reason: z.string().optional(),
	note: z.string().optional(),
	cancellationReason: z
		.string()
		.min(2, 'Reason must be at least 2 characters')
		.max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
	switch (type) {
		case 'create':
			return CreateAppointmentSchema;
		case 'cancel':
			return CancelAppointmentSchema;
		default:
			return ScheduleAppointmentSchema;
	}
}

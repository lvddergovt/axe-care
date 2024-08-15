import { z } from 'zod';

export const UserFormValidation = z.object({
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
});

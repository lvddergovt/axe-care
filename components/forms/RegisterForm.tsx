'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { CustomerFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser, registerCustomer } from '@/lib/actions/customer.actions';
import { FormFieldType } from './CustomerForm';
import { CustomerFormDefaultValues } from '@/app/constants';

const RegisterForm = ({ user }: { user: User }) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof CustomerFormValidation>>({
		resolver: zodResolver(CustomerFormValidation),
		defaultValues: {
			...CustomerFormDefaultValues,
			name: user.name,
			email: user.email,
			phone: user.phone,
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof CustomerFormValidation>) => {
		setIsLoading(true);

		const normalizedPhone = values.phone.replace(/\s+/g, '');

		try {
			const customer = {
				userId: user.$id,
				name: values.name,
				email: values.email,
				phone: normalizedPhone,
				birthDate: new Date(values.birthDate),
				address: values.address,
				treatmentConsent: values.treatmentConsent,
				privacyConsent: values.privacyConsent,
			};

			const newCustomer = await registerCustomer(customer);

			if (newCustomer) {
				router.push(`/customers/${user.$id}/new-appointment`);
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12 flex-1"
			>
				<section className="space-y-4">
					<h1 className="header">Welcome👋</h1>
					<p className="text-dark-700">
						Tell us more about yourself.
					</p>
				</section>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Personal Information</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					label="Full Name"
					placeholder="John Doe"
					iconSrc="/assets/icons/user.svg"
					iconAlt="User icon"
				/>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name="email"
						label="Email"
						placeholder="johndoe@gmail.com"
						iconSrc="/assets/icons/email.svg"
						iconAlt="Email icon"
					/>

					<CustomFormField
						fieldType={FormFieldType.PHONE_INPUT}
						control={form.control}
						name="phone"
						label="Phone number"
						placeholder="+31 6 12345678"
					/>
				</div>

				<CustomFormField
					fieldType={FormFieldType.DATE_PICKER}
					control={form.control}
					name="birthDate"
					label="Date of birth"
				/>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="address"
					label="Address"
					placeholder="Dorpsweg 1, 1234 AG Rotterdam"
				/>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Consent and Privacy</h2>
					</div>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="treatmentConsent"
						label="I consent to getting my instrument fixed."
					/>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="privacyConsent"
						label="I acknowledge that I have reviewed and agree to the
            privacy policy."
					/>
				</section>

				<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
			</form>
		</Form>
	);
};

export default RegisterForm;

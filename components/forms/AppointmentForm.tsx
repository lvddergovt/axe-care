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
import { getAppointmentSchema, UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/customer.actions';
import { FormFieldType } from './CustomerForm';
import { SelectItem } from '../ui/select';
import { Technicians } from '@/app/constants';
import Image from 'next/image';
import { createAppointment } from '@/lib/actions/appointment.actions';

const AppointmentForm = ({
	userId,
	customerId,
	type = 'create',
}: {
	userId: string;
	customerId: string;
	type: 'create' | 'cancel' | 'schedule';
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const AppointmentFormValidation = getAppointmentSchema(type);

	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: {
			technician: '',
			schedule: new Date(),
			reason: '',
			note: '',
			cancellationReason: '',
		},
	});

	const onSubmit = async (
		values: z.infer<typeof AppointmentFormValidation>
	) => {
		setIsLoading(true);

		let status;

		switch (type) {
			case 'cancel':
				status = 'cancelled';
				break;
			case 'schedule':
				status = 'scheduled';
				break;
			case 'create':
			default:
				status = 'pending';

				break;
		}

		try {
			if (type === 'create' && customerId) {
				const appointmentData = {
					userId,
					customer: customerId,
					technician: values.technician,
					schedule: new Date(values.schedule),
					reason: values.reason!,
					note: values.note,
					status: status as Status,
				};
				const appointment = await createAppointment(appointmentData);

				if (appointment) {
					form.reset();
					router.push(
						`/customers/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
					);
				}
			}
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	};

	let buttonLabel;

	switch (type) {
		case 'create':
			buttonLabel = 'Create appointment';
			break;
		case 'cancel':
			buttonLabel = 'Cancel appointment';
			break;
		case 'schedule':
			buttonLabel = 'Schedule appointment';
			break;

		default:
			break;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1"
			>
				<section className="mb-12 space-y-4">
					<h1 className="header">New appointment</h1>
					<p className="text-dark-700">Request a new appointment</p>
				</section>

				{type !== 'cancel' && (
					<>
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="technician"
							label="Technician"
							placeholder="Select a technician"
						>
							{Technicians.map((technician) => (
								<SelectItem
									key={technician.name}
									value={technician.name}
								>
									<div className="flex cursor-pointer items-center gap-2">
										<Image
											src={technician.image}
											width={32}
											height={32}
											alt={technician.name}
											className="rounded-full border border-dark-500"
										/>
										<p>{technician.name}</p>
									</div>
								</SelectItem>
							))}
						</CustomFormField>

						<CustomFormField
							fieldType={FormFieldType.DATE_PICKER}
							control={form.control}
							name="schedule"
							label="Exptected appointment date"
							showTimeSelect
							dateFormat="MM/dd/yyyy - hh:mm aa"
						/>

						<div className="flex flex-col lg:flex-row gap-6">
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="reason"
								label="Reason for appointment"
								placeholder="Enter reason for appointment"
							/>

							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="note"
								label="Notes"
								placeholder="Enter notes"
							/>
						</div>
					</>
				)}

				{type === 'cancel' && (
					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						name="cancellationReason"
						label="Reason for cancellation"
						placeholder="Enter reason for cancellation"
					/>
				)}

				<SubmitButton
					isLoading={isLoading}
					className={`${
						type === 'cancel'
							? 'shad-danger-btn'
							: 'shad-primary-btn'
					} w-full`}
				>
					{buttonLabel}
				</SubmitButton>
			</form>
		</Form>
	);
};

export default AppointmentForm;

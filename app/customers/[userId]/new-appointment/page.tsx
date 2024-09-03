import AppointmentForm from '@/components/forms/AppointmentForm';
import { getCustomer, getUser } from '@/lib/actions/customer.actions';
import Image from 'next/image';

export default async function NewAppointment({
	params: { userId },
}: SearchParamProps) {
	const customer = await getCustomer(userId);

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<Image
						src="/assets/logo.png"
						height={50}
						width={50}
						alt="AxeCare Logo"
					/>

					<AppointmentForm
						type="create"
						userId={userId}
						customerId={customer.$id}
					/>

					<p className="copyright mt-10 py-12">
						© 2024 AxeCare. All rights reserved.
					</p>
				</div>
			</section>

			<Image
				src="/assets/images/appointment.jpg"
				height={1000}
				width={1000}
				alt="appontment image"
				className="side-img max-w-[390px] bg-bottom"
			/>
		</div>
	);
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/customer.actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId);

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Image
						src="/assets/logo.png"
						height={50}
						width={50}
						alt="AxeCare Logo"
					/>

					<RegisterForm user={user} />

					<div className="text-14-regular mt-20 flex justify-between">
						<p className="justify-items-end text-dark-600 xl:text-left">
							© 2024 AxeCare. All rights reserved.
						</p>
						<Link href="/?admin=true" className="text-green-500">
							Admin
						</Link>
					</div>
				</div>
			</section>

			<Image
				src="/assets/images/register-img.jpg"
				height={1000}
				width={1000}
				alt="onboarding image"
				className="side-img max-w-[50%]"
			/>
		</div>
	);
};

export default Register;

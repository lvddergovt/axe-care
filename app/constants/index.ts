export const CustomerFormDefaultValues = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	birthDate: new Date(Date.now()),
	address: '',
	treatmentConsent: false,
	privacyConsent: false,
};

export const StatusIcon = {
	scheduled: '/assets/icons/check.svg',
	pending: '/assets/icons/pending.svg',
	cancelled: '/assets/icons/cancelled.svg',
};

export const Technicians = [
	{
		name: 'John Doe',
		image: '/assets/images/technicians/john-doe.png',
	},
	{
		name: 'Jane Doe',
		image: '/assets/images/technicians/jane-doe.png',
	},
	{
		name: 'John Smith',
		image: '/assets/images/technicians/john-smith.png',
	},
];

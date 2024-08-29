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

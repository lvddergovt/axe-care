/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '@/components/forms/RegisterForm';
import { useRouter } from 'next/navigation';
import { registerCustomer } from '@/lib/actions/customer.actions';

global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};

// Mock the necessary modules and functions for testing
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

jest.mock('@/lib/actions/customer.actions', () => ({
	registerCustomer: jest.fn(),
}));

describe('RegisterForm', () => {
	const mockUser = {
		$id: '123',
		name: 'John Doe',
		email: 'john@example.com',
		phone: '+31612345678',
	};

	// Mock the useRouter hook to control navigation in tests
	const mockRouter = useRouter as jest.MockedFunction<typeof useRouter>;

	beforeEach(() => {
		// Clear all previous mock data to ensure a clean test environment
		jest.clearAllMocks();

		// Set up mockRouter to simulate Next.js router behavior
		mockRouter.mockReturnValue({
			push: jest.fn(), // Simulate navigation to a new route
			back: jest.fn(), // Simulate navigating back
			forward: jest.fn(), // Simulate navigating forward
			refresh: jest.fn(), // Simulate page refresh
			replace: jest.fn(), // Simulate route replacement
			prefetch: jest.fn(), // Simulate route prefetching
		});
	});

	it('renders the form with initial values', () => {
		// Render the RegisterForm component with mock user data
		render(<RegisterForm user={mockUser} />);

		// Check that the form fields are pre-populated with the correct user data
		expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
		expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
		const phoneNumberInput = screen.getByLabelText(/^phone number$/i);
		const normalizedPhoneNumber = (
			phoneNumberInput as HTMLInputElement
		).value.replace(/\s+/g, '');
		expect(normalizedPhoneNumber).toBe('+31612345678');
	});

	it('submits the form with correct data', async () => {
		// Set up the mock to return a successful response when registering a customer
		(registerCustomer as jest.Mock).mockResolvedValueOnce({
			success: true,
		});

		// Render the RegisterForm component with mock user data
		render(<RegisterForm user={mockUser} />);

		// Simulate user input for the address field
		fireEvent.change(screen.getByLabelText(/address/i), {
			target: { value: 'Dorpsweg 1, 1234 AG Rotterdam' },
		});

		// Simulate user agreeing to terms by clicking checkboxes
		fireEvent.click(
			screen.getByLabelText(/i consent to getting my instrument fixed./i)
		);
		fireEvent.click(
			screen.getByLabelText(
				/i acknowledge that i have reviewed and agree to the privacy policy./i
			)
		);

		// Simulate form submission
		fireEvent.click(screen.getByText(/get started/i));

		// Wait for the form submission to complete and verify the correct data was sent
		await waitFor(() => {
			expect(registerCustomer).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: '123',
					name: 'John Doe',
					email: 'john@example.com',
					phone: '+31612345678',
					address: 'Dorpsweg 1, 1234 AG Rotterdam',
					privacyConsent: true,
					treatmentConsent: true,
				})
			);
		});

		// Verify that the router navigates to the expected page after successful registration
		expect(mockRouter().push).toHaveBeenCalledWith(
			`/customers/123/new-appointment`
		);
	});

	it('shows an error message when address is empty', async () => {
		// Set up the mock to simulate a failure during customer registration
		(registerCustomer as jest.Mock).mockRejectedValueOnce(
			new Error('Submission failed')
		);

		// Render the RegisterForm component with mock user data
		render(<RegisterForm user={mockUser} />);

		// Simulate form submission
		fireEvent.click(screen.getByText(/get started/i));

		// Wait for the error to be displayed and verify it appears in the document
		await waitFor(() => {
			expect(screen.queryByText(/Address must be/i)).toBeInTheDocument();
		});
	});
});

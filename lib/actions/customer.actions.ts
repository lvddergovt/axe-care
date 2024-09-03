'use server';

import { ID, Query } from 'node-appwrite';
import { parseStringify } from '../utils';

import {
	BUCKET_ID,
	DATABASE_ID,
	CUSTOMER_COLLECTION_ID,
	ENDPOINT,
	PROJECT_ID,
	databases,
	storage,
	users,
} from '../appwrite.config';

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);
		return parseStringify(newUser);
	} catch (error: any) {
		if (error && error?.code === 409) {
			const existingUser = await users.list([
				Query.equal('email', [user.email]),
			]);

			return existingUser.users[0];
		}
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId);

		return parseStringify(user);
	} catch (error) {
		console.error(error);
	}
};

export const getCustomer = async (userId: string) => {
	try {
		const customers = await databases.listDocuments(
			DATABASE_ID!,
			CUSTOMER_COLLECTION_ID!,
			[Query.equal('userId', userId)]
		);

		return parseStringify(customers.documents[0]);
	} catch (error) {
		console.error(error);
	}
};

export const registerCustomer = async ({ ...customer }: RegisterUserParams) => {
	try {
		const newCustomer = await databases.createDocument(
			DATABASE_ID!,
			CUSTOMER_COLLECTION_ID!,
			ID.unique(),
			{
				...customer,
			}
		);

		return parseStringify(newCustomer);
	} catch (error) {
		console.error(
			'An error occurred while creating a new customer:',
			error
		);
	}
};

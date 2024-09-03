module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js', // Voeg deze regel toe
	},
};

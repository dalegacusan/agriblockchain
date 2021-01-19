const palindrome = (string) => string
	.split('')
	.reverse()
	.join('');

const average = (array) => {
	const reducer = (sum, item) => sum + item;

	return array.length === 0
		? 0
		: array.reduce(reducer, 0) / array.length;
};

// Describe blocks can be used for grouping tests into logical collections.
describe('palindrome', () => {
	test('palindrome of a', () => {
		const result = palindrome('a');

		expect(result).toBe('a');
	});

	test('palindrome of react', () => {
		const result = palindrome('react');

		expect(result).toBe('tcaer');
	});

	test('palindrome of releveler', () => {
		const result = palindrome('releveler');

		expect(result).toBe('releveler');
	});
});

describe('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(1);
	});

	test('of many is calculated right', () => {
		expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
	});

	test('of empty array is zero', () => {
		expect(average([])).toBe(0);
	});
});

import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export interface PhoneValidationResult {
	isValid: boolean;
	isPossible: boolean;
	formatted: string;
	formattedNumber?: string;
	countryCode?: string;
	nationalNumber?: string;
	error?: string;
}

export function verifyPhoneNumberGoogle(
	phoneNumber: string,
	defaultRegion = "DE",
): PhoneValidationResult {
	try {
		const parsedNumber = phoneUtil.parse(phoneNumber, defaultRegion);
		const isValid = phoneUtil.isValidNumber(parsedNumber);
		const isPossible = phoneUtil.isPossibleNumber(parsedNumber);
		const formatted = phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);

		return {
			isValid,
			isPossible,
			formatted,
			formattedNumber: phoneUtil.format(parsedNumber, PhoneNumberFormat.E164),
			countryCode: parsedNumber.getCountryCode()?.toString(),
			nationalNumber: parsedNumber.getNationalNumber()?.toString(),
		};
	} catch (error) {
		return {
			isValid: false,
			isPossible: false,
			formatted: phoneNumber,
			error: error instanceof Error ? error.message : "Failed to parse phone number",
		};
	}
}

export default verifyPhoneNumberGoogle;

import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";

const verifyPhoneNumberGoogle = (phoneNumber: string) => {
	const phoneUtil = PhoneNumberUtil.getInstance();

	try {
		const isValid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber, "DE"));
		const isPossible = phoneUtil.isPossibleNumber(
			phoneUtil.parse(phoneNumber, "DE"),
		);
		const formatted = phoneUtil.format(
			phoneUtil.parse(phoneNumber, "DE"),
			PhoneNumberFormat.INTERNATIONAL,
		);

		return {
			isValid: isValid,
			isPossible: isPossible,
			formatted: formatted,
		};
	} catch (error) {
		return {
			isValid: false,
			isPossible: false,
			formatted: phoneNumber,
		};
	}
};

export default verifyPhoneNumberGoogle;

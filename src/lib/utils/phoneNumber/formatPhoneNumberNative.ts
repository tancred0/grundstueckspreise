const formatPhoneNumberNative = (phoneNumber: string) => {
	// if it start with 0 and numbers then replace 0 with +49
	// if it start with +49 and numbers then return as it is
	// if ist starts witth 0049 and numbers then replace 0049 with +49
	const formattedPhoneNumber = phoneNumber.replace(/[\s-]/g, "");

	if (/^0\d{2,5}\d{1,10}$/.test(formattedPhoneNumber)) {
		return formattedPhoneNumber.replace(/^0/, "+49");
	} else {
		return formattedPhoneNumber;
	}
};

export default formatPhoneNumberNative;

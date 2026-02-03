import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type Control, type UseFormSetValue, useForm } from "react-hook-form";
import { z } from "zod";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Card, CardContent } from "@/components/ui/card";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import parseAddress, {
	type ParsedAddressType,
} from "@/components/utils/parseGoogleAdress";
import { getBrwValue } from "@/lib/api/getBrwValue";
import { getCoverage } from "@/lib/api/getCoverage";
import { getZipCodeBrw } from "@/lib/api/getZipCodeBrw";
import { cn } from "@/lib/utils";
import StepsComponent from "../../steps-component";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { BackAndForthNew } from "../bewertung-navigation";

const schema = z.object({
	property_address_confirmed: z.boolean(),
	// // WITH Autocomplete
	// property_street_and_number: z
	//   .string()
	//   .min(1, "Bitte Straße eingeben")
	//   .refine((value) => /\d/.test(value), {
	//     message: "Bitte Hausnummer miteingeben.",
	//   }),
	// property_street: z.string(), // .min(1, "Bitte Straße eingeben"),
	// property_house_number: z.string(), //.min(1, "Bitte Hausnummer eingeben"),

	// NO Autocomplete
	// property_street_and_number: z.string(),
	property_street: z
		.string()
		.min(1, "Bitte Straße eingeben")
		.max(39, "Bitte nur den Straßennamen eingeben"),
	property_house_number: z
		.string()
		.min(1, "Bitte Hausnummer eingeben")
		.max(10, "Bitte nur die Hausnummer eingeben"),

	// REST
	property_postalcode: z
		.string()
		.min(1, "Bitte Postleitzahl eingeben")
		.regex(/^\d{5}$/, "Postleitzahl muss 5-stellig sein"),
	property_city: z
		.string()
		.min(1, "Bitte Stadt eingeben")
		.max(39, "Bitte nur Stadnamen eingeben"),
	property_state: z.string(), // .min(1, "Bitte Bundesland eingeben"),
	property_country: z.string(), //.min(1, "Bitte Land eingeben"),
	property_latitude: z.number(),
	property_longitude: z.number(),
});

type FormData = z.infer<typeof schema>;

interface FormFieldComponentProps {
	name: Exclude<keyof FormData, "property_address_confirmed">;
	label: string;
	placeholder: string;
	control: Control<FormData>;
	required?: boolean;
}

// const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
//   control,
//   setValue,
//   name,
//   label,
//   placeholder,
// }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [autocomplete, setAutocomplete] =
//     useState<google.maps.places.Autocomplete | null>(null);

//   const { data } = useFunnel();
//   const [inputValue, setInputValue] = useState(data.data.property_street_and_number || "");

//   useEffect(() => {
//     if (
//       typeof window !== "undefined" &&
//       window.google &&
//       !autocomplete &&
//       inputRef.current &&
//       inputValue.length > 2
//     ) {
//       const newAutocomplete = new window.google.maps.places.Autocomplete(
//         inputRef.current,
//         {
//           types: ["address"],
//           componentRestrictions: { country: "DE" },
//           fields: ["address_components", "geometry"],
//         }
//       );

//       newAutocomplete.addListener("place_changed", () => {
//         const place = newAutocomplete.getPlace();
//         handlePlaceSelect(place);
//       });

//       setAutocomplete(newAutocomplete);
//     }
//   }, [inputValue]);

//   const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
//     const parsedAddress = parseAddress(place);
//     console.log(parsedAddress);

//     if (parsedAddress) {
//       const {
//         streetName,
//         houseNumber,
//         state,
//         postalCode,
//         city,
//         latitude,
//         longitude,
//         country,
//       } = parsedAddress;
//       const street_number = `${streetName} ${houseNumber}`;
//       setValue("property_street", streetName);
//       setValue("property_house_number", houseNumber);
//       setValue("property_street_and_number", street_number);

//       setValue("property_postalcode", postalCode);
//       setValue("property_city", city);
//       setValue("property_state", state);
//       setValue("property_latitude", latitude);
//       setValue("property_longitude", longitude);
//       setValue("property_country", country);

//       if (inputRef.current) {
//         inputRef.current.value = `${streetName} ${houseNumber}`;
//         setInputValue(`${streetName} ${houseNumber}`);
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);

//     if (value.length <= 3 && autocomplete) {
//       setAutocomplete(null);
//     }
//   };

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="mb-4">
//           <FormLabel htmlFor={name}>{label}</FormLabel>
//           <FormControl>
//             <Input
//               {...field}
//               ref={(e) => {
//                 inputRef.current = e;
//                 if (typeof field.ref === "function") {
//                   field.ref(e);
//                 }
//               }}
//               type="text"
//               placeholder={placeholder}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                 }
//               }}
//               onChange={(e) => {
//                 field.onChange(e);
//                 handleInputChange(e);
//               }}
//               value={inputValue}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
	name,
	label,
	placeholder,
	control,
	required = false,
}) => (
	<FormField
		control={control}
		name={name}
		render={({ field, fieldState }) => (
			<FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] md:items-center gap-1 md:gap-4 mb-2 md:mb-4">
				<FormLabel
					className="text-primary text-small md:text-base"
					htmlFor={name}
				>
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</FormLabel>
				<div className="flex flex-col gap-1">
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className={
								fieldState.error
									? "h-10 border-2 border-red-500 md:h-12"
									: "h-10 md:h-12"
							}
						/>
					</FormControl>
					{fieldState.error && (
						<span className="text-red-500 text-sm">{fieldState.error.message}</span>
					)}
				</div>
			</FormItem>
		)}
	/>
);

const setFormValues = (
	parsedAddress: ParsedAddressType,
	setValue: UseFormSetValue<FormData>,
) => {
	const {
		streetName,
		houseNumber,
		state,
		postalCode,
		city,
		latitude,
		longitude,
		country,
	} = parsedAddress;

	if (streetName == "" || houseNumber == "") {
		setValue("property_address_confirmed", false);
	}
	if (streetName !== "") {
		setValue("property_street", streetName);
	}
	if (houseNumber !== "") {
		setValue("property_house_number", houseNumber);
	}
	if (postalCode.length === 5) {
		setValue("property_postalcode", postalCode);
	}

	setValue("property_city", city);
	setValue("property_state", state);
	setValue("property_latitude", latitude ?? 0);
	setValue("property_longitude", longitude ?? 0);
	setValue("property_country", country);
};

const geocodeAddress = async (
	formData: FormData,
): Promise<ParsedAddressType | null> => {
	//  WITH AUTCOMPLETE
	// const apiAddress = `${formData.property_street_and_number}, ${formData.property_postalcode} ${formData.property_city}, GERMANY`;
	// NO AUTOCOMPLETE
	const apiAddress = `${formData.property_street} ${formData.property_house_number}, ${formData.property_postalcode} ${formData.property_city}, GERMANY`;
	const geocoder = new google.maps.Geocoder();

	return new Promise((resolve) => {
		geocoder.geocode({ address: apiAddress }, (results, status) => {
			if (status === "OK" && results && results[0]) {
				const result = results[0];
				const parsedAddress = parseAddress(
					result.address_components as unknown as { long_name: string; short_name: string; types: string[] }[],
					result.geometry as unknown as { location: { lat: () => number; lng: () => number } },
				);
				resolve(parsedAddress);
			} else {
				resolve(null);
			}
		});
	});
};

export default function AddressScreen() {
	const { goToScreen, data, setData } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			// property_street_and_number: data.data.property_street_and_number || "",
			property_address_confirmed: true,
			property_postalcode: data.data.property_postalcode || "",
			property_city: data.data.property_city || "",
			property_street: data.data.property_street || "",
			property_house_number: data.data.property_house_number || "",
			property_country: data.data.property_country || "",
			property_state: data.data.property_state || "",
			property_latitude: data.data.property_latitude || 0,
			property_longitude: data.data.property_longitude || 0,
		},
		mode: "onSubmit",
	});

	const onSubmit = async (formData: FormData) => {
		setIsSubmitting(true);
		let finalFormData = { ...formData };

		const geocodedAddress = await geocodeAddress(formData);
		console.log(geocodedAddress);
		if (geocodedAddress) {
			setFormValues(geocodedAddress, form.setValue);
			finalFormData = { ...form.getValues() };
		} else {
			// console.log("Geocoding failed");
			setIsSubmitting(false);
			return;
		}

		goToScreen(97);

		const [coverage, brwValues, zipCodeBrw] = await Promise.all([
			getCoverage(finalFormData.property_postalcode),
			getBrwValue(
				finalFormData.property_latitude,
				finalFormData.property_longitude,
			),
			getZipCodeBrw(finalFormData.property_postalcode),
		]);

		setData((prevData: any) => ({
			...prevData,
			data: {
				...prevData.data,
				...finalFormData,
				property_street_and_number: `${finalFormData.property_street} ${finalFormData.property_house_number}`,
				brw_zip_code: zipCodeBrw !== null ? zipCodeBrw : undefined,
				brw_value: brwValues?.[0]?.brw ?? null,
				brw_gutachterausschuss: brwValues?.[0]?.gutachterausschuss ?? "",
				brw_gutachter_date: brwValues?.[0]?.stichtag ?? "",
				int_broker_coverage: coverage.isCovered,
				int_broker_coverage_active: coverage.activeCoverage,
			},
		}));

		analytics?.track(
			"Funnel Address Submitted",
			{
				...data.data,
				...finalFormData,
			},
			{
				campaign: {
					gclid: data.data.gclid,
					gbraid: data.data.gbraid,
					wbraid: data.data.wbraid,
				},
			},
		);
		setIsSubmitting(false);
	};

	const heading = "Wo befindet sich das Grundstück?";
	return (
		<>
			<div className="mb-6 space-y-4 md:mb-10">
				<StepsComponent currentStep={1} />
				<h2 className="text-center text-xl font-semibold text-primary md:text-2xl">{heading}</h2>
			</div>
			<Form {...form}>
				<form
					className="flex h-full flex-col"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormFieldComponent
						control={form.control}
						label="Straße"
						name="property_street"
						placeholder="Friedrichstraße"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="Hausnummer"
						name="property_house_number"
						placeholder="158"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="PLZ"
						name="property_postalcode"
						placeholder="10117"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="Stadt"
						name="property_city"
						placeholder="Berlin"
						required={true}
					/>
					<div className="mt-auto">
						<BackAndForthNew disabled={isSubmitting} />
					</div>
				</form>
			</Form>
		</>
	);
}

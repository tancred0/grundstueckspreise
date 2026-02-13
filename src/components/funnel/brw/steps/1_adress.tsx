import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, useForm, type UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";

import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import parseAddress, { type ParsedAddressType } from "@/components/utils/parseGoogleAdress";
import { getBrwValue } from "@/lib/api/getBrwValue";
import { getCoverage } from "@/lib/api/getCoverage";
import { getZipCodeBrw } from "@/lib/api/getZipCodeBrw";
import StepsComponent from "../../steps-component";
import { BackAndForthNew } from "../brw-navigation";

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
      <FormItem className="mb-4">
        <div className="flex items-center justify-between">
          <FormLabel required={required} htmlFor={name} className="text-base text-primary">{label}</FormLabel>
          {fieldState.error && (
            <span className="text-red-500 text-sm md:hidden whitespace-nowrap">{fieldState.error.message}</span>
          )}
        </div>
        <div className="md:flex md:items-center md:gap-4 h-12">
          <FormControl className="flex-1">
            <Input
              placeholder={placeholder}
              {...field}
              className={fieldState.error ? "h-12 border-2 border-red-500" : "h-12"}
            />
          </FormControl>
          <div className="hidden md:flex md:shrink-0 md:h-12 md:items-center md:min-w-0">
            {fieldState.error && (
              <span className="text-red-500 text-sm">{fieldState.error.message}</span>
            )}
          </div>
        </div>
      </FormItem>
    )}
  />
);

const setFormValues = (
  parsedAddress: ParsedAddressType,
  setValue: UseFormSetValue<FormData>
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
  formData: FormData
): Promise<ParsedAddressType | null> => {
  //  WITH AUTCOMPLETE
  // const apiAddress = `${formData.property_street_and_number}, ${formData.property_postalcode} ${formData.property_city}, GERMANY`;
  // NO AUTOCOMPLETE
  const apiAddress = `${formData.property_street} ${formData.property_house_number}, ${formData.property_postalcode} ${formData.property_city}, GERMANY`;
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve) => {
    geocoder.geocode({ address: apiAddress }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        console.log("Geocoder result:", results[0]);
        console.log("address_components:", results[0].address_components);
        console.log("geometry:", results[0].geometry);
        const parsedAddress = parseAddress(results[0]);
        resolve(parsedAddress);
      } else {
        resolve(null);
      }
    });
  });
};

export default function AddressScreen() {
  const { goToScreen, data, setData } = useBRWFunnel();
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



    goToScreen(3)

    const [coverage, brwValues, zipCodeBrw] = await Promise.all([
      getCoverage(finalFormData.property_postalcode),
      getBrwValue(finalFormData.property_latitude, finalFormData.property_longitude),
      getZipCodeBrw(finalFormData.property_postalcode),
    ]);

    setData((prevData) => ({

      ...prevData,
      data: {
        ...prevData.data,
        ...finalFormData,
        property_street_and_number: `${finalFormData.property_street} ${finalFormData.property_house_number}`,
        brw_zip_code: zipCodeBrw ?? undefined,
        brw_value: finalFormData.property_address_confirmed ? brwValues && brwValues[0] ? brwValues[0].brw : null : null,

        brw_gutachterausschuss:
          brwValues && brwValues[0] ? brwValues[0].gutachterausschuss : "",
        brw_gutachter_date:
          brwValues && brwValues[0] ? brwValues[0].stichtag : "",
        int_broker_coverage: coverage.isCovered,
        int_broker_coverage_active: coverage.activeCoverage,
      },
    }));

    analytics?.track("Funnel Address Submitted", {
      ...data.data,
      ...finalFormData,
      int_broker_coverage: coverage.isCovered,
      int_broker_coverage_active: coverage.activeCoverage,
      brw_zip_code: zipCodeBrw ?? undefined,
      brw_value: brwValues && brwValues[0] ? brwValues[0].brw : null,
      brw_gutachterausschuss:
        brwValues && brwValues[0] ? brwValues[0].gutachterausschuss : "",
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });
    setIsSubmitting(false);
  };

  const heading = "Wo befindet sich das Grundstück?";
  return (
    <>
      <div className="space-y-6 mb-4 md:mb-12">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <FormFieldComponent
            control={form.control}
            name="property_street"
            label="Straße"
            placeholder="Ratinger Str."
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_house_number"
            label="Hausnummer"
            placeholder="25"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_postalcode"
            label="PLZ"
            placeholder="40213"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_city"
            label="Stadt"
            placeholder="Düsseldorf"
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

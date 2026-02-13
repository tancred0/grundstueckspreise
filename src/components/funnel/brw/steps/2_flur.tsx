import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { z } from "zod";
import { BackAndForthNew, OnlyBack } from "../brw-navigation";
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useBRWFunnel } from "../brw-funnel-context";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Button } from "@/components/ui/button";
import { getCoverage } from "@/lib/api/getCoverage";
import { getZipCodeBrw } from "@/lib/api/getZipCodeBrw";
import StepsComponent from "../../steps-component";
import capitalizeWords from "@/components/utils/capitalizeWords";


const schema = z.object({
  property_postalcode: z
    .string()
    .min(1, { message: "Postleitzahl ist erforderlich" })
    .regex(/^\d{5}$/, { message: "Postleitzahl muss 5-stellig sein" }),
  property_gemarkung: z
    .string()
    .min(1, { message: "Gemarkung ist erforderlich" }),
  property_flur: z
    .string()
    .min(1, { message: "Flur ist erforderlich" })
    .regex(/^\d+$/, { message: "Flur muss eine Zahl sein" }),
  property_flurstueck: z
    .string()
    .min(1, { message: "Flurstück ist erforderlich" })
    .regex(/^\d+$/, { message: "Flurstück muss eine Zahl sein" }),
  property_flurstueck_nenner: z
    .string()
    .max(12, { message: "Flurstücknenner ist nur eine Zahl" })
    .optional(),
});

type FormData = z.infer<typeof schema>;

interface FormFieldComponentProps {
  name: keyof FormData;
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
        {fieldState.error ? (
          <div className="md:flex md:items-center md:gap-4 h-12">
            <FormControl className="md:flex-1">
              <Input
                placeholder={placeholder}
                {...field}
                className="h-12 border-2 border-red-500"
              />
            </FormControl>
            <div className="hidden md:flex md:flex-1 md:h-12 md:items-center">
              <span className="text-red-500 text-sm whitespace-nowrap">{fieldState.error.message}</span>
            </div>
          </div>
        ) : (
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="h-12"
            />
          </FormControl>
        )}
      </FormItem>
    )}
  />
);

export default function FlurScreen() {
  const { goToScreen, data, setData } = useBRWFunnel();

  const analytics = useRudderStackAnalytics();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      property_postalcode: data.data.property_postalcode || "",
      property_gemarkung: data.data.property_gemarkung || "",
      property_flur: data.data.property_flur || "",
      property_flurstueck: data.data.property_flurstueck || "",
      property_flurstueck_nenner: data.data.property_flurstueck_nenner || "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (formData: FormData) => {

    const [coverage, zipCodeBrw] = await Promise.all([
      getCoverage(formData.property_postalcode),
      getZipCodeBrw(formData.property_postalcode),
    ]);

    setData((prevData) => {
      const updatedData = {
        ...prevData.data,
        ...formData,
        property_gemarkung: capitalizeWords(formData.property_gemarkung),
        brw_zip_code: zipCodeBrw ?? undefined,
        int_broker_coverage: coverage.isCovered,
        int_broker_coverage_active: coverage.activeCoverage,
      };

      analytics?.track("Funnel Address Submitted", updatedData, {
        campaign: {
          gclid: data.data.gclid,
          gbraid: data.data.gbraid,
          wbraid: data.data.wbraid,
        }
      });

      return {
        ...prevData,
        data: updatedData,
      };
    });

    goToScreen(3);
  };


  const heading = "Wo befindet sich das Grundstück?";
  return (
    <>
      <div className="space-y-6 mb-4 md:mb-6">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
      </div>
      <div className="bg-accent border rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-700 mb-4 text-center text-lg">
          Für eine schnellere Ermittlung der Bodenrichtwerte empfehlen wir die{" "}
          <span className="font-medium text-primary">Eingabe der Adresse</span>.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              goToScreen(1, true);
              setData((prevData) => ({
                ...prevData,
                data: {
                  ...prevData.data,
                  property_location_type: "address",
                },
              }));
            }}
            className="mx-auto bg-primary hover:brightness-90 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Zur Adresseingabe
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <FormFieldComponent
            control={form.control}
            name="property_postalcode"
            label="PLZ"
            placeholder="10117"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_gemarkung"
            label="Gemarkung"
            placeholder="Berlin-Charlottenburg"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_flur"
            label="Flur"
            placeholder="60"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_flurstueck"
            label="Flurstück"
            placeholder="7"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="property_flurstueck_nenner"
            label="Flurstück-Nenner"
            placeholder="6"
          />
          <div className="mt-auto">
            <BackAndForthNew />
          </div>
        </form>
      </Form>
    </>
  );
}
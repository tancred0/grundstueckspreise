"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormItemCheckMark,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import StepsComponent from "../../steps-component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { z } from "zod";
import { useBRWFunnel } from "../brw-funnel-context";
import { useState, useEffect } from "react";
import ButtonRenderer from "@/components/ui/ButtonRenderer";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { AgbText, CONSENT_CONFIG, computeConsentHash } from '@/config/consent-versions';
import verifyPhoneNumberGoogle from "@/components/utils/phoneNumber/verifyPhoneNumberGoogle";
import { useRouter } from "next/navigation";
import { uploadLead } from "@/server/actions/lead-upload";
import capitalizeWords from "@/components/utils/capitalizeWords";
import type { NewLead } from "@/server/db/schema";
// import { sendGAEvent } from "@/components/utils/analytics";
import { Trust, TrustWithIcon } from "../../trust";



const schema = z.object({
  user_salutation: z.enum(["Herr", "Frau"], {
    required_error: "Anrede ist erforderlich",
  }),
  user_firstname: z.string().min(1, { message: "Vorname ist erforderlich" }),
  user_lastname: z.string().min(1, { message: "Nachname ist erforderlich" }),
  user_email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  user_phone: z
    .string().min(1, { message: "Telefonnummer ist erforderlich" })
    // First, check if the phone number starts with 00 and return a specific error
    .refine((value) => !value.startsWith("00"), {
      message:
        'Internationale Rufnummern bitte mit "+" anstelle von "00" angeben',
    })
    // only allow for numbers, spaces and +
    .refine((value) => value.replace(/[\s\+\-\d]/g, "").length === 0, {
      message: 'Telefonnummer darf nur aus den Zahlen 0-9 und "+" bestehen',
    }),
  // Then validate the phone number format
  // .refine(validatePhoneNumber, {
  //   message: "Ungültige Telefonnummer",
  // }),
});

type FormData = z.infer<typeof schema>;

interface FormFieldComponentProps {
  name: Exclude<keyof FormData, "user_salutation" | "terms">;
  label: React.ReactNode;
  placeholder: string;
  control: Control<FormData>;
  required?: boolean;
  customError?: string | null;
  onClearCustomError?: () => void;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
  name,
  label,
  placeholder,
  control,
  required = false,
  customError = null,
  onClearCustomError,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const displayError = fieldState.error || customError;
      const errorMessage = fieldState.error?.message || customError;

      return (
        <FormItem className="mb-2 md:mb-4 gap-2 md:gap-4">
          <div className="flex items-center justify-between ">
            <FormLabel required={required} htmlFor={name} className="text-small md:text-base text-primary">{label}</FormLabel>
            {displayError && (
              <span className="text-red-500 text-sm md:hidden whitespace-nowrap">{errorMessage}</span>
            )}
          </div>
          <div className="md:flex md:items-center md:gap-4 h-10 md:h-12">
            <FormControl className="flex-1">
              <Input
                placeholder={placeholder}
                {...field}
                className={displayError ? "h-10 md:h-12 border-2 border-red-500" : "h-10 md:h-12"}
                onChange={(e) => {
                  field.onChange(e);
                  if (customError && onClearCustomError) {
                    onClearCustomError();
                  }
                }}
              />
            </FormControl>
            <div className="hidden md:flex md:shrink-0 md:h-12 md:items-center md:min-w-0">
              {displayError && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
              )}
            </div>
          </div>
        </FormItem>
      );
    }}
  />
);

const GenderFieldComponent: React.FC<{ control: Control<FormData> }> = ({
  control,
}) => (
  <FormField
    control={control}
    name="user_salutation"

    render={({ field }) => (
      <FormItem className="pb-4 md:pb-6 md:gap-4 flex flex-col md:grid md:grid-cols-[1fr_3fr]">
        <FormLabel className="text-small md:text-base text-primary" required={true}>Anrede</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={"Herr"}
            className="flex flex-row"
          >
            <FormItemCheckMark>
              <FormControl>
                <RadioGroupItem value="Herr" />
              </FormControl>
              <FormLabel className="text-primary">Herr</FormLabel>
            </FormItemCheckMark>
            <FormItemCheckMark>
              <FormControl>
                <RadioGroupItem value="Frau" />
              </FormControl>
              <FormLabel className="text-primary">Frau</FormLabel>
            </FormItemCheckMark>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default function UserInfoScreen({ type = "brw" }: { type?: "brw" | "grundstuckspreis" }) {
  const { data, setData, goToScreen } = useBRWFunnel();
  const analytics = useRudderStackAnalytics();
  const [hasTracked, setHasTracked] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasTracked && data && data.data && analytics) {
      analytics?.track("Funnel Contact Page Viewed", data.data, {
        campaign: {
          gclid: data.data.gclid,
          gbraid: data.data.gbraid,
          wbraid: data.data.wbraid,
        }
      });

      setHasTracked(true);
    }
  }, [data, analytics]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_salutation: "Herr",
      user_firstname: "",
      user_lastname: "",
      user_email: "",
      user_phone: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const date_submitted = new Date().toISOString();
    // const phoneNumberFormatted = formatPhoneNumber(formData.user_phone);

    setPhoneError(null);
    try {
      const verfiedPhoneNumber = verifyPhoneNumberGoogle(formData.user_phone);

      if (!verfiedPhoneNumber.isValid) {
        analytics?.track("Funnel Invalid Phone Number", {
          ...formData,
          ...data.data,
          user_phone: verfiedPhoneNumber.formatted,
          user_phone_is_valid: verfiedPhoneNumber.isValid,
          user_phone_is_possible: verfiedPhoneNumber.isPossible,
        }, {
          campaign: {
            gclid: data.data.gclid,
            gbraid: data.data.gbraid,
            wbraid: data.data.wbraid,
          }
        });
        setPhoneError("Telefonnummer ungültig.");
        setIsSubmitting(false);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        data: {
          ...prevData.data,
          user_salutation: formData.user_salutation,
          user_firstname: formData.user_firstname,
          user_lastname: formData.user_lastname,
          user_email: formData.user_email,
          user_phone: verfiedPhoneNumber.formatted,
          date_submitted: new Date(date_submitted),
        },
      }));

      // Only fetch price for "Immobilienverkauf" or "Erbe" intentions
      const shouldFetchPrice = ["Immobilienverkauf", "Erbe oder Schenkung"].includes(
        data.data.intention_request_reason ?? ""
      );
      
      // Track consent given
      const consentHash = await computeConsentHash(CONSENT_CONFIG.consent_text);
      analytics?.track("Funnel Consent Given", {
        ...data.data,
        consent_version: CONSENT_CONFIG.consent_version,
        consent_text_hash: consentHash,
        consent_method: CONSENT_CONFIG.consent_method,
        agb_version: CONSENT_CONFIG.agb_version,
        dse_version: CONSENT_CONFIG.dse_version,
        form_url: window.location.href,
        form_type: 'brw_funnel',
      }, {
        campaign: {
          gclid: data.data.gclid,
          gbraid: data.data.gbraid,
          wbraid: data.data.wbraid,
        }
      });

      // Pass frontend data directly to uploadLead with overrides
      const uploadResult = await uploadLead({
        ...data.data,
        date_submitted: new Date(date_submitted),
        user_salutation: formData.user_salutation,
        user_firstname: capitalizeWords(formData.user_firstname),
        user_lastname: capitalizeWords(formData.user_lastname),
        user_email: formData.user_email,
        user_phone: verfiedPhoneNumber.formatted,
      } as NewLead, {
        skipEmail: true,
        skipPriceFetch: !shouldFetchPrice,
      });

      if (!uploadResult.success) {
        console.error("Failed to upload lead:", uploadResult.errors);
      }

      analytics?.track("Funnel Contact Submitted", {
        ...data.data,
        ...formData,
        user_phone: verfiedPhoneNumber.formatted,
      }, {
        campaign: {
          gclid: data.data.gclid,
          gbraid: data.data.gbraid,
          wbraid: data.data.wbraid,
        }
      });

      // sendGAEvent({
      //   action: "BRW | Funnel Contact Submitted",
      //   data: {
      //     ...data.data,
      //     ...formData,
      //     user_phone: verfiedPhoneNumber.formatted,
      //   },
      // });

      localStorage.setItem(
        "funnelData",
        JSON.stringify({
          ...data.data,
          ...formData,
          user_phone: verfiedPhoneNumber.formatted,
          date_submitted: date_submitted,
        })
      );

      // if (
      //   // exclude from showing BRW data
      //   data.data.intention_request_reason === "Immobilienverkauf" ||

      //   // digitale BRW not possible
      //   data.data.brw_zip_code === null ||
      //   (data.data.property_type === "Grundstück") ||
      //   (data.data.property_type === "Haus") && (data.data.property_house_units) && (data.data.property_house_units > 2) ||
      //   (data.data.property_type === "Gewerbe") ||

      //   // Admin Panel
      //   !data.data.brw_show_online
      // ) {
      //   goToScreen(99);
      // } else {
      //   // goToScreen(100);
      //   router.push("/bewertung/erfolgreich");
      // }
      goToScreen(99)
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const heading = "Der " + (type === "brw" ? "Bodenrichtwert" : "Grundstückswert") + " wurde ermittelt.";

  return (
    <>
      <div className="bg-primary rounded-t-lg p-4 md:p-6 flex items-center justify-center -mx-4 md:-mx-12 -mt-4 md:-mt-12">
        <div className="flex items-center gap-3 text-white text-center text-xs md:text-base ">
          <span className="whitespace-nowrap">Ihre Vorgangsnummer:</span>
          <span className="font-semibold whitespace-nowrap">
            {data.data.int_process_number || "BRW-2025-839201"}
          </span>
        </div>
      </div>

      <div className="mt-6 mb-6 ">
        <div className="mb-3">

          <StepsComponent currentStep={2} size="small" />
        </div>
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
        <div className="mt-2 text-base text-center text-primary hyphens-none">
          Empfängerangaben für die Übermittlung der {type === "brw" ? "Bodenrichtwertauskunft" : "Grundstückspreisauskunft"}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 h-full">
          <GenderFieldComponent control={form.control} />
          <FormFieldComponent
            control={form.control}
            name="user_firstname"
            label="Vorname"
            placeholder="Max"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="user_lastname"
            label="Nachname"
            placeholder="Mustermann"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="user_email"
            label="E-Mail"
            placeholder="max.mustermann@gmail.com"
            required={true}
          />
          <FormFieldComponent
            control={form.control}
            name="user_phone"
            label={
              <>
                Telefon{" "}
                {/* <span className="hidden md:inline">
                  <br />
                </span>
                <span className="inline md:hidden"> </span> */}
                (bei Rückfragen)
              </>
            }
            placeholder="+49 176 123 456 78"
            required={true}
            customError={phoneError}
            onClearCustomError={() => setPhoneError(null)}
          />
         <AgbText className="mt-2" />
          <div className="flex flex-col items-center mt-4 md:mt-8">
            <div className="w-full md:mb-4">
              <ButtonRenderer
                disabled={isSubmitting}
                className="w-full h-10 md:h-12 text-base md:text-lg"
                type="submit"
                text={
                  <>
                    <span className="block sm:hidden ">Bodenrichtwertauskunft erhalten</span>
                    <span className="hidden sm:block ">Amtliche Bodenrichtwertauskunft erhalten</span>
                  </>
                }
              />
            </div>
          </div>
          {/* <div className="hidden md:block mx-auto mt-4">
            <Image
              width={185}
              src={iconLong}
              alt="Logo Bodenrichtwerte Deutschland - Wide"
            />
          </div> */}
          <div className="hidden md:block mt-4 mx-auto">

            <Trust />
          </div>

          <div className="md:hidden mt-4 mx-auto">

            <TrustWithIcon />
          </div>
          <div className="mt-4 mx-auto text-center">
            <p className="text-xs text-gray-400">
              Datenquelle: Amtliche Bodenrichtwerte der Gutachterausschüsse (BORIS Deutschland)<br />
              Hinweis: Diese Auskunft ersetzt kein Verkehrswertgutachten nach § 194 BauGB.
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

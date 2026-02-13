import { useBRWFunnel } from "../brw-funnel-context";

import { BackAndForthNew } from "../brw-navigation";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import StepsComponent from "../../steps-component";

const schema = z.object({
  request_reason_detail: z
    .string()
    .min(4, "Bitte tragen Sie Ihren Grund ein.")
    .max(255, { message: "Bitte verkürzen Sie Ihre Eingabe" }),
});

type FormData = z.infer<typeof schema>;

export default function RequestReasonDetailScreen() {
  const { setData, data, goToScreen } = useBRWFunnel();
  const analytics = useRudderStackAnalytics();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      request_reason_detail: data.data.intention_request_reason_detail || "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (formData: FormData) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        intention_request_reason_detail: formData.request_reason_detail,
      },
    }));

    analytics?.track("Funnel Request Reason Detail Submitted", {
      ...data.data,
      intention_request_reason_detail: formData.request_reason_detail,
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });

    goToScreen(5);
  };

  const handleScheidungClick = () => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        intention_request_reason_detail: "Scheidung",
      },
    }));

    analytics?.track("Funnel Request Reason Detail Submitted", {
      ...data.data,
      intention_request_reason_detail: "SCHEIDUNG",
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });

    goToScreen(5);
  };


  return (
    <>
      <div className="space-y-6 mb-4 md:mb-12">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          Für welchen Zweck wird die Bewertung benötigt?
        </div>
        <div className="text-neutral-600 text-center">
          Bitte geben Sie uns mehr Hintergrundinformationen für die
          Bewertungsanfrage:
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col space-y-4">
          <button
            type="button"
            onClick={handleScheidungClick}
            className="flex w-full  items-center justify-center rounded-md border border-gray-200 bg-gray-200 px-3 py-2 md:px-4 md:py-3 transition-colors hover:bg-gray-300"
          >
            <span className="font-medium text-gray-700">Scheidung</span>
          </button>

          <FormField
            control={form.control}
            name="request_reason_detail"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Anfragegrund ..."
                    {...field}
                    className={fieldState.error ? "border-2 border-red-500 sm:col-span-4" : "sm:col-span-4"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto">
            <BackAndForthNew />
          </div>
        </form>
      </Form>
    </>
  );
}

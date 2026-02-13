import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { OnlyBackNew, BackAndForthNew } from "../brw-navigation";
import { useBRWFunnel } from "../brw-funnel-context";
import StepsComponent from "../../steps-component";

export default function YearBuiltScreen() {
  const { data, goToScreen, setData } = useBRWFunnel();

  const heading = "In welchem Jahr wurde die Immobilie gebaut?";
  const nextScreen = 23;

  const minValue = 1850;
  const maxValueSlider = 2026;
  const defaultValue = 1985;

  const [flaeche, setFlaeche] = useState<number[]>([
    data.data.property_year_built ?? defaultValue,
  ]);

  const handleValueChange = (value: number) => {
    const clampedValue = Math.min(Math.max(value, minValue), maxValueSlider);
    setFlaeche([clampedValue]);
  };

  const handleSubmit = () => {
    const clampedValue = Math.min(
      Math.max(flaeche[0]!, minValue),
      maxValueSlider,
    );

    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        property_year_built: clampedValue,
      },
    }));

    // analytics?.track("Funnel Property Year Built Submitted", {
    //   ...data.data,
    //   property_year_built: clampedValue,
    // });
  };

  return (
    <>
      <div className="space-y-6 mb-4 md:mb-12">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
        {/* Large centered value display */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-baseline gap-2 rounded-lg bg-accent px-6 py-3">
            <span className="text-primary text-xl">Jahr:</span>
            <span className="font-bold text-4xl text-primary">
              {flaeche[0]!}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-8 w-full">
          <Slider
            className="mb-4"
            max={maxValueSlider}
            min={minValue}
            onValueChange={(value) => {
              setFlaeche(value);
            }}
            step={1}
            value={flaeche}
          />
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>{minValue}</span>
            <span>{maxValueSlider}</span>
          </div>
        </div>

        {/* Alternative input */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-muted-foreground">Manuelle Eingabe:</span>
            <div className="flex items-center gap-2">
              <Input
                className="w-24 border-border text-center focus:border-primary"
                max={maxValueSlider}
                min={minValue}
                onBlur={(e) => {
                  const value =
                    e.target.value === ""
                      ? defaultValue
                      : parseInt(e.target.value) || defaultValue;
                  handleValueChange(value);
                }}
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? 0
                      : parseInt(e.target.value) || 0;
                  setFlaeche([value]);
                }}
                placeholder="1985"
                type="number"
                value={flaeche[0] || ""}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <BackAndForthNew nextScreen={nextScreen} preSubmit={handleSubmit} />
      </div>
    </>
  );
}

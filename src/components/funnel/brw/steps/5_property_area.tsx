import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BackAndForthNew } from "../brw-navigation";

import { useState } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "../../steps-component";

export default function PropertyAreaScreen() {
  const { data, setData } = useBRWFunnel();
  const analytics = useRudderStackAnalytics();
  const defaultMaxValue = 5000;
  const [maxValueSlider, setMaxValueSlider] = useState(defaultMaxValue);

  const heading = "Wie groß ist die Grundstücksfläche?";
  const nextScreen = 6;
  const minValue = 50;
  // const maxValueSlider = 5000;
  const defaultValue = 425;

  const unitType = "m²";
  const unitTypeSingular = unitType;

  const [flaeche, setFlaeche] = useState<number[]>([
    data.data.property_plot_area || defaultValue,
  ]);

  const handleSubmit = () => {
    const bestBrw = data.data.brw_value ?? data.data.brw_zip_code;
    const valuation = bestBrw != null ? Math.round(bestBrw * (flaeche[0] ?? defaultValue) * 100) / 100 : 200_000;

    // set the data
    setData((prevData) => {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          property_plot_area: flaeche[0],
          brw_valuation: valuation,
        },
      };
    });

    analytics?.track("Funnel Property Area Submitted", {
      ...data.data,
      property_plot_area: flaeche[0],
      brw_valuation: valuation,
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });

    // goToScreen(6);
  };

  return (
    <>
      <div className="space-y-6 mb-4 md:mb-12">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
        {/* Large centered value display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-2 bg-accent px-6 py-3 rounded-lg">
            <span className="text-4xl font-bold text-primary">
              {(flaeche[0] ?? defaultValue).toLocaleString("de-DE")}
            </span>
            <span className="text-xl text-primary">{unitType}</span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-8 w-full">
          <Slider
            className="mb-4"
            min={minValue}
            max={maxValueSlider}
            step={5}
            value={flaeche}
            onValueChange={(value) => {
              setFlaeche(value);
              const val = value[0] ?? defaultValue;
              // Adjust slider max if value exceeds current max
              if (val > maxValueSlider) {
                setMaxValueSlider(Math.max(Math.ceil(val / 1000) * 1000, 10000));
              }
              // Reset max to default if value becomes smaller than default
              else if (val < defaultMaxValue && maxValueSlider > defaultMaxValue) {
                setMaxValueSlider(defaultMaxValue);
              }
            }}
          />
          <div className="flex justify-between text-sm text-neutral-600">
            <span>
              {minValue.toLocaleString("de-DE")} {unitTypeSingular}
            </span>
            <span>
              {maxValueSlider.toLocaleString("de-DE")} {unitType}
            </span>
          </div>
        </div>

        {/* Alternative input */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-neutral-700">Manuelle Eingabe:</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-24 text-center border-border focus:border-primary"
                placeholder="425"
                value={flaeche[0] || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                  setFlaeche([value]);
                  // Adjust slider max if value exceeds current max
                  if (value > maxValueSlider) {
                    setMaxValueSlider(Math.max(Math.ceil(value / 1000) * 1000 + 1000, 10000));
                  }
                  // Reset max to default if value becomes smaller than default
                  else if (value < defaultMaxValue && maxValueSlider > defaultMaxValue) {
                    setMaxValueSlider(defaultMaxValue);
                  }
                }}
                min={minValue}
                max={100000}
              />
              <span className="text-neutral-700">{unitType}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <BackAndForthNew preSubmit={handleSubmit} nextScreen={nextScreen}/>
      </div>
    </>
  );
}

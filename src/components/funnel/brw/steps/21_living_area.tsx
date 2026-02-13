import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { OnlyForward, OnlyBack, BackAndForthNew } from "../brw-navigation";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import StepsComponent from "../../steps-component";

export default function LivingAreaScreen() {
  const { data, setData } = useBRWFunnel();

  const [maxValueSlider, setMaxValueSlider] = useState(800);
  const item = "Wohnfläche";
  const minValue = 35;
  const defaultValue = 125;
  const unitType = "m²";

  const [flaeche, setFlaeche] = useState<number[]>([
    data.data.property_living_area || defaultValue,
  ]);

  const handleSubmit = () => {
    // set the data
    setData((prevData) => {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          property_living_area: flaeche[0],
        },
      };
    });

    // analytics?.track("Funnel Property Living Area Submitted", {
    //   ...data.data,
    //   property_living_area: flaeche[0],
    // });

    // goToScreen(22);
  };

  const heading = "Wie groß ist die Wohnfläche?";
  const nextScreen = 22;
  const defaultMaxValue = 800;
  const unitTypeSingular = unitType;

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
              <div className="flex justify-between text-sm text-muted-foreground">
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
                <span className="text-muted-foreground">Manuelle Eingabe:</span>
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
                  <span className="text-muted-foreground">{unitType}</span>
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


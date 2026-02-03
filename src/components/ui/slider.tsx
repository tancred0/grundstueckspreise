"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			className={cn(
				"relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
				className,
			)}
			data-slot="slider"
			defaultValue={defaultValue}
			max={max}
			min={min}
			value={value}
			{...props}
		>
			    <SliderPrimitive.Track className="relative h-3 md:h-4 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative flex items-center justify-center h-8 w-6 md:h-10 md:w-8 rounded-md bg-primary shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-90 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-xl">
      <div className="flex items-center gap-0.5">
        <div className="w-0.5 h-4 md:h-5 bg-white rounded-full"></div>
        <div className="w-0.5 h-4 md:h-5 bg-white rounded-full"></div>
      </div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
	);
}

export { Slider };

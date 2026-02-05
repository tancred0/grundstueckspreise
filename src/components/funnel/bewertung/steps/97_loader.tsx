import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import iconLong from "@/images/general/logo_wide_black_font.svg";
import StepsComponent from "../../steps-component";
import { Trust, TrustWithIcon } from "../../trust";
import { useBewertungsFunnel } from "../bewertung-funnel-context";

interface CheckItem {
	id: string;
	label: string;
	value: boolean;
	isRunning: boolean;
}

interface LoaderScreenProps {
	type?: "brw" | "grundstuckspreis";
}

const PROGRESS_TIMINGS = {
	DATENCHECK_COMPLETE: 30, // First item: 1.5x longer (30 steps)
	STANDORTCHECK_START: 31,
	STANDORTCHECK_COMPLETE: 91, // Second item: 1.5x longer (60 steps)
	BEWERTUNG_START: 92,
	BEWERTUNG_COMPLETE: 150, // Third item: 1.5x longer (58 steps)
	TIMER_INTERVAL: 50,
	COMPLETION_DELAY: 700,
};

const getInitialChecks = (): CheckItem[] => {
	const baseChecks = [
		{ id: "datencheck", label: "Datencheck", value: false, isRunning: true },
		{
			id: "standortcheck",
			label: "Standortcheck",
			value: false,
			isRunning: false,
		},
		{ id: "bewertung", label: "Bewertung", value: false, isRunning: false },
	];
	return baseChecks;
};

// Component for the header section
const HeaderSection = ({ heading }: { heading: string }) => (
	<div className="mb-4 space-y-4 md:mb-10">
		<h2 className="text-xl font-semibold text-primary md:text-2xl text-center">{heading}</h2>
	</div>
);

// Component for the main loading spinner or checkmark
const MainSpinner = ({ allCompleted }: { allCompleted: boolean }) => (
	<div className="flex items-center pt-6 md:pb-10">
		<div className="mx-auto h-24 w-24">
			{allCompleted ? (
				<Check className="h-24 w-24 text-primary" />
			) : (
				<svg className="h-24 w-24 animate-spin" viewBox="0 0 24 24">
					<circle
						className="opacity-0"
						cx="12"
						cy="12"
						fill="none"
						r="10"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<circle
						className="opacity-100"
						cx="12"
						cy="12"
						fill="none"
						r="10"
						stroke="#0f3b6b"
						strokeDasharray="32.5 22.5"
						strokeWidth="2"
					/>
				</svg>
			)}
		</div>
	</div>
);

// Component for the check list
const CheckList = ({ checks }: { checks: CheckItem[] }) => (
	<div className="mx-auto w-full">
		<div className="funnel-container space-y-2">
			{checks.map((check) => (
				<CheckItem check={check} key={check.id} />
			))}
		</div>
	</div>
);

// Component for individual check items
const CheckItem = ({ check }: { check: CheckItem }) => (
	<div
		className={`flex items-center justify-between rounded-lg px-4 py-3 ${
			check.value || check.isRunning ? "bg-accent" : ""
		}`}
	>
		<span className="text-primary">{check.label}</span>
		<CheckStatus check={check} />
	</div>
);

// Component for check status (spinner, checkmark, or nothing)
const CheckStatus = ({ check }: { check: CheckItem }) => (
	<div className="flex items-center">
		{check.value ? (
			<Check className="h-6 w-6 text-primary" />
		) : check.isRunning ? (
			<SmallSpinner />
		) : null}
	</div>
);

// Component for small spinner used in check items
const SmallSpinner = () => (
	<div className="h-6 w-6">
		<svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24">
			<circle
				className="opacity-0"
				cx="12"
				cy="12"
				fill="none"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<circle
				className="opacity-100"
				cx="12"
				cy="12"
				fill="none"
				r="10"
				stroke="#0f3b6b"
				strokeDasharray="32.5 22.5"
				strokeWidth="2"
			/>
		</svg>
	</div>
);

export default function LoaderScreen() {
	const { data, setData, goToScreen } = useBewertungsFunnel();
	const [progress, setProgress] = useState(0);
	const [checks, setChecks] = useState<CheckItem[]>(() => getInitialChecks());

	// Fetch BRW data on component mount
	// useEffect(() => {
	//   const fetchBRWData = async () => {
	//     try {
	//       const result = await shouldShowBRW({
	//         request_reason: data.data.intention_request_reason || "",
	//         property_detail_type: data.data.property_type_details || "",
	//         sales_horizon: data.data.intention_horizon_sell || "",
	//         owner_status: data.data.user_is_owner || "",
	//         lead_source: data.data.utm_source ? "paid" : "organic",
	//       });

	//       console.log("Showing BRW", result);

	//       setData((prevData) => ({
	//         ...prevData,
	//         data: {
	//           ...prevData.data,
	//           int_show_brw_online: result,
	//         },
	//       }));
	//     } catch (error) {
	//       console.error("Error fetching Admin Panel data:", error);
	//     }
	//   };

	//   fetchBRWData();
	// }, [data.data, setData]);

	// Helper functions for check management
	const updateCheck = (id: string) => {
		setChecks((prevChecks) =>
			prevChecks.map((check) =>
				check.id === id ? { ...check, value: true, isRunning: false } : check,
			),
		);
	};

	const setRunning = (id: string) => {
		setChecks((prevChecks) =>
			prevChecks.map((check) =>
				check.id === id ? { ...check, isRunning: true } : check,
			),
		);
	};

	// Progress timer effect
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 150) {
					clearInterval(timer);
					return 150;
				}
				const newProgress = oldProgress + 1;

				// Handle progress milestones
				switch (newProgress) {
					case PROGRESS_TIMINGS.DATENCHECK_COMPLETE:
						updateCheck("datencheck");
						break;
					case PROGRESS_TIMINGS.STANDORTCHECK_START:
						setRunning("standortcheck");
						break;
					case PROGRESS_TIMINGS.STANDORTCHECK_COMPLETE:
						updateCheck("standortcheck");
						break;
					case PROGRESS_TIMINGS.BEWERTUNG_START:
						setRunning("bewertung");
						break;
					case PROGRESS_TIMINGS.BEWERTUNG_COMPLETE:
						updateCheck("bewertung");
						break;
				}

				return newProgress;
			});
		}, PROGRESS_TIMINGS.TIMER_INTERVAL);

		return () => clearInterval(timer);
	}, []);

	// Navigate to next screen when all checks complete
	useEffect(() => {
		if (checks.every((check) => check.value)) {
			setTimeout(() => {
				goToScreen(98, true);
			}, PROGRESS_TIMINGS.COMPLETION_DELAY);
		}
	}, [checks, goToScreen]);

	const heading = "Der Immobilienpreis für Ihre Immobilie wird abgerufen.";

	const allCompleted = checks.every((check) => check.value);

	return (
		<>
			<HeaderSection heading={heading} />
			<MainSpinner allCompleted={allCompleted} />

			<div className="flex flex-1 flex-col justify-center">
				<CheckList checks={checks} />
			</div>

			<div className="mt-auto space-y-4">
				<div className="flex justify-center">
					<Image
						alt="Logo Immobilienpreise Deutschland 2026 - Wide"
						src={iconLong}
						width={185}
					/>
				</div>
				<Trust />
			</div>
		</>
	);
}

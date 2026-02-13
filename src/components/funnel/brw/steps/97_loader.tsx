import { useState, useEffect } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import { Check } from "lucide-react";

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
  DATENCHECK_COMPLETE: 30,       // First item: 1.5x longer (30 steps)
  STANDORTCHECK_START: 31,
  STANDORTCHECK_COMPLETE: 91,    // Second item: 1.5x longer (60 steps)
  BEWERTUNG_START: 92,
  BEWERTUNG_COMPLETE: 150,       // Third item: 1.5x longer (58 steps)
  TIMER_INTERVAL: 50,
  COMPLETION_DELAY: 700,
};

const getInitialChecks = (isBayern: boolean): CheckItem[] => {
  const baseChecks = [
    { id: "datencheck", label: "Datencheck", value: false, isRunning: true },
    { id: "standortcheck", label: isBayern ? "Standortcheck" : "BORIS Portal Aufruf", value: false, isRunning: false },
    { id: "bewertung", label: isBayern ? "Bewertung" : "Bodenrichtwert Abfrage", value: false, isRunning: false },
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
        <svg className="animate-spin h-24 w-24" viewBox="0 0 24 24">
          <circle
            className="opacity-0"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            className="opacity-100"
            cx="12"
            cy="12"
            r="10"
            stroke="#0f3b6b"
            strokeWidth="2"
            fill="none"
            strokeDasharray="32.5 22.5"
          />
        </svg>
      )}
    </div>
  </div>
);

// Component for the check list
const CheckList = ({ checks }: { checks: CheckItem[] }) => (
  <div className="mx-auto w-full ">
    <div className="funnel-container  space-y-2">
      {checks.map((check) => (
        <CheckItemComponent key={check.id} check={check} />
      ))}
    </div>
  </div>
);

// Component for individual check items
const CheckItemComponent = ({ check }: { check: CheckItem }) => (
  <div
    className={`flex items-center justify-between py-3 px-4 rounded-lg ${
      check.value || check.isRunning ? "bg-accent" : ""
    }`}
  >
    <span className="text-primary">
      {check.label}
    </span>
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
  <div className="w-6 h-6">
    <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
      <circle
        className="opacity-0"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle
        className="opacity-100"
        cx="12"
        cy="12"
        r="10"
        stroke="#0f3b6b"
        strokeWidth="2"
        fill="none"
        strokeDasharray="32.5 22.5"
      />
    </svg>
  </div>
);



export default function LoaderScreen({ type = "brw" }: LoaderScreenProps) {
  const { data, goToScreen } = useBRWFunnel();
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState<CheckItem[]>(() =>
    getInitialChecks(data.data.property_state === "Bayern")
  );

  // Helper functions for check management
  const updateCheck = (id: string) => {
    setChecks((prevChecks) =>
      prevChecks.map((check) =>
        check.id === id ? { ...check, value: true, isRunning: false } : check
      )
    );
  };

  const setRunning = (id: string) => {
    setChecks((prevChecks) =>
      prevChecks.map((check) =>
        check.id === id ? { ...check, isRunning: true } : check
      )
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

  const heading = type === "brw"
    ? "Der Bodenrichtwert für Ihre Immobilie wird abgerufen."
    : "Der Grundstückspreis für Ihre Immobilie wird abgerufen.";

  const allCompleted = checks.every((check) => check.value);

  return (
    <>
      <HeaderSection heading={heading} />
      <MainSpinner allCompleted={allCompleted} />
      <CheckList checks={checks} />
    </>
  );
}


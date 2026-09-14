"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STUDIO_MAIL = "geral@salazarconcept.com";

function isPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

const STEPS = [
  {
    key: "name" as const,
    type: "text",
    autoComplete: "name",
    label: "01 — Name",
    placeholder: "Your name",
    error: "Just your name is enough",
  },
  {
    key: "idea" as const,
    type: "text",
    autoComplete: "off",
    label: "02 — Idea",
    placeholder: "Describe your idea",
    error: "A few words is plenty",
  },
  {
    key: "email" as const,
    type: "email",
    autoComplete: "email",
    label: "03 — Email",
    placeholder: "you@email.com",
    error: "That email looks incomplete",
  },
  {
    key: "phone" as const,
    type: "tel",
    autoComplete: "tel",
    label: "04 — Phone",
    placeholder: "+351 912 345 678",
    error: "That number looks incomplete",
  },
] as const;

const FIELD_COUNT = STEPS.length;
const WAIT_STEP = FIELD_COUNT + 1;
const DONE_STEP = FIELD_COUNT + 2;

type FieldKey = (typeof STEPS)[number]["key"];
type Values = Record<FieldKey, string>;

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 58 L58 14 M22 14 H58 V50"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function InquiryCard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    name: "",
    idea: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  const activeField = step >= 1 && step <= FIELD_COUNT ? STEPS[step - 1] : null;

  useEffect(() => {
    if (step >= 1 && step <= FIELD_COUNT) inputRef.current?.focus();
  }, [step]);

  const validate = (key: FieldKey, value: string) => {
    const trimmed = value.trim();
    const field = STEPS.find((item) => item.key === key);
    if (!trimmed) return field?.error ?? "Required";
    if (key === "email" && !EMAIL_RE.test(trimmed)) {
      return "That email looks incomplete";
    }
    if (key === "phone" && !isPhone(trimmed)) {
      return "That number looks incomplete";
    }
    return null;
  };

  const submit = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStep(WAIT_STEP);
    setError(null);

    const name = values.name.trim();
    const idea = values.idea.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nIdea:\n${idea}\n`;
    const href = `mailto:${STUDIO_MAIL}?subject=${encodeURIComponent(
      `Start journey — ${name}`
    )}&body=${encodeURIComponent(body)}`;

    try {
      await new Promise((resolve) => setTimeout(resolve, 420));
      window.location.href = href;
      setStep(DONE_STEP);
    } catch {
      setError("Couldn’t send, try again in a moment");
      setStep(FIELD_COUNT);
    } finally {
      submittingRef.current = false;
    }
  };

  const advance = () => {
    if (!activeField) return;
    const msg = validate(activeField.key, values[activeField.key]);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    if (step < FIELD_COUNT) setStep(step + 1);
    else void submit();
  };

  const start = () => {
    setError(null);
    setStep(1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      advance();
    }
  };

  return (
    <div className="site-footer-inquiry">
      {step === 0 && (
        <button type="button" className="site-footer-journey" onClick={start}>
          <span>Start journey</span>
          <Arrow className="site-footer-journey-icon" />
        </button>
      )}

      <div aria-live="polite" key={step} className="site-footer-inquiry-step">
        {activeField && (
          <div className="site-footer-inquiry-flow">
            <div className="site-footer-inquiry-meta">
              {step > 1 ? (
                <button
                  type="button"
                  className="site-footer-inquiry-back"
                  onClick={() => {
                    setError(null);
                    setStep(step - 1);
                  }}
                >
                  Back
                </button>
              ) : (
                <span />
              )}
              <span className="site-footer-inquiry-label">
                {activeField.label}
              </span>
            </div>

            <div className="site-footer-inquiry-field">
              <input
                ref={inputRef}
                type={activeField.type}
                inputMode={activeField.type === "tel" ? "tel" : undefined}
                autoComplete={activeField.autoComplete}
                placeholder={activeField.placeholder}
                value={values[activeField.key]}
                onChange={(event) => {
                  setError(null);
                  setValues((current) => ({
                    ...current,
                    [activeField.key]: event.target.value,
                  }));
                }}
                onKeyDown={handleKeyDown}
                className="site-footer-inquiry-input"
              />
              <button
                type="button"
                onClick={advance}
                aria-label={step === FIELD_COUNT ? "Send" : "Continue"}
                className="site-footer-inquiry-submit"
              >
                <Arrow />
              </button>
            </div>

            {error && (
              <span role="alert" className="site-footer-inquiry-error">
                {error}
              </span>
            )}

            <div className="site-footer-inquiry-dots" aria-hidden="true">
              {STEPS.map((item, index) => (
                <span
                  key={item.key}
                  className={index + 1 === step ? "is-on" : undefined}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === WAIT_STEP && (
          <div className="site-footer-inquiry-wait">
            <span className="site-footer-inquiry-spinner" aria-hidden="true">
              <Arrow />
            </span>
          </div>
        )}

        {step === DONE_STEP && (
          <p className="site-footer-inquiry-done">We’ll write back soon.</p>
        )}
      </div>
    </div>
  );
}

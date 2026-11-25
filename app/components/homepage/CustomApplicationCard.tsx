"use client";

import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { TbX } from "react-icons/tb";

import { Card } from "@/app/components/content/Card";
import { homepageContactChannelsConfiguration } from "@/app/config/homepageContactConfiguration";
import { homepageServicesSectionCopyConfiguration } from "@/app/config/homepageServicesConfiguration";
import {
  normaliseServiceInquiry,
  serviceInquiryBudgetOptions,
  serviceInquiryHoneypotFieldName,
  serviceInquiryLimits,
  serviceInquiryTimelineOptions,
  validateServiceInquiry,
  type ServiceInquiryErrors,
  type ServiceInquiryField,
} from "@/app/config/serviceInquiry";
import { homepageServicesSectionPolicy } from "@/app/constants/policy";

export const serviceInquiryEndpoint = "/api/service-inquiry";

type Status = "idle" | "submitting" | "success" | "error";

const emailChannel = homepageContactChannelsConfiguration.find((channel) => channel.channelKey === "email");
const focusableSelector = 'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea';
const fieldOrder: readonly ServiceInquiryField[] = ["name", "email", "need", "budget", "timeline"];

/**
 * The 8th Services card. Opens a native modal <dialog>: the page behind is inert, Tab is kept
 * inside, Esc closes, and focus returns to the card's button on close.
 */
export function CustomApplicationCard() {
  const copy = homepageServicesSectionCopyConfiguration.customApplication;
  const policy = homepageServicesSectionPolicy;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();
  const [errors, setErrors] = useState<ServiceInquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const fieldId = (field: string) => `${idPrefix}-${field}`;

  const open = () => {
    setStatus("idle");
    setStatusMessage("");
    setErrors({});
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
  };
  const close = () => dialogRef.current?.close();
  const onDialogClose = () => triggerRef.current?.focus();

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (element) => element.offsetParent !== null || element === document.activeElement,
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const focusFirstError = (fieldErrors: ServiceInquiryErrors) => {
    const firstField = fieldOrder.find((field) => fieldErrors[field]);
    if (firstField) document.getElementById(fieldId(firstField))?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData.entries());
    const clientErrors = validateServiceInquiry(normaliseServiceInquiry(raw));
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus("idle");
      focusFirstError(clientErrors);
      return;
    }
    setStatus("submitting");
    setStatusMessage("Sending...");
    try {
      const response = await fetch(serviceInquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: ServiceInquiryErrors; message?: string };
      if (response.ok && body.ok) {
        setStatus("success");
        setStatusMessage("Thanks, your message is on its way. I will reply by email.");
        formRef.current?.reset();
        return;
      }
      if (body.errors) {
        setErrors(body.errors);
        focusFirstError(body.errors);
      }
      setStatus("error");
      setStatusMessage(body.message ?? "Please check the highlighted fields.");
    } catch {
      setStatus("error");
      setStatusMessage("The form could not send right now. Please email me instead.");
    }
  };

  const describedBy = (field: ServiceInquiryField) => (errors[field] ? fieldId(`${field}-error`) : undefined);
  const fieldError = (field: ServiceInquiryField) =>
    errors[field] ? (
      <p id={fieldId(`${field}-error`)} className={policy.fieldErrorClassName} data-test={`inquiry-error-${field}`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <Card className={policy.cardClassName}>
      <h3 className={policy.cardTitleClassName}>{copy.title}</h3>
      <p className="text-sm text-textSecondary">{copy.summary}</p>
      <div className={policy.cardFooterClassName}>
        <button
          ref={triggerRef}
          type="button"
          className={policy.bookLinkClassName}
          aria-haspopup="dialog"
          onClick={open}
          data-test="custom-application-open"
        >
          {copy.buttonLabel}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={fieldId("title")}
        className={policy.dialogClassName}
        onClose={onDialogClose}
        onKeyDown={onDialogKeyDown}
        data-test="custom-application-dialog"
      >
        <div className={policy.dialogHeaderClassName}>
          <h2 id={fieldId("title")} className="text-lg font-semibold">
            {copy.title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            className={policy.dialogCloseButtonClassName}
            onClick={close}
            data-test="custom-application-close"
          >
            <TbX aria-hidden className="h-5 w-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="space-y-4">
            <p role="status" className="text-base text-textPrimary" data-test="inquiry-success">
              {statusMessage}
            </p>
            <button type="button" className={policy.submitButtonClassName} onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit} className={policy.formStackClassName} data-test="inquiry-form">
            <div className={policy.fieldRowClassName}>
              <div>
                <label htmlFor={fieldId("name")} className={policy.fieldLabelClassName}>Name</label>
                <input id={fieldId("name")} name="name" autoComplete="name" required maxLength={serviceInquiryLimits.nameMaxLength}
                  aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("name")} className={policy.fieldInputClassName} />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor={fieldId("email")} className={policy.fieldLabelClassName}>Email</label>
                <input id={fieldId("email")} name="email" type="email" autoComplete="email" required maxLength={serviceInquiryLimits.emailMaxLength}
                  aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("email")} className={policy.fieldInputClassName} />
                {fieldError("email")}
              </div>
            </div>
            <div>
              <label htmlFor={fieldId("need")} className={policy.fieldLabelClassName}>What you need</label>
              <textarea id={fieldId("need")} name="need" rows={4} required minLength={serviceInquiryLimits.needMinLength} maxLength={serviceInquiryLimits.needMaxLength}
                aria-invalid={errors.need ? true : undefined} aria-describedby={describedBy("need")} className={policy.fieldInputClassName} />
              {fieldError("need")}
            </div>
            <div className={policy.fieldRowClassName}>
              <div>
                <label htmlFor={fieldId("budget")} className={policy.fieldLabelClassName}>Budget range</label>
                <select id={fieldId("budget")} name="budget" required defaultValue=""
                  aria-invalid={errors.budget ? true : undefined} aria-describedby={describedBy("budget")} className={policy.fieldInputClassName}>
                  <option value="" disabled>Choose a range</option>
                  {serviceInquiryBudgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                {fieldError("budget")}
              </div>
              <div>
                <label htmlFor={fieldId("timeline")} className={policy.fieldLabelClassName}>Timeline</label>
                <select id={fieldId("timeline")} name="timeline" required defaultValue=""
                  aria-invalid={errors.timeline ? true : undefined} aria-describedby={describedBy("timeline")} className={policy.fieldInputClassName}>
                  <option value="" disabled>Choose a timeline</option>
                  {serviceInquiryTimelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                {fieldError("timeline")}
              </div>
            </div>
            <div className={policy.honeypotClassName} aria-hidden="true">
              <label htmlFor={fieldId("hp")}>Leave this empty</label>
              <input id={fieldId("hp")} name={serviceInquiryHoneypotFieldName} tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className={policy.submitButtonClassName} disabled={status === "submitting"} data-test="inquiry-submit">
                {status === "submitting" ? "Sending..." : "Send inquiry"}
              </button>
              <p role="status" aria-live="polite" className={policy.statusClassName} data-test="inquiry-status">
                {status === "error" ? statusMessage : status === "submitting" ? statusMessage : ""}
                {status === "error" && emailChannel ? (
                  <>
                    {" "}
                    <a href={emailChannel.href} className="text-accentPrimary underline">{emailChannel.displayText}</a>
                  </>
                ) : null}
              </p>
            </div>
          </form>
        )}
      </dialog>
    </Card>
  );
}

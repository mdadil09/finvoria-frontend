/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

// If you have your own UI components, import them:
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

interface CardPaymentInputsProps {
  // Each field is the "field" object from react-hook-form's Controller
  cardNumberField: any;
  cardHolderField: any;
  expiryField: any;
  cvvField: any;

  // Optional placeholders and styling
  placeholderCardNumber?: string;
  placeholderName?: string;
  placeholderExpiry?: string;
  placeholderCVV?: string;
  className?: string;
}

export default function CardPaymentInputs({
  cardNumberField,
  cardHolderField,
  expiryField,
  cvvField,
  placeholderCardNumber,
  placeholderName,
  placeholderExpiry,
  placeholderCVV,
  className,
}: CardPaymentInputsProps) {
  // Extract card detection + input props from react-payment-inputs
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta,
  } = usePaymentInputs();

  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      {/* Card Number + Brand Logo */}
      <div className="flex items-center rounded-md border border-dark-600 bg-white p-2">
        {/* Brand Logo */}
        {meta.cardType && (
          //@ts-ignore
          <svg {...getCardImageProps({ images })} className="mr-2 w-10 h-6" />
        )}
        <FormControl className="flex-1">
          <Input
            {...getCardNumberProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                // Only store digits in react-hook-form
                cardNumberField.onChange(e.target.value.replace(/\D/g, ""));
              },
            })}
            value={cardNumberField.value || ""}
            placeholder={placeholderCardNumber || "1234 5678 9012 3456"}
            className="shad-input border-0"
          />
        </FormControl>
      </div>

      {/* Cardholder Name (simple text input) */}
      <div className="flex items-center rounded-md border border-dark-600 bg-white p-2">
        <FormControl className="flex-1">
          <Input
            placeholder={placeholderName || "Name on Card"}
            value={cardHolderField.value || ""}
            onChange={(e) => cardHolderField.onChange(e.target.value)}
            className="shad-input border-0"
          />
        </FormControl>
      </div>

      {/* Expiry */}
      <div className="flex items-center rounded-md border border-dark-600 bg-white p-2">
        <FormControl className="flex-1">
          <Input
            {...getExpiryDateProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                expiryField.onChange(e.target.value),
            })}
            value={expiryField.value || ""}
            placeholder={placeholderExpiry || "MM/YY"}
            className="shad-input border-0"
          />
        </FormControl>
      </div>

      {/* CVV */}
      <div className="flex items-center rounded-md border border-dark-600 bg-white p-2">
        <FormControl className="flex-1">
          <Input
            {...getCVCProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                cvvField.onChange(e.target.value),
            })}
            value={cvvField.value || ""}
            placeholder={placeholderCVV || "CVV"}
            className="shad-input border-0"
          />
        </FormControl>
      </div>
    </div>
  );
}

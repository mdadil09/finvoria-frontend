/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FormFieldType } from "../../../types/types";
import CustomFormField from "../../CustomFormField";
import { formatCardNumber, formatCVC, formatExpiry } from "../../../lib/utils";

const CardForm = ({
  form,
  state,
  setState,
}: {
  form: any;
  state: any;
  setState: any;
}) => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setState((prev: any) => ({ ...prev, focus: event.target.name }));
  };
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="w-full md:w-1/2 md:mb-0 mb-4">
        <Cards
          number={state.cardNumber}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>
      <div className="w-full md:w-2/5 space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="cardNumber"
          type="tel"
          placeholder="4012 8888 8888 1881"
          onFocus={handleFocus}
          iconSrc=""
          iconAlt=""
          onChange={(e) => {
            const formattedValue = formatCardNumber(e.target.value);
            form.setValue("cardNumber", formattedValue, {
              shouldValidate: true,
            });
          }}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="cardHolderName"
          type="text"
          placeholder="Enter Card Holder Name"
          onFocus={handleFocus}
          iconSrc=""
          iconAlt=""
        />
        <div className="flex items-center justify-between space-x-1">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="expiry"
            type="tel"
            placeholder="MM/YY"
            onFocus={handleFocus}
            iconSrc=""
            iconAlt=""
            onChange={(e) => {
              const formattedValue = formatExpiry(e.target.value);
              form.setValue("expiry", formattedValue, {
                shouldValidate: true,
              });
            }}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="cvc"
            type="tel"
            placeholder="CVC"
            onFocus={handleFocus}
            iconSrc=""
            iconAlt=""
            onChange={(e) => {
              const formattedValue = formatCVC(e.target.value);
              form.setValue("CVC", formattedValue, {
                shouldValidate: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;

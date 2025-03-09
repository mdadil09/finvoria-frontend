/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useSelector } from "react-redux";
import CustomFormField from "../../CustomFormField";
import { Form, FormControl } from "../../ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import SubmitButton from "../../SubmitButton";
import { getPaymentMethodSchema } from "../../../lib/validation";
import { PaymentDefaultValues } from "../../../constant";
import CardPaymentInputs from "../../misc/CardNumberField";

const CardForm = ({ type }: { type: string }) => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const formValidation = getPaymentMethodSchema(type);

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      ...PaymentDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof formValidation>) => {
    console.log(values);
    setIsLoading(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-8 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        {type == "card" && (
          <Controller
            name="cardNumber"
            control={form.control}
            render={({ field }) => (
              <Controller
                name="cardNumber"
                control={form.control}
                render={({ field: cardNumberField }) => (
                  <Controller
                    name="cardHolder"
                    control={form.control}
                    render={({ field: cardHolderField }) => (
                      <Controller
                        name="expiry"
                        control={form.control}
                        render={({ field: expiryField }) => (
                          <Controller
                            name="cvv"
                            control={form.control}
                            render={({ field: cvvField }) => (
                              <CardPaymentInputs
                                cardNumberField={cardNumberField}
                                cardHolderField={cardHolderField}
                                expiryField={expiryField}
                                cvvField={cvvField}
                              />
                            )}
                          />
                        )}
                      />
                    )}
                  />
                )}
              />
            )}
          />
        )}
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default CardForm;

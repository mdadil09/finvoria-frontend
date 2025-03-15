/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useSelector } from "react-redux";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import SubmitButton from "../../SubmitButton";
import { getPaymentMethodSchema } from "../../../lib/validation";
import { PaymentDefaultValues } from "../../../constant";
import CardForm from "./CardForm";
import CustomFormField from "../../CustomFormField";
import { FormFieldType } from "../../../types/types";
import { addPaymentMethod, getBank } from "../../../api/api";
import NetBankingForm from "./NetBankingForm";
import { toast } from "sonner";

const AddNewPaymentMethod = ({
  type,
}: {
  type: "card" | "upi" | "netbanking" | "wallet";
}) => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [loadingState, setLoadingState] = useState({
    card: false,
    upi: false,
    netbanking: false,
    wallet: false,
  });
  const formValidation = getPaymentMethodSchema(type);
  const [state, setState] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [banks, setBanks] = useState([]);

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      ...PaymentDefaultValues,
    },
  });

  const getBankList = async () => {
    try {
      const res = await getBank(token);
      setBanks(res?.data?.banks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (type === "card" && "cardNumber" in values) {
        setState((prev) => ({
          ...prev,
          cardNumber: values.cardNumber ?? "",
          expiry: values.expiry ?? "",
          cvc: values.cvc ?? "",
          name: values.cardHolderName ?? "",
          focus: name ?? "",
        }));
      }
    });
    getBankList();
    return () => subscription.unsubscribe();
  }, [form.watch, type]);

  console.log(state);

  const onSubmit = async (values: z.infer<typeof formValidation>) => {
    setLoadingState((prev) => ({ ...prev, [type]: true }));
    console.log(values);

    const formData = new FormData();
    if (type === "card" && "cardNumber" in values) {
      formData.append("cardNumber", values.cardNumber);
      formData.append("expiry", values.expiry);
      formData.append("cvc", values.cvc);
      formData.append("name", values.cardHolderName);
    } else if (type === "upi" && "upiId" in values) {
      formData.append("upiId", values.upiId);
    } else if (type === "netbanking" && "bankName" in values) {
      formData.append("bankName", values.bankName);
      formData.append("accountNumber", values.accountNumber);
      formData.append("accountHolderName", values.accountHolderName);
      formData.append("ifcsCode", values.ifcsCode);
      formData.append("accountType", values.accountType);
      formData.append("privacyConsent", String(values.privacyConsent));
    }

    try {
      const res = await addPaymentMethod(formData, token, type, user?._id);

      console.log(res);

      if (res?.success === true) {
        toast.success(res?.message);
        setLoadingState((prev) => ({ ...prev, [type]: false }));
      }
    } catch (error) {
      console.log(error);
      setLoadingState((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mt-0 mb-1">
          <h3 className="sub-header">
            {type == "card"
              ? "Add new card"
              : type == "upi"
              ? "Add your upi id"
              : type == "netbanking"
              ? "Add Net Banking"
              : "Add Wallets"}
          </h3>
        </section>
        {type == "card" && (
          <CardForm state={state} form={form} setState={setState} />
        )}
        {type == "upi" && (
          <div>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="upiId"
              type="text"
              placeholder="Enter your UPI ID (e.g., username@bank)"
              iconSrc=""
              iconAlt=""
            />
            <p className="text-dark-600 text-12-regular mt-2">
              Your UPI ID are encrypted for security and 100% safe with us.
            </p>
          </div>
        )}
        {type === "netbanking" && <NetBankingForm banks={banks} form={form} />}
        <SubmitButton isLoading={loadingState[type]}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default AddNewPaymentMethod;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage } from "../../ui/avatar";
import logoIcon from "../../../assets/icons/logo-icon-solid.svg";
import { useState } from "react";
import CustomFormField from "../../CustomFormField";
import { FormFieldType } from "../../../types/types";
import SubmitButton from "../../SubmitButton";
import { walletSchema } from "../../../lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { addPaymentMethod, sendWalletOtp } from "../../../api/api";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Wallet = () => {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  const [selectedWallet, setSelectedWallet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [isOtpModeOn, setIsOtpModeOn] = useState(false);
  const wallets = [
    { name: "Finvoria", logo: logoIcon, requiresOtp: true },
    {
      name: "Paytm Wallet",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
      requiresOtp: false,
    },
    {
      name: "Amazon Pay",
      logo: "https://cdn.brandfetch.io/idO-tKGZ90/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1740549185344",
      requiresOtp: false,
    },
    {
      name: "MobiKwik",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwBLKgulWecs7jqX2BDxOv06F78bawJ8KHA&s",
      requiresOtp: false,
    },
    {
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg",
      requiresOtp: false,
    }, // International Wallet
  ];

  const form = useForm<z.infer<typeof walletSchema>>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      walletId: "",
      otp: "",
      walletName: selectedWallet,
    },
  });

  const handleClick = (name: string, isOtpRequired: boolean) => {
    console.log(name);
    setSelectedWallet(name);
    setIsOtpRequired(isOtpRequired);
    if (!isOtpRequired) {
      setIsOtpModeOn(false);
    }

    console.log(isOtpModeOn);
  };

  const onSubmit = async (values: z.infer<typeof walletSchema>) => {
    try {
      setIsLoading(true);

      if (isOtpModeOn) {
        const formData = new FormData();
        formData.append("walletId", values.walletId);
        if (values.otp !== undefined) {
          formData.append("otp", values.otp);
        }
        formData.append("walletName", selectedWallet);
        const res = await addPaymentMethod(
          formData,
          token,
          "wallet",
          user?._id
        );
        console.log("OTP Verification Response:", res);

        if (res?.success) {
          toast.success(res?.message);
          setIsOtpModeOn(false);
          setSelectedWallet("");
        }
      } else {
        if (selectedWallet == "Finvoria" && isOtpRequired) {
          console.log(values.walletId);

          const res = await sendWalletOtp(values.walletId, token);
          console.log("OTP Sent Response:", res);

          if (res?.success) {
            toast.success("OTP sent successfully!");
            setIsOtpModeOn(true);
          }
        } else {
          setIsOtpModeOn(false);
        }
      }

      if (selectedWallet !== "Finvoria") {
        setIsOtpModeOn(false);
        const formData = new FormData();
        formData.append("walletId", values.walletId);
        formData.append("walletName", selectedWallet);
        const res = await addPaymentMethod(
          formData,
          token,
          "wallet",
          user?._id
        );

        if (res?.success) {
          toast.success(res?.message);
          setSelectedWallet("");
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {wallets.map((wallet, index) => (
        <div
          className="border-2 border-slate-300 px-2 py-2 rounded-md w-full flex flex-col self-start"
          key={index}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Avatar className="h-10 w-10 rounded-full items-center bg-slate-100 cursor-pointer">
                <AvatarImage src={wallet.logo} alt="" />
              </Avatar>
              <div className="ml-2">
                <p className="text-12-semibold">{wallet?.name}</p>
                <p className="text-10-regular text-dark-600 mt-1">
                  Add your {wallet?.name} wallet
                </p>
              </div>
            </div>
            <button
              className="background-none border-none text-16-semibold text-blue-500 cursor-pointer"
              onClick={() => handleClick(wallet.name, wallet.requiresOtp)}
            >
              Add
            </button>
          </div>
          {selectedWallet == wallet?.name && (
            <div className="mt-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 flex-1"
                >
                  {!isOtpModeOn ? (
                    <>
                      {selectedWallet === "Paytm Wallet" ||
                      selectedWallet === "MobiKwik" ? (
                        <CustomFormField
                          fieldType={FormFieldType.PHONE_INPUT}
                          control={form.control}
                          name="walletId"
                          label="Phone number"
                          placeholder="898-903-1423"
                          iconSrc=""
                          iconAlt="phone"
                        />
                      ) : (
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="walletId"
                          type="text"
                          placeholder="Email or mobile number"
                          iconSrc=""
                          iconAlt=""
                          className="text-12-regular shad-input-small border-none"
                        />
                      )}
                      <p className="text-dark-600 text-10-regular mt-2">
                        Enter your {selectedWallet} linked mobile number or
                        email
                      </p>
                    </>
                  ) : (
                    <>
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="otp"
                        type="number"
                        placeholder="Enter OTP"
                        iconSrc=""
                        iconAlt="otp"
                        className="text-12-regular shad-input-small border-none"
                      />
                      <p className="text-dark-600 text-10-regular mt-2">
                        A 6-digit OTP has been sent to your Finvoria linked
                        number/email.
                      </p>
                    </>
                  )}
                  <SubmitButton isLoading={isLoading}>
                    {selectedWallet === "Finvoria"
                      ? isOtpModeOn
                        ? "Verify OTP"
                        : "Send OTP"
                      : "Submit"}
                  </SubmitButton>
                </form>
              </Form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Wallet;

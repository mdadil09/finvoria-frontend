/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormFieldType } from "../../../types/types";
import CustomFormField from "../../CustomFormField";
import "./auth-form.css";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "../../ui/form";
import userIcon from "../../../assets/icons/user.svg";
import emailIcon from "../../../assets/icons/email.svg";
import SubmitButton from "../../SubmitButton";

export interface AuthFormProps<T extends FieldValues> {
  type: "login" | "register";
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isLoading: boolean;
}

const AuthForm = <T extends FieldValues>({
  type,
  form,
  onSubmit,
  isLoading,
}: AuthFormProps<T>) => {
  return (
    <>
      <div className="auth">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex-1"
          >
            <section className="mb-8">
              <h1 className="header text-center">
                {type === "login"
                  ? "Sign in to Finvoria"
                  : "Sign up for an account"}
              </h1>
              <p className="text-dark-700 text-center mt-0">
                {type === "login"
                  ? "Send, spend and save smarter."
                  : "Send, spend and save smarter."}
              </p>
            </section>

            {type !== "login" && (
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="Enter your full name"
                iconSrc={userIcon}
                iconAlt="user"
              />
            )}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email address"
              iconSrc={emailIcon}
              iconAlt="email"
            />
            {type !== "login" && (
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="898-903-1423"
                iconSrc=""
                iconAlt="phone"
              />
            )}
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              iconSrc=""
              iconAlt="password"
            />
            <SubmitButton isLoading={isLoading}>
              {type === "login" ? "Login" : "Get Started"}
            </SubmitButton>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthForm;

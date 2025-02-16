/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthForm from "../../components/forms/auth/AuthForm";
import hero from "../../assets/hero.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "../../lib/validation";
import { z } from "zod";
import { useState } from "react";
import { register } from "../../api/api";
import { OtpModal } from "../../components/ui/OtpModal";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
    password,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const result: any = await register({ name, email, phone, password });
      if (result) {
        setOpen(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen max-h-screen">
      <img src={hero} alt="patient" className="side-img max-w-[50%]" />
      <OtpModal open={open} setOpen={setOpen} />
      <section className="remove-scrollbar container flex h-screen">
        <div className="sub-container max-w-[496px] flex flex-col h-screen justify-center">
          <AuthForm
            type="register"
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />

          <div className="text-14-regular mt-5 mb-5 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 Finvoria
            </p>
            <div className="flex items-center">
              <p className="text-14-semibold mr-1">Already have an account?</p>
              <Link
                to={"/"}
                className="text-blue-500 text-14-regular leading-none m-0"
              >
                Sign In
              </Link>{" "}
              {/* <Link
                href="/?user=true"
                className="text-green-500 text-14-regular"
              >
                Login as user
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;

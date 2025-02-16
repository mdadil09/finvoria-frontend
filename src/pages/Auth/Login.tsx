/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthForm from "../../components/forms/auth/AuthForm";
import "./auth.css";
import hero from "../../assets/hero.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginFormValidation } from "../../lib/validation";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../api/api";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/slices/authSlice";
import { toast } from "sonner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof UserLoginFormValidation>>({
    resolver: zodResolver(UserLoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof UserLoginFormValidation>) => {
    setIsLoading(true);
    try {
      const result: any = await login({ email, password });
      console.log(result.user);
      const userId = result?.user?._id;
      if (userId) {
        dispatch(setLogin({ user: result?.user, token: result.token }));
        navigate(`/dashboard?userId=${userId}`);
        if (result.user.isPhoneVerified === false) {
          setTimeout(() => {
            toast.warning("Please verify your phone number");
          }, 5000);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    // <Card className="card_container">
    <div className="flex h-screen max-h-screen">
      <img src={hero} alt="patient" className="side-img max-w-[50%]" />
      <section className="remove-scrollbar container flex h-screen">
        <div className="sub-container max-w-[496px] flex flex-col h-screen justify-center">
          <AuthForm
            type="login"
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />

          <div className="text-14-regular mt-5 mb-5 flex justify-between">
            <Link
              to="/forgot-password"
              className="text-14-regular text-blue-500 mb-0 flex text-center"
            >
              Forgot password?
            </Link>
            <div className="flex items-center">
              <p className="text-14-semibold mr-1">Don't have an account?</p>
              <Link to={"/register"} className="text-blue-500 text-14-regular">
                Sign Up
              </Link>{" "}
            </div>
          </div>
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 Finvoria
          </p>
        </div>
      </section>
    </div>
    // </Card>
  );
};

export default Login;

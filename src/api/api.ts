/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { toast } from "sonner";

const baseUrl = "http://localhost:5000/api/v1";

interface formProps {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface loginProps {
  email: string;
  password: string;
}

interface otpProps {
  email: string;
  otp: string;
  setError?: (open: string) => void;
}

export const register = async ({ name, email, phone, password }: formProps) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${baseUrl}/auth/register`,
      { name, email, phone, password },
      config
    );

    localStorage.setItem("email", email);
    toast.success(res?.data?.message);
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

export const verifyOtp = async ({ email, otp }: otpProps) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${baseUrl}/auth/verifyotp`,
      { email, otp },
      config
    );
    toast.success(res?.data?.message);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

export const login = async ({ email, password }: loginProps) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${baseUrl}/auth/signin`,
      { email, password },
      config
    );
    toast.success(res.data.message);
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

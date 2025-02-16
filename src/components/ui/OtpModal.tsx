/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { MoveRight, X } from "lucide-react";
import { verifyOtp } from "../../api/api";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setRegister } from "../../redux/slices/authSlice";

export const OtpModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const email: string =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  const validateOtp = async () => {
    try {
      const newUser = await verifyOtp({ email, otp });

      console.log(newUser);

      const userId = newUser?.user?._id;
      if (userId) {
        dispatch(setRegister({ user: newUser?.user, token: newUser.token }));
        navigate(`/dashboard?userId=${userId}`);
        setOtp("");
        setOpen && setOpen(false);
      }
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setOtp("");
    setOpen && setOpen(false);
  };

  const handleModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOtp("");
      return;
    }
    setOpen && setOpen(isOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleModalOpenChange}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            Verfiy your phone number
            <X
              style={{ cursor: "pointer", color: "red" }}
              onClick={closeModal}
              size={18}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            {email
              ? `An otp is sent to ${email}, please enter your otp.`
              : "Loading..."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )} */}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn w-full flex items-center"
            onClick={validateOtp}
          >
            Continue <MoveRight className="ml-2" size={18} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

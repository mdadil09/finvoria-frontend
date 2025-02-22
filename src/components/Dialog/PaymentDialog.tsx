/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const PaymentDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const closeModal = () => {
    setOpen && setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-end items-center">
            <X
              className="cursor-pointer text-blue-500"
              onClick={closeModal}
              size={18}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="text-center">
              <div className="text-16-bold mb-2">Send Money</div>
              <div className="text-10-semibold text-dark-600 tracking-wider">
                Please enter user information that you want to send money
              </div>
              <div className="text-10-semibold text-dark-600 tracking-wider">
                and enter amount
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-12-bold">Recent Contact</div>
            <div className="flex items-center">
              <ChevronLeft
                className="text-dark-700"
                style={{ height: "16px" }}
              />{" "}
              <ChevronRight
                className="text-blue-500"
                style={{ height: "16px" }}
              />
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="shad-primary-btn w-full flex items-center">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentDialog;

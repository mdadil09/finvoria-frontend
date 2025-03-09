/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CreditCard, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useSelector } from "react-redux";
import { useState } from "react";
import creditcard from "../../assets/icons/cred-card.png";
import upi from "../../assets/icons/upi.png";
import netBank from "../../assets/icons/internet-banking.png";
import wallet from "../../assets/icons/wallet-banking.png";
import CardForm from "../forms/payments/CardForm";

const PaymentMethodDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const methods = [
    { id: "card", label: "Card", icon: creditcard },
    { id: "upi", label: "UPI", icon: upi },
    { id: "netbanking", label: "Net Banking", icon: netBank },
    { id: "wallet", label: "Wallet", icon: wallet },
  ];

  const closeModal = () => {
    setOpen && setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <div className="text-18-semibold">Choose Payment Method</div>
            <X
              className="cursor-pointer text-blue-500"
              onClick={closeModal}
              size={18}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex justify-between items-center bg-blue-300 rounded-r-lg rounded-l-lg">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center text-light-200
            py-2 px-4 ${selectedMethod === method.id ? "rounded-lg" : ""}
            ${selectedMethod === method.id ? "bg-blue-500" : ""}
          `}
                >
                  <img
                    src={method.icon}
                    alt={method.label}
                    className="mr-2 h-6 w-6"
                  />
                  {method.label}
                </button>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between item-center mt-4">
          {selectedMethod && <CardForm type={selectedMethod} />}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentMethodDialog;

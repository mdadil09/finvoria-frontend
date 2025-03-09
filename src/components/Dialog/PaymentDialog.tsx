/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChevronLeft, ChevronRight, EyeIcon, Plus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cardDetails, transactions } from "../../lib/db";
import { useEffect, useState } from "react";
import { getFormattedName, getInitials } from "../../lib/utils";
import creditcard from "../../assets/credit-card.svg";
import visa from "../../assets/visa.svg";
import { useSelector } from "react-redux";
import { getContacts } from "../../api/api";
import AddContactDialog from "./AddContactDialog";
import PaymentMethodDialog from "./PaymentMethodDialog";

const PaymentDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [contacts, setContacts] = useState([]);
  const [hasNoData, setHasNoData] = useState(false);
  const [selectPaymentType, setSelectPaymentType] = useState("");
  const [count, setCount] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState<{
    user: any;
    paymentType: string;
    amount: string;
  } | null>(null);
  const [amount, setAmount] = useState("");
  const [openAddContact, setOpenAddContact] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const handleSelectUser = (userId: any) => {
    console.log(userId);
    setSelectedUser(userId);
  };

  const closeModal = () => {
    setSelectedUser({});
    setSelectPaymentType("");
    setAmount("");
    setOpen && setOpen(false);
  };

  const handleOpenModal = (type: string) => {
    if (type == "Add Contact") {
      setOpenAddContact && setOpenAddContact(true);
    } else if (type == "Payment") {
      setOpenPayment && setOpenPayment(true);
    }
  };

  const handleSelectPaymentMethod = (value: any) => {
    if (selectPaymentType === value) {
      setSelectPaymentType("");
    } else {
      setSelectPaymentType(value);
    }
  };

  const handlePayment = async () => {
    setPaymentDetails({
      //@ts-ignore
      user: { id: selectedUser.id, name: selectedUser?.name },
      paymentType: selectPaymentType,
      amount: amount,
    });
  };

  const disabledButton = () => {
    return !(
      amount.length > 0 &&
      selectPaymentType.length > 0 &&
      selectedUser &&
      Object.keys(selectedUser).length > 0
    );
  };

  const handleIncrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrementCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const getContactsDetails = async (updatedCount: any) => {
    console.log("count: ", updatedCount);

    const result = await getContacts(user?._id, token, updatedCount);
    console.log(result);

    const hasMoreDataAvailable = result?.data?.contacts?.previous !== undefined;
    console.log("Has More Data:", hasMoreDataAvailable);

    setHasNoData(hasMoreDataAvailable);

    console.log(hasNoData);

    setContacts(result?.data?.contacts?.results);
  };

  console.log(contacts);

  useEffect(() => {
    getContactsDetails(count);
  }, [count]);

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
              <div className="text-12-regular text-dark-600 tracking-wider">
                Please enter user information that you want to send money
              </div>
              <div className="text-12-regular text-dark-600 tracking-wider">
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
                className={`${
                  count <= 1 ? "text-dark-700" : "text-blue-500"
                } cursor-pointer`}
                style={{ height: "16px" }}
                onClick={count <= 1 ? undefined : handleDecrementCount}
              />{" "}
              <ChevronRight
                className={`${
                  hasNoData ? "text-dark-700" : "text-blue-500"
                } cursor-pointer`}
                style={{ height: "16px" }}
                onClick={hasNoData ? undefined : handleIncrementCount}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-8 mt-4">
            <div
              className="flex flex-col items-center"
              onClick={() => handleOpenModal("Add Contact")}
            >
              <Avatar className="h-12 w-12 rounded-full bg-slate-50 cursor-pointer flex items-center justify-center">
                <Plus className="text-dark-600" style={{ height: "34px" }} />
              </Avatar>
              <div className="text-12-semibold mt-2">Add</div>
            </div>
            {contacts?.map((item: any) => (
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelectUser(item)}
                key={item?._id}
              >
                <Avatar
                  className={`h-12 w-12 rounded-full bg-slate-50 cursor-pointer overflow-hidden border-[3px] ${
                    //@ts-ignore
                    selectedUser?._id === item?._id
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <AvatarImage
                    className="w-full h-full object-cover"
                    src={item?.image}
                    alt={item?.name}
                  />
                  <AvatarFallback className="rounded-full">
                    {getInitials(item?.name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`text-12-semibold mt-2 ${
                    //@ts-ignore
                    selectedUser?._id == item?._id ? "text-blue-500" : ""
                  }`}
                >
                  {getFormattedName(item?.name)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-12-bold">Choose Method</div>
            <button
              className="border rounded-xl pr-0 pl-2 py-1 flex items-center text-12-semibold"
              onClick={() => handleOpenModal("Payment")}
            >
              Add <Plus className="h-4" />
            </button>
          </div>
          <div className="flex justify-between items-start mt-4 w-full">
            <div className="flex flex-col items-center flex-1">
              {cardDetails?.map((item, index) => {
                const isSelected = item.cardType == selectPaymentType;
                return (
                  <div
                    className={`border ${
                      isSelected ? "border-blue-500" : " border-slate-300"
                    } rounded-md p-2 mb-[14px] w-full`}
                    key={index}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center">
                        <Avatar className="h-10 w-10 rounded-full items-center bg-slate-100 cursor-pointer">
                          <AvatarImage src={item?.logo} alt={item.cardType} />
                        </Avatar>
                        <div className="ml-2">
                          <p className="text-12-semibold">{item?.cardType}</p>
                          <p className="text-10-regular text-dark-600 mt-1">
                            ₹{item?.balance}
                          </p>
                        </div>
                      </div>
                      <div className="text-18-bold">
                        <label className="cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={isSelected}
                            value={item.cardType}
                            onChange={(e) =>
                              handleSelectPaymentMethod(e.target.value)
                            }
                          />
                          <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                            <svg
                              className="w-3 h-3 text-white opacity-1 peer-checked:opacity-100 transition-opacity duration-200"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center flex-1 ml-2">
              <div className="relative w-full">
                <img
                  src={creditcard}
                  alt="creditcard"
                  className="w-full max-h-[142px] h-auto"
                />
                <div className="absolute">
                  <div className="flex items-center text-12-semibold text-dark-700 absolute bottom-10 left-4">
                    Balance{" "}
                    <EyeIcon
                      className="ml-2"
                      style={{ height: "14px", width: "14px" }}
                    />
                  </div>
                  <div className="text-16-semibold text-light-200 absolute left-4 bottom-4">
                    ₹24,098.00
                  </div>
                  <div className="absolute bottom-4 left-28 md:left-40 lg:left-[162px]">
                    <img
                      src={visa}
                      alt="visa"
                      className="h-auto z-50 max-w-14"
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-full flex items-center h-12 mt-2 border-2 border-blue-500 rounded-md p-2">
                <input
                  type="text"
                  id="floating_filled"
                  className="block px-1 pb-1 pt-3.5 w-full text-14-semibold text-dark-200 border-0 appearance-none focus:outline-none focus:ring-0 focus:border-none peer"
                  placeholder=" "
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label
                  htmlFor="floating_filled"
                  className="pb-2 absolute text-sm text-dark-200 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-dark-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-4px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Enter amount
                </label>
              </div>
            </div>
            {openAddContact && (
              <AddContactDialog
                open={openAddContact}
                setOpen={setOpenAddContact}
              />
            )}
            {openPayment && (
              <PaymentMethodDialog
                open={openPayment}
                setOpen={setOpenPayment}
              />
            )}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn w-full flex items-center cursor-pointer"
            onClick={handlePayment}
            disabled={disabledButton()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentDialog;

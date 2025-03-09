/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { X } from "lucide-react";
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
import { FormFieldType } from "../../types/types";
import CustomFormField from "../CustomFormField";
import { Form, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddContactFormValidation } from "../../lib/validation";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/email.svg";
import FileUploader from "../misc/FileUploader";
import { useState } from "react";
import { addContact } from "../../api/api";
import SubmitButton from "../SubmitButton";
import { ContactDefaultValues } from "../../constant";
import { toast } from "sonner";

const AddContactDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setOpen && setOpen(false);
  };

  const form = useForm<z.infer<typeof AddContactFormValidation>>({
    resolver: zodResolver(AddContactFormValidation),
    defaultValues: {
      ...ContactDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof AddContactFormValidation>) => {
    console.log(values);

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
      formData.append("fileName", values.image[0].name);
    }
    console.log("FormData:", Object.fromEntries(formData.entries())); // Debugging step

    console.log(formData);
    try {
      const res = await addContact(formData, token);

      console.log(res);

      if (res?.success == true) {
        setOpen && setOpen(false);
        toast.success(res?.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
              <div className="text-16-bold mb-2">Add Contact</div>
              <div className="text-12-regular text-dark-600 tracking-wider">
                Add a contact whom you want to send money.
              </div>
              <div className="text-12-regular text-dark-600 tracking-wider">
                Happy Sharing!
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 flex-1"
            >
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="Enter your full name"
                iconSrc={userIcon}
                iconAlt="user"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email address"
                iconSrc={emailIcon}
                iconAlt="email"
              />
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="898-903-1423"
                iconSrc=""
                iconAlt="phone"
              />
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="image"
                label="Upload your contact image"
                renderSkeleton={(field) => (
                  <FormControl>
                    <FileUploader
                      files={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
              <SubmitButton isLoading={isLoading}>Add Contact</SubmitButton>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddContactDialog;

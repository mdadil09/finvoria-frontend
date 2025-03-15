/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormField from "../../CustomFormField";
import { FormFieldType } from "../../../types/types";
import { SelectItem } from "../../ui/select";

const NetBankingForm = ({ banks, form }: { banks: any; form: any }) => {
  return (
    <div className="space-y-2">
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="bankName"
        label="Select Bank*"
        placeholder="Select a bank"
      >
        {banks?.map((bank: any) => (
          <SelectItem key={bank?._id} value={bank?.name}>
            <div className="flex cursor-pointer items-center gap-2">
              <p>{bank?.name}</p>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>
      <div className="flex items-center justify-between gap-2">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="ifcsCode"
          label="IFSC Code*"
          placeholder="IFSC Code"
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="accountType"
          label="Account type*"
          placeholder="Select account type"
        >
          <SelectItem value="Current">
            <div className="flex cursor-pointer items-center gap-2">
              <p>Current</p>
            </div>
          </SelectItem>
          <SelectItem value="Saving">
            <div className="flex cursor-pointer items-center gap-2">
              <p>Saving</p>
            </div>
          </SelectItem>
        </CustomFormField>
      </div>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="accountHolderName"
        label="Account Holder Name*"
        placeholder="Enter account holder name"
      />

      <div className="flex items-center justify-between gap-2">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="accountNumber"
          label="Account Number*"
          placeholder="Enter account number"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="confirmAccountNumber"
          label="Confirm Account Number*"
          placeholder="Re-enter account number"
        />
      </div>
      <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="privacyConsent"
        label="I authorize this account for transactions."
      />
    </div>
  );
};

export default NetBankingForm;

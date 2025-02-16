import React from "react";
import { Button } from "./ui/button";
import loader from "../assets/icons/loader.svg";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = (props: ButtonProps) => {
  const { isLoading, className, children } = props;
  return (
    <Button
      type="submit"
      className={className ?? "shad-primary-btn w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <img
            src={loader}
            style={{ height: "24px", width: "24px" }}
            alt="loader"
            className="animate-spin"
          />
          Loading
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;

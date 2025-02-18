import clsx from "clsx";

type Status = "success" | "pending" | "failed";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-50": status === "success",
        "bg-blue-50": status === "pending",
        "bg-red-50": status === "failed",
      })}
    >
      {/* <img
        src={StatusIcon[status]}
        alt={status}
        height={24}
        width={24}
        className="h-fit w-3"
      /> */}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "success",
          "text-blue-500": status === "pending",
          "text-red-500": status === "failed",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;

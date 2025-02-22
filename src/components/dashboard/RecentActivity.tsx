import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { transactions } from "../../lib/db";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDateTodayYesterdayOrShort } from "../../lib/utils";

const RecentActivity = () => {
  return (
    <div className="activity w-full">
      <div className="flex justify-between items-center">
        <div className="text-18-bold text-dark-200">Recent Activity</div>
        <Link
          to={"/activity/transactions"}
          className="flex items-center bg-slate-100 px-2 py-1 rounded-md text-12-semibold text-dark-200"
        >
          View All{" "}
          <ChevronRight
            style={{
              height: "16px",
              width: "16px",
              fontWeight: "semibold",
              marginLeft: "4px",
              marginRight: "0px",
            }}
          />
        </Link>
      </div>
      {transactions.map((item) => (
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 rounded-full mr-2">
              <AvatarImage src={item.image} alt={"user"} />
            </Avatar>
            <div className="ml-2">
              <div className="text-12-semibold mb-1">{item.name}</div>
              <div className="text-10-semibold text-dark-600">{item.type}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-16-semibold mb-1">
              {item.type === "Deposit" || item.type === "Business" ? "+" : "-"}₹
              {item.amount}
            </div>
            <div className="text-10-semibold text-dark-600">
              {formatDateTodayYesterdayOrShort(item.date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;

import {
  Ellipsis,
  EyeIcon,
  Grid2x2Plus,
  HandCoins,
  ReceiptText,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const Wallet = () => {
  return (
    <Card className="h-[80%] flex flex-col">
      <CardHeader>
        <div className="flex item-center justify-between">
          <div className="text-18-bold text-dark-200">Wallet</div>
          <Ellipsis className="text-12-semibold text-dark-700" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <div className="bg-creditcard bg-no-repeat h-52 w-80 relative">
          <div className="flex items-center text-12-semibold text-dark-700 absolute bottom-12 left-4">
            Balance{" "}
            <EyeIcon
              className="ml-2"
              style={{ height: "14px", width: "14px" }}
            />
          </div>
          <div className="text-18-semibold text-light-200 absolute left-4 bottom-4 -mt-2">
            ₹24,098.00
          </div>
          <div className="text-24-bold absolute bottom-4 right-4 text-light-200">
            Visa
          </div>
        </div>
        <div className="flex justify-between items-center mt-[6%] w-full">
          <div className="flex flex-col items-center">
            <button className="p-3 border-slate-300 border rounded-md mb-2">
              <Send className="text-violet-600" />
            </button>
            <div className="text-dark-600 text-12-semibold">Send</div>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-3 border-slate-300 border rounded-md mb-2">
              <HandCoins className="text-green-500" />
            </button>
            <div className="text-dark-600 text-12-semibold">Receive</div>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-3 border-slate-300 border rounded-md mb-2">
              <ReceiptText className="text-yellow-500" />
            </button>
            <div className="text-dark-600 text-12-semibold">Invoicing</div>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-3 border-slate-300 border rounded-md mb-2">
              <Grid2x2Plus className="text-blue-500" />
            </button>
            <div className="text-dark-600 text-12-semibold">More</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wallet;

import { Banknote, ChevronDown, WalletMinimal } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { Progress } from "../ui/progress";

const ProgressBar = () => {
  return (
    <Card className="flex-1 mb-4 sm:mb-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-18-bold text-dark-200">Saving</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center bg-slate-100 text-dark-200 text-12-semibold px-3 py-1 rounded-md text-sm">
              This Month
              <ChevronDown className="ml-auto size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-12 rounded-lg bg-light-200 z-50"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-slate-300 rounded-md p-2">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Avatar className="h-10 w-10 rounded-full items-center bg-violet-100 cursor-pointer">
                <WalletMinimal className="text-16-semibold text-violet-600 mt-2 ml-2" />
              </Avatar>
              <div className="ml-2">
                <p className="text-12-semibold">Mutual Funds</p>
                <p className="text-10-regular text-dark-600 mt-1">
                  Monthly income 10%
                </p>
              </div>
            </div>
            <div className="text-18-bold">₹545.00</div>
          </div>
          <div>
            <Progress
              value={33}
              className="z-50 bg-slate-100 mt-2"
              indicatorColor="bg-violet-500"
            />
          </div>
        </div>

        <div className="border border-slate-300 rounded-md p-2 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Avatar className="h-10 w-10 rounded-full items-center bg-green-100 cursor-pointer">
                <Banknote className="text-16-semibold text-green-400 mt-2 ml-2" />
              </Avatar>
              <div className="ml-2">
                <p className="text-12-semibold">Investment</p>
                <p className="text-10-regular text-dark-600 mt-1">
                  Monthly income 5%
                </p>
              </div>
            </div>
            <div className="text-18-bold">₹272.50</div>
          </div>
          <div>
            <Progress
              value={60}
              className="z-50 bg-slate-100 mt-2"
              indicatorColor="bg-green-400"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;

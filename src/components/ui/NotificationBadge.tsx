import { Avatar } from "./avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const NotificationBadge = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <Avatar className="h-8 w-8 rounded-full mr-2 ml-4 items-start bg-slate-100 cursor-pointer">
            <div className="bg-red-700 h-2 w-2 rounded-full absolute top-[6px] left-4"></div>
            <FontAwesomeIcon icon={faBell} className="mt-2 ml-2" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-light-200"
          align="start"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              old noti
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationBadge;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ChevronRight,
  KanbanIcon,
  LayoutDashboardIcon,
  MessageSquareTextIcon,
  ReceiptTextIcon,
  Settings2,
  Wallet,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./sidebar";

import { NavUser } from "../nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./sidebar";
import logo from "../../assets/Finvoria.svg";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: any) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  const data = {
    user: {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      avatar: user?.profilePicture,
      logout: handleLogout,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        isActive: true,
      },
      {
        title: "Invoices",
        url: "/invoices",
        icon: ReceiptTextIcon,
      },
      {
        title: "Messages",
        url: "#",
        icon: MessageSquareTextIcon,
      },
      {
        title: "My Wallets",
        url: "#",
        icon: Wallet,
      },
      {
        title: "Activity",
        url: "#",
        icon: KanbanIcon,
        items: [
          {
            title: "Transactions",
            url: "#",
          },
          {
            title: "Recipients",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="ml-4">
        <img src={logo} alt="Finvoria" className="w-24 h-10" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive = location.pathname.startsWith(item.url);
              if (item.items && item.items.length > 0) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={
                            isActive
                              ? "bg-blue-500 text-light-200 hover:bg-blue-500 hover:text-light-200"
                              : "hover:bg-blue-100"
                          }
                        >
                          {item.icon && <item.icon />}
                          <span>
                            {" "}
                            <a href={`${item.url}?userId=${data.user._id}`}>
                              <span>{item.title}</span>
                            </a>
                          </span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  isActive
                                    ? "bg-blue-500 text-light-200 hover:bg-blue-500 hover:text-light-200"
                                    : "hover:bg-blue-100"
                                }
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isActive
                        ? "bg-blue-500 text-light-200 hover:bg-blue-500 hover:text-light-200"
                        : "hover:bg-blue-100"
                    }
                  >
                    {item.icon && <item.icon />}
                    <a href={`${item.url}?userId=${data.user._id}`}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

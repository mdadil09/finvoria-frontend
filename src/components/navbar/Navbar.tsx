/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/Finvoria.svg";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ui/ProfileMenu";
import { setLogout } from "../../redux/slices/authSlice";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import NotificationBadge from "../ui/NotificationBadge";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const id: string = searchParams.get("userId") || "";
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const { open } = useSidebar();

  console.log(user);

  return (
    <header className={`${open ? "admin-header" : "admin-header-full"}`}>
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 -ml-4" />
        {!open && (
          <Link to={""} className="cursor-pointer">
            <img src={logo} alt="logo" className="w-24 h-8" />
          </Link>
        )}
      </div>
      <div className="flex items-center">
        <NotificationBadge />
        <div className="flex items-start ml-1">
          <ProfileMenu
            id={id}
            userBadge={"MA"}
            handleLogOut={handleLogOut}
            user={user}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

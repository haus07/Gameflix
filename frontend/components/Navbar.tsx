import { useCallback, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItems from "./NavbarItems";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {Skeleton} from 'antd'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const router = useRouter();
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Skeleton.Avatar active size="large" shape="circle" />;
  }

  return (
    // Dùng 'absolute' để Navbar nổi lên trên Billboard trong cùng 1 div cha
    <nav className="w-full absolute z-10">
      <div
        // Luôn trong suốt, không cần logic màu nền
        className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500"
      >
        {/* Nội dung còn lại của Navbar giữ nguyên... */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={180}
          height={80}
          className="object-contain"
          priority
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItems onclick={() => router.push(`/`)} label="Home" />
          <NavbarItems onclick={() => router.push(`/series`)} label="Series" />
          <NavbarItems label="Films" />
          <NavbarItems label="New public" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-green-800 text-sm font-medium">Browse</p>
          <BsChevronDown
            className={`text-green-800 transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <BsSearch className="text-green-600 hover:text-green-800 cursor-pointer transition" />
          <BsBell className="text-green-600 hover:text-green-800 cursor-pointer transition" />
          {user ? (
            <div
              onClick={toggleAccountMenu}
              className="flex flex-row items-center gap-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-green.png" alt="Profile" />
              </div>
              <BsChevronDown
                className={`text-green-800 transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-semibold text-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// components/AccountMenu.js
import { useAuth } from "@/context/AuthContext"; // Giả sử bạn có hàm signOut trong context
import React from 'react';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { user, logout } = useAuth(); // Lấy user và hàm signOut từ context

  if (!visible) {
    return null;
  }

  return (
    // Thay đổi ở đây: viền màu xanh lá đậm
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-green-900 flex rounded-md">
      <div className="flex flex-col gap-3">
        {/* Profile Section */}
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {/* Thay đổi ở đây: dùng ảnh đại diện xanh lá mặc định */}
          <img className="rounded-md w-8" src="/images/default-green.png" alt="Profile" />
          <p className="text-white text-sm group-hover/item:underline group-hover/item:text-green-400 transition">
            {/* Nâng cấp: Hiển thị tên thật của user */}
            {user?.username || 'Username'}
          </p>
        </div>

        {/* Thay đổi ở đây: đường kẻ màu xanh lá */}
        <hr className="bg-green-800 bg-opacity-50 border-0 h-px my-4" />

        {/* Nâng cấp ở đây: Nút Sign out đẹp hơn và có sự kiện onClick */}
        <div
          onClick={logout}
          className="
            mx-3
            px-3
            py-2
            rounded-md
            text-center
            text-white
            text-sm
            hover:bg-green-600
            transition
            cursor-pointer
          "
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
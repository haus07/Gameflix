import { useMovie } from "@/hooks/movie/useMovie";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineLoading3Quarters,
  AiOutlineSend,
} from "react-icons/ai";
import { BsPlay, BsPause, BsChatDots, BsPeopleFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { io } from "socket.io-client";

// ... (Giữ nguyên phần khai báo interface, state, và logic useEffect của socket.io)

const Watch = () => {
  // ... (Toàn bộ logic state, ref, useEffect... giữ nguyên như phiên bản trước)
  const socket = io(process.env.SOCKETIO_URL as string); // Nhớ đổi biến env
  const router = useRouter();
  const { movieId } = router.query;
  const movieData = useMovie(movieId as any); // Sửa type number thành any hoặc string cho phù hợp
  const data = movieData.movie;
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Original states
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // New chat states
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  // Dữ liệu giả để hiển thị, sẽ được thay thế bằng dữ liệu thật từ socket
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah",
      text: "Phim này hay quá! 🍿",
      timestamp: "10:23 PM",
      isMe: false,
      avatar: "S",
    },
    {
      id: 2,
      user: "You",
      text: "Công nhận! Góc quay đỉnh thật sự",
      timestamp: "10:24 PM",
      isMe: true,
      avatar: "Y",
    },
    {
      id: 3,
      user: "Mike",
      text: "Đợi cảnh tiếp theo đi, còn hay hơn nữa",
      timestamp: "10:24 PM",
      isMe: false,
      avatar: "M",
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "You", status: "online", avatar: "Y", isHost: true },
    { id: 2, name: "Sarah", status: "online", avatar: "S", isHost: false },
    { id: 3, name: "Mike", status: "online", avatar: "M", isHost: false },
  ]);

  // Các hàm và useEffect khác giữ nguyên...
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      setIsNavVisible(true);
      timeout = setTimeout(() => setIsNavVisible(false), 3000);
    };
    const handleMouseMove = () => resetTimeout();
    const handleKeyPress = () => resetTimeout();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyPress);
    resetTimeout();
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleGoBack = () => router.back();
  const handleIframeLoad = () => setIsLoading(false);
  const handleSendMessage = () => {
    /* Giữ nguyên */
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /* Giữ nguyên */
  };
  if (movieData.isLoading) {
    /* Giữ nguyên phần loading */
  }

  return (
    <div
      className="relative h-screen w-screen bg-black overflow-hidden group flex"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Main Video Area */}
      <div className="relative flex-1 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40 z-0" />

        {/* Navigation Header */}
        <nav
          className={`fixed top-0 left-0 ${
            isChatOpen ? "right-96" : "right-0"
          } p-6 z-50 flex flex-row items-center justify-between bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm transition-all duration-500 ease-in-out ${
            isNavVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={handleGoBack}
              // THAY ĐỔI: Đổi màu hover sang xanh lá
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-green-400 hover:bg-white/20 hover:border-green-400/50 transition-all duration-300 ease-out hover:scale-110 active:scale-95 group/button"
            >
              <AiOutlineArrowLeft
                className="transition-transform duration-300 group-hover/button:-translate-x-0.5"
                size={24}
              />
            </button>

            <div className="flex flex-col">
              <p className="text-white/60 text-sm font-light tracking-wider uppercase flex items-center gap-2">
                {/* THAY ĐỔI: Chấm live màu xanh */}
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Watch Party
              </p>
              <h1 className="text-white text-xl md:text-3xl font-bold tracking-tight">
                {data?.title || "Loading..."}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <HiUsers size={20} />
              <span className="text-sm font-medium">{users.length}</span>
            </button>

            {!isChatOpen && (
              <button
                onClick={() => setIsChatOpen(true)}
                // THAY ĐỔI: Nút mở chat màu xanh
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/40 text-white hover:bg-green-500/30 transition-all duration-300"
              >
                <BsChatDots size={20} />
                <span className="text-sm font-medium">Chat</span>
              </button>
            )}
          </div>
        </nav>

        {/* User List Popup */}
        {showUserList && (
          <div className="fixed top-24 right-6 z-50 w-72 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                {/* THAY ĐỔI: Icon màu xanh */}
                <BsPeopleFill className="text-green-500" />
                Viewers ({users.length})
              </h3>
              <button
                onClick={() => setShowUserList(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="relative">
                    {/* THAY ĐỔI: Gradient avatar màu xanh */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      {user.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${
                        user.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                      {user.name}
                      {user.isHost && (
                        // THAY ĐỔI: Badge host màu xanh
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Host
                        </span>
                      )}
                    </p>
                    <p className="text-white/40 text-xs capitalize">
                      {user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-pulse"></div>
                {/* THAY ĐỔI: Icon play màu xanh */}
                <BsPlay
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
                  size={32}
                />
              </div>
              <p className="text-white/80 text-lg font-light mt-4 animate-pulse">
                Preparing your movie experience...
              </p>
            </div>
          </div>
        )}

        <iframe
          className="absolute inset-0 w-full h-full z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={data?.mainSource}
          onLoad={handleIframeLoad}
          title={data?.title || "Movie Player"}
        />

        {/* Bottom Control Hints */}
        <div
          className={`fixed bottom-0 left-0 ${
            isChatOpen ? "right-96" : "right-0"
          } p-6 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ease-in-out ${
            showControls
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        />

        {/* Ambient lighting effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* THAY ĐỔI: Ánh sáng ambient màu xanh */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 z-50 bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center gap-3">
            {/* THAY ĐỔI: Gradient header và icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <BsChatDots className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">
                Watch Party Chat
              </h2>
              <p className="text-white/40 text-xs">
                {users.length} viewers online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.isMe ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* THAY ĐỔI: Màu avatar của bạn và người khác */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                  msg.isMe
                    ? "bg-gradient-to-br from-green-500 to-teal-600"
                    : "bg-gradient-to-br from-sky-500 to-cyan-600"
                }`}
              >
                {msg.avatar}
              </div>
              <div
                className={`flex flex-col ${
                  msg.isMe ? "items-end" : "items-start"
                } max-w-[70%]`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {/* THAY ĐỔI: Màu tên người dùng */}
                  <span
                    className={`text-xs font-medium ${
                      msg.isMe ? "text-green-400" : "text-sky-400"
                    }`}
                  >
                    {msg.user}
                  </span>
                  <span className="text-white/30 text-xs">{msg.timestamp}</span>
                </div>
                {/* THAY ĐỔI: Màu bong bóng chat */}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.isMe
                      ? "bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-tr-sm"
                      : "bg-white/5 border border-white/10 rounded-tl-sm"
                  }`}
                >
                  <p className="text-white text-sm leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-t from-black/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              // THAY ĐỔI: Màu focus của input
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all duration-200"
            />
            <button
              onClick={handleSendMessage}
              // THAY ĐỔI: Màu nút gửi
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <AiOutlineSend size={20} />
            </button>
          </div>
          <p className="text-white/30 text-xs mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watch;

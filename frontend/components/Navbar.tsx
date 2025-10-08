import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import NavbarItems from "./NavbarItems"
import { BsChevronDown ,BsSearch,BsBell} from "react-icons/bs"
import AccountMenu from "./AccountMenu"
import { useRouter } from "next/router"
import Image from "next/image"

const Navbar = () => {
    const TOP_OFFSET = 66
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current)=>!current)
    })
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current)=>!current)
    })
    const router = useRouter()
    const [showBackground, setShowBackground] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY>=TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    },[])
    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4
                        md:px-16
                        py-6
                        flex
                        flex-row
                        items-center
                        transition
                        duration-500
                        ${showBackground?'bg-zinc-900 bg-opacity-90':''  }}`}>
                     <Image
      src="/images/logo.png"
      alt="Logo"
      width={180}   // chiều rộng mong muốn
      height={80}   // chiều cao mong muốn
      className="object-contain"
      priority      // load sớm (logo thường nên load sớm)
    />
                    <div className="flex-row
                                    ml-8
                                    gap-7
                                    hidden
                                    lg:flex">
                        <NavbarItems onclick={()=>router.push(`/`)} label='Home' />
                        <NavbarItems onclick={()=>router.push(`/series`)} label='Series' />
                        <NavbarItems label='Films' />
                        <NavbarItems label='New public' />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
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
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="Profile" />
            </div>
            <BsChevronDown
              className={`text-green-800 transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
        </div>
    </nav>
   )
}   

export default Navbar
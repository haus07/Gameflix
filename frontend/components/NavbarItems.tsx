import React from "react"

interface NavbarProbs {
    label: string
    onclick:void
}

const NavbarItems = ({ label,onclick}:NavbarProbs) => {
    return (
        <div onClick={onclick} className=" text-white cursor-pointer hover:text-gray-300 transition">
            { label}
        </div>
    )
}

export default NavbarItems
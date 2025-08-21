const Input = () => {
    return (
        <div>
            <input className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"type="text"/>
            <label 
                className="absolute text-md text-zinc-400 duration-150 transform-translate-y-3 scale-75 toop-4 z-10 origin-[0] left-6 peer-placeholder=show:scale=100
                peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor="email">Email</label>
      </div>
    )
}

export default Input
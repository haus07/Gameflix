import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";


const Watch = () => {
     const data = {
      "id":"1",
      "title":"Big Buck Bunny",
      "description":"Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
      "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "thumbnailUrl":"https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
      "genre":"Comedy",
      "duration":"10 minutes"
   
    }
    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed
                            w-full
                            p-4
                            z-10
                            flex
                            flex-row
                            items-center
                            gap-8
                            bg-black
                            bg-opacity-70">
                <AiOutlineArrowLeft className="text-white" size={40} />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching
                    </span>
                    { data.title}
                </p>    
            </nav>
            <video className="h-full w-full"
                autoPlay
                controls
                
                src={data.videoUrl}>
                
            </video>
        </div>
    )
}


export default Watch  
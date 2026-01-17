import React, { useContext, useEffect, useRef } from 'react'
import { Play, SkipBack, SkipForward, Volume2 , Pause  } from 'lucide-react'
import  { MusicContext } from '../context/MusicContext'

const MusicPlayer = () => {
  const {currentSong , formateTime , currentTime , duration, setDuration , setCurrentTime, nextTrack, prevTrack , play , pause , isPlaying} = useContext(MusicContext)
  const audioRef = useRef(null)


  useEffect(()=>{
      const audio = audioRef.current;
     if(isPlaying){
audio.play().catch((err)=> console.error(err));
     }else{
audio.pause();
     }
 },[isPlaying, , currentSong])

  useEffect(()=>{
    const audio = audioRef.current;
    if(!audio) return ;
    // audio.load(); 

    const handleLoadedMetadata = ()=>{
      setDuration(audio.duration)
      // console.log(audio.duration);
    }

    const handleTimeUpdate = ()=>{
setCurrentTime(audio.currentTime)
    }

    const handleEnded = ()=>{  
      nextTrack();
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded)
    return ()=>{
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
       audio.removeEventListener("canplay", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded)

    }

  },[setDuration, setCurrentTime, currentTime, nextTrack])


const handleTimeChange = (e) => {
  const audio = audioRef.current;
  if(!audio) return;
  const newTime = Number(e.target.value);
  audio.currentTime = newTime;
  setCurrentTime(newTime)
    // const time = Number(e.target.value);
    // audioRef.current.currentTime = time; // move audio
    // setCurrentTime(time); // update state
  }
 

  useEffect(()=>{
     const audio = audioRef.current;
    if(!audio) return ;
    audio.load(); 
    setCurrentTime(0);
    setDuration(0)

  },[setCurrentTime, setDuration, currentSong])

  return (
   
    <div className="flex flex-col items-center justify-center space-y-6">
      <audio ref={audioRef} preload='metadata' crossOrigin='anonymous' src={currentSong.file}/>
      {/* Animated Disk - Smaller on Mobile */}
      <div className="relative group">
        <div className="w-40 h-40 lg:w-64 lg:h-64 rounded-full border-4 border-purple-500/30 animate-[spin_8s_linear_infinite] p-1 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
          <img 
            src={currentSong.img} 
            className="w-full h-full object-cover rounded-full"
            alt="Now Playing"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-purple-500"></div>
      </div>

      <div className="text-center">
        <h2 className="text-xl lg:text-2xl font-bold truncate">{currentSong.name}</h2>
        <p className="text-purple-400 text-sm">{currentSong.artist}</p>
      </div>

      {/* Responsive Controls */}
      <div className="w-full max-w-xs space-y-4">

      
      <div className="flex items-center gap-3 w-full px-4">
  {/* Current Time */}
  <span className="text-sm text-gray-300 w-10 text-center">
    {formateTime(currentTime)}
  </span>

  {/* Progress Bar */}
  <input
    type="range"
    min="0"
    max={duration || 0}
    step="0.1"
    value={currentTime || 0}
    onChange={handleTimeChange }
    className="
      flex-1
      h-1
      rounded-full
      bg-purple-500
      accent-purple-600
      cursor-pointer
      shadow-[0_0_10px_rgba(168,85,247,0.6)]
    "
  />

  {/* Duration */}
  <span className="text-sm text-gray-300 w-10 text-center">
    {formateTime(duration)}
  </span>
</div>
      <div className="flex items-center justify-between px-4">
        {/* <audio ref={audioRef} preload='metadata' crossOrigin='anonymous'/> */}
          <SkipBack className="cursor-pointer hover:text-purple-400" size={24} onClick={prevTrack}/>
         <div
  className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center
             shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95
             transition-all cursor-pointer"
  onClick={() => (isPlaying ? pause() : play())}
>
  {isPlaying ? (
    <Pause fill="white" size={28} />
  ) : (
    <Play fill="white" size={28} className="ml-1" />
  )}
</div>
          <SkipForward className="cursor-pointer
           hover:text-purple-400" size={24} onClick={nextTrack} />
           
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

// - 🔴 React State ke liye STRICT rule: State sirf wahi data rakho jo JSX ko directly change kare

// A custom hook is a normal JavaScript function in React that starts with use and is used to reuse stateful logic (like useState, useEffect) across components.
// - A custom hook is a reusable function that encapsulates React hook logic, but does not share state, it only shares behavior.
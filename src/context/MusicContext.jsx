import React, { createContext } from 'react'
import { useContext, useEffect, useRef , useState} from 'react'
const songs = [
  {
    id: 1,
    name: "Peaceful Vibes",
    artist: "Local Artist",
    file: "/music/music_01.mpeg",
    img: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=500&auto=format&fit=crop",
    duration: "3:12"
  },
  {
    id: 2,
    name: "Night Drive",
    artist: "Unknown",
    file: "/music/music_02.mpeg",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=500&auto=format&fit=crop",
    duration: "4:05"
  },
  {
    id: 3,
    name: "Morning Energy",
    artist: "Indie Band",
    file: "/music/music_03.mpeg",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
    duration: "2:48"
  },
  {
    id: 4,
    name: "Rainy Mood",
    artist: "LoFi Beats",
    file: "/music/music_04.mpeg",
    img: "https://cdn.pixabay.com/photo/2016/11/29/12/39/recording-studio-1869560_1280.jpg",
    duration: "3:56"
  },
  {
    id: 5,
    name: "Late Night Coding",
    artist: "Chill Zone",
    file: "/music/music_05.mpeg",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
    duration: "4:22"
  },
  {
    id: 6,
    name: "Fresh Start",
    artist: "Morning Tunes",
    file: "/music/music_06.mpeg",
    img: "https://cdn.pixabay.com/photo/2018/05/13/16/19/saxophone-3397023_1280.jpg",
    duration: "3:30"
  }
];
export const MusicContext= createContext();

const MusicProvider = ({children}) => {
     const [allSongs, setAllSongs] = useState(songs);
        const [currentSong , setCurrentSong] = useState(songs[0])
        const [currentSongIndex , setCurrentSongIndex] = useState(0);
        const [currentTime , setCurrentTime] = useState(0);
        const [duration , setDuration] = useState(0);
        const [isPlaying , setIsPlaying] = useState(false);
          const [playlists , setPlaylists] = useState([])
    
    
        const handlePlaySong = (song , index) =>{
            setCurrentSong(song);
            setCurrentSongIndex(index);
            setIsPlaying(false)
        }
    
        const nextTrack = ()=>{
          // setIsPlaying(false);
              setCurrentSongIndex((prev)=> {
        const nextIndex =(prev+1) % allSongs.length;
        setCurrentSong(allSongs[nextIndex])
    
        return nextIndex;
    
              });
    
              setIsPlaying(false);
              
     }
    
        const prevTrack = ()=>{
          setCurrentSongIndex((prev)=> {
        const prevIndex = prev === 0 ? allSongs.length-1 : prev-1;
        setCurrentSong(allSongs[prevIndex])
    
        return prevIndex;
      });
      setIsPlaying(false);
    }
    
    
        const formateTime = (time)=>{
          if(isNaN(time) || time === undefined ) return '0:00';
    
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${minutes}:${seconds.toString().padStart(2, '0')}`
        }
    
        const play =()=> setIsPlaying(true);
        const pause = () => setIsPlaying(false);

        //! Create playlist
        const createPlaylist = (name)=>{
            const newPlaylist = {
                id:Date.now(),
                name,
                songs:[]
            };
            setPlaylists((prev)=> [...prev, newPlaylist])

        }

        const values = {
            allSongs, handlePlaySong, currentSongIndex, currentSong, formateTime , currentTime , duration , setDuration, setCurrentTime, nextTrack, prevTrack, play , pause , isPlaying , createPlaylist, playlists
        }
  return (
   <MusicContext.Provider value={values}>
    {children}
   </MusicContext.Provider>
  )
}

export default MusicProvider
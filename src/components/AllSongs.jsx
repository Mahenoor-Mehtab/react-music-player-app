import React, { useContext } from 'react'
import { PlayCircle, MoreVertical, Volume2 } from 'lucide-react'
import { MusicContext } from '../context/MusicContext'

const AllSongs = () => {
  const { allSongs, handlePlaySong, currentSongIndex, isPlaying } = useContext(MusicContext)

  return (
    <div className="animate-in fade-in slide-in-from-right-5 duration-500">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3 text-white">
        All Songs 
        <span className="text-sm bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full border border-purple-700/50">
          {allSongs.length}
        </span>
      </h2>

      <div className="grid gap-3">
        {allSongs.map((song, index) => {
          const isActive = currentSongIndex === index;
          
          return (
            <div
              key={song.id || index}
              onClick={() => handlePlaySong(song, index)}
              className={`group flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer border
                ${isActive
                  ? "bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/50" 
                  : "bg-white/5 border-transparent hover:border-purple-500/30 hover:bg-purple-900/10"
                }
              `}
            >
              {/* Image / Icon Container */}
              <div className="relative w-12 h-12 flex-shrink-0 bg-purple-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                {isActive && isPlaying ? (
                  // Animated Equalizer (shows only when active and playing)
                  <div className="flex items-end gap-[2px] h-4">
                    <span className="w-1 bg-purple-400 animate-[bounce_1s_infinite_0.1s] h-full" />
                    <span className="w-1 bg-purple-400 animate-[bounce_1s_infinite_0.3s] h-3" />
                    <span className="w-1 bg-purple-400 animate-[bounce_1s_infinite_0.5s] h-4" />
                  </div>
                ) : (
                  <PlayCircle className={`${isActive ? 'text-purple-400' : 'text-gray-400'} group-hover:scale-110 transition-transform`} />
                )}
              </div>
              
              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold truncate ${isActive ? 'text-purple-300' : 'text-white'}`}>
                  {song.name}
                </h3>
                <p className="text-xs text-gray-400 truncate">{song.artist || "Unknown Artist"}</p>
              </div>

              {/* Status Icon or Actions */}
              <div className="flex items-center gap-2">
                {isActive && <Volume2 size={16} className="text-purple-400 animate-pulse" />}
                <button 
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()} // Prevents triggering handlePlaySong
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AllSongs;
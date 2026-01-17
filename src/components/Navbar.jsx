import React from 'react'
import { Link, useLocation } from 'react-router'
import { Music, ListMusic, Disc } from 'lucide-react'

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-2 transition-all active:scale-95
     ${location.pathname === path
       ? 'text-purple-400  border-purple-500'
       : 'hover:text-purple-400'
     }`;

  return (
    <nav className="flex items-center justify-between px-4 lg:px-8 py-4 bg-black border-b border-purple-900/40 sticky top-0 z-50">
      
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-purple-600 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)]">
          <Link to="/">
            <Music size={20} className="text-white" />
          </Link>
        </div>
        <span className="font-bold text-lg tracking-tight hidden sm:block">
          MUSIC PLAYER
        </span>
      </div>

      <div className="flex gap-4 sm:gap-8 text-sm font-medium">
        <Link to="/" className={linkClasses("/")}>
          <Disc size={18} />
          <span>Songs</span>
        </Link>

        <Link to="/playlists" className={linkClasses("/playlists")}>
          <ListMusic size={18} />
          <span>Playlists</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import MusicPlayer from './components/MusicPlayer'
import { Routes, Route } from 'react-router'
import AllSongs from './components/AllSongs'
import Playlists from './components/Playlists'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar />
      
      {/* Main Container: Stacked on mobile, side-by-side on desktop */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Music Player: Top on mobile, Left Sidebar on Desktop */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-purple-900/20 bg-gradient-to-b from-black to-[#150a1d] p-4 lg:p-8">
          <MusicPlayer />
        </div>

        {/* Content Area: Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <Routes>
            <Route path='/' element={<AllSongs />} />
            <Route path='/playlists' element={<Playlists />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
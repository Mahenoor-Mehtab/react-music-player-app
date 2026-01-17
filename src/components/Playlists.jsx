import React, { useContext, useState } from 'react'
import { Plus, ListMusic, Trash } from 'lucide-react'
import { MusicContext } from '../context/MusicContext';

const Playlists = () => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false)

  // Added deletePlaylist to match your handleDelete call
  const { createPlaylist, playlists, deletePlaylist, allSongs } = useContext(MusicContext);

  const filteredSong = allSongs.filter((song) => {
    const matches = song.name.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some((playlistSong) => playlistSong.id === song.id)

    return matches && !isAlreadyInPlaylist;
  })

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  }

  const handleAddSong = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 p-4 max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-white">
          Playlists
        </h2>

        <div className="flex w-full sm:w-auto gap-2">
          <input
            type="text"
            placeholder="Playlist name..."
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="flex-1 sm:w-64 px-4 py-2 rounded-lg bg-gray-800 text-white 
                       placeholder-gray-400 border border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
          />
          <button
            onClick={handleCreatePlaylist}
            className="shrink-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                       transition rounded-lg flex items-center gap-2 
                       text-white text-sm font-medium active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden xs:inline">Create</span>
          </button>
        </div>
      </div>

      {/* Grid Layout Fix: 1 column on mobile, 2 on tablet, 3 on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {playlists.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center py-10">No playlists created yet</p>
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group relative w-full p-4 rounded-xl 
                         bg-gradient-to-br from-gray-900 to-black 
                         border border-white/10 hover:border-purple-500/50 
                         transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                    <ListMusic size={20} className="text-purple-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate text-sm sm:text-base">
                      {playlist.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {playlist.songs?.length || 0} songs
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlaylist(playlist.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 
                             rounded-full transition-colors shrink-0"
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Inline Search for Playlist */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add songs..."
                  className="w-full px-3 py-1.5 rounded-md bg-gray-800/50 
                             text-white text-xs border border-gray-700 
                             focus:ring-1 focus:ring-purple-500 outline-none" value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}

                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedPlaylist(playlist);
                    setShowDropdown(e.target.value.length > 0)
                  }}

                  onFocus={(e) => {
                    setSelectedPlaylist(playlist);
                    setShowDropdown(e.target.value.length > 0)
                  }}
                />

                {
                  selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div
                      className="mt-2 w-full max-h-56 overflow-y-auto 
                 rounded-lg border border-purple-900/40 
                 bg-gray-900 shadow-lg"
                    >
                      {filteredSong.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-400">
                          No songs found
                        </div>
                      ) : (
                        filteredSong.map((song, key) => (
                          <div
                            key={key}
                            onClick={() => handleAddSong(song)}
                            className="flex flex-col sm:flex-row sm:items-center 
                       gap-1 sm:gap-3 
                       px-4 py-2 
                       cursor-pointer 
                       hover:bg-purple-900/30 
                       transition"
                          >
                            {/* Song Name */}
                            <span className="text-sm font-medium text-white truncate">
                              {song.name}
                            </span>

                            {/* Artist */}
                            <span className="text-xs text-gray-400 truncate">
                              {song.artist}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )
                }

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Playlists;
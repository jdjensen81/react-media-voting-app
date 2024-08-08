import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // We'll create this file for our CSS

// Types
type MediaType = 'audio' | 'video';

interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl: string;
  tags: string[];
  votes: number;
}

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

// Mock data (replace with actual API calls in a real application)
const mockMediaItems: MediaItem[] = [
  { id: '1', type: 'audio', url: 'audio1.mp3', thumbnailUrl: 'https://imgur.com/4hk9L2f.png', tags: ['music', 'rock'], votes: 0 },
  { id: '2', type: 'video', url: 'video1.mp4', thumbnailUrl: 'https://imgur.com/znQRtsC.png', tags: ['movie', 'action'], votes: 0 },
];

const mockUsers: User[] = [
  { id: '1', username: 'testadmin', isAdmin: true },
  { id: '2', username: 'testvoter', isAdmin: false },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userIndex, setUserIndex] = useState<number>(0);

  useEffect(() => {
    // Simulating user authentication
    setUser(mockUsers[userIndex]);
  }, [userIndex]);

  const toggleUser = () => {
    setUserIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <Router>
      <div className="app">
        <h1>Media Voting App</h1>
        <nav>
          <ul>
            {user?.isAdmin && <li><Link to="/admin">Admin</Link></li>}
            <li><Link to="/vote">Vote</Link></li>
          </ul>
        </nav>
        <button onClick={toggleUser}>
          {user?.isAdmin ? 'Switch to Voter' : 'Switch to Admin'}
        </button>
        <main>
          <Routes>
            <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <p>Access denied</p>} />
            <Route path="/vote" element={<VotingPanel />} />
            <Route path="/" element={user?.isAdmin ? <AdminPanel /> : <VotingPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const AdminPanel: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [newTag, setNewTag] = useState<string>('');

  const addTag = (itemId: string) => {
    setMediaItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, tags: [...item.tags, newTag] } : item
      )
    );
    setNewTag('');
  };

  return (
    <div className="container">
      <h2>Admin</h2>
      <div className="media-grid">
        {mediaItems.map(item => (
          <div key={item.id} className="media-card">
            <h3>{item.type === 'audio' ? 'Audio' : 'Video'}</h3>
            <img src={item.thumbnailUrl} alt={`Thumbnail for ${item.type}`} className="thumbnail" />
            <p>{item.url}</p>
            <div className="tags">
              {item.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="tag-input">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="New tag"
              />
              <button onClick={() => addTag(item.id)}>Add Tag</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VotingPanel: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);

  const vote = (itemId: string) => {
    setMediaItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  return (
    <div className="container">
      <h2>Vote</h2>
      <div className="media-grid">
        {mediaItems.map(item => (
          <div key={item.id} className="media-card">
            <h3>{item.type === 'audio' ? 'Audio' : 'Video'}</h3>
            <img src={item.thumbnailUrl} alt={`Thumbnail for ${item.type}`} className="thumbnail" />
            <p>{item.url}</p>
            <div className="tags">
              {item.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <p>Votes: {item.votes}</p>
            <button onClick={() => vote(item.id)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Types
type MediaType = 'audio' | 'video';

interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
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
  { id: '1', type: 'audio', url: 'audio1.mp3', tags: ['music', 'rock'], votes: 0 },
  { id: '2', type: 'video', url: 'video1.mp4', tags: ['movie', 'action'], votes: 0 },
];

const mockUser: User = { id: '1', username: 'testuser', isAdmin: true };

// Components
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
    <div>
      <h2>Admin Panel</h2>
      {mediaItems.map(item => (
        <div key={item.id}>
          <p>{item.type}: {item.url}</p>
          <p>Tags: {item.tags.join(', ')}</p>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="New tag"
          />
          <button onClick={() => addTag(item.id)}>Add Tag</button>
        </div>
      ))}
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
    <div>
      <h2>Voting Panel</h2>
      {mediaItems.map(item => (
        <div key={item.id}>
          <p>{item.type}: {item.url}</p>
          <p>Tags: {item.tags.join(', ')}</p>
          <p>Votes: {item.votes}</p>
          <button onClick={() => vote(item.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return <h1>Welcome to Media Voting App</h1>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating user authentication
    setUser(mockUser);
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {user?.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
            <li><Link to="/vote">Voting Panel</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <p>Access denied</p>} />
          <Route path="/vote" element={<VotingPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  { id: '1', type: 'audio', url: 'audio1.mp3', thumbnailUrl: '/api/placeholder/300/200', tags: ['music', 'rock'], votes: 0 },
  { id: '2', type: 'video', url: 'video1.mp4', thumbnailUrl: '/api/placeholder/300/200', tags: ['movie', 'action'], votes: 0 },
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.type === 'audio' ? 'Audio' : 'Video'}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={item.thumbnailUrl} alt={`Thumbnail for ${item.type}`} className="w-full h-40 object-cover mb-2" />
              <p className="mb-2">{item.url}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="New tag"
                />
                <Button onClick={() => addTag(item.id)}>Add Tag</Button>
              </div>
            </CardContent>
          </Card>
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Voting Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.type === 'audio' ? 'Audio' : 'Video'}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={item.thumbnailUrl} alt={`Thumbnail for ${item.type}`} className="w-full h-40 object-cover mb-2" />
              <p className="mb-2">{item.url}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <p className="font-bold">Votes: {item.votes}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => vote(item.id)}>Vote</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Media Voting App</h1>
      <p className="text-lg">Explore and vote for your favorite audio and video content!</p>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating user authentication
    setUser(mockUser);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-4 py-4">
              <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
              {user?.isAdmin && <li><Link to="/admin" className="text-blue-600 hover:text-blue-800">Admin Panel</Link></li>}
              <li><Link to="/vote" className="text-blue-600 hover:text-blue-800">Voting Panel</Link></li>
            </ul>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <p>Access denied</p>} />
            <Route path="/vote" element={<VotingPanel />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
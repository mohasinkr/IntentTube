import React, { useEffect, useState } from 'react';
// import ChannelCard from './ChannelCard';
// import AddChannelPopup from './AddChannelPopup';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

const ChannelsList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/v1/channels/curated`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch channels');
        const data = await res.json();
        setChannels(data.selectedChannels || []);
      } catch (err: any) {
        setError(err.message || 'Error fetching channels');
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Channels</h2>
      {/* <AddChannelPopup /> */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* {channels.map((channel) => (
          <ChannelCard key={channel.channelId} channel={channel} />
        ))} */}
        {channels.length === 0 && !loading && <div>No channels added yet.</div>}
      </div>
    </div>
  );
};

export default ChannelsList; 
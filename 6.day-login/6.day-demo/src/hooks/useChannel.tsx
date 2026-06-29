import { useEffect, useState } from 'react';
import { request } from '../utils';

export interface Channel {
  id: number;
  name: string;
}

export interface ChannelResponse {
  data: Channel[]
}


export const useChannel = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await request.get<ChannelResponse>('/article/type');
        setChannels(res.data.data);
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      }
    };
    fetchChannels();
  }, []);

  return { channels };
};

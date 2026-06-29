import { useEffect, useState } from 'react';
import { request } from '../utils';
export const useChannel = () => {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const res = await request.get('/article/type');
                setChannels(res.data.data);
            }
            catch (error) {
                console.error('Failed to fetch channels:', error);
            }
        };
        fetchChannels();
    }, []);
    return { channels };
};

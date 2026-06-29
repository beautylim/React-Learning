export interface Channel {
    id: number;
    name: string;
}
export interface ChannelResponse {
    data: Channel[];
}
export declare const useChannel: () => {
    channels: Channel[];
};

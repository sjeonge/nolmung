import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';

let socket: Socket | undefined;
export const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io('http://nolmung.kr', {
      transports: ['websocket'],
    });
    socket.on('connect', () => console.log('socketId:', socket?.id));
  }
  return [socket, disconnect];
};

let chatSocket: Socket | undefined;
export const useChatSocket = (): [Socket | undefined, () => void] => {
  const chatDisconnect = useCallback(() => {
    if (chatSocket) {
      chatSocket.disconnect();
      chatSocket = undefined;
    }
  }, []);
  if (!chatSocket) {
    chatSocket = io('http://nolmung.kr/chat', {
      transports: ['websocket'],
    });
    chatSocket.on('connect', () => console.log('chat...socket..connected'));
  }
  return [chatSocket, chatDisconnect];
};

let locationSocket: Socket | undefined;
export const useLocationSocket = (): [Socket | undefined, () => void] => {
  const locationDisconnect = useCallback(() => {
    if (locationSocket) {
      locationSocket.disconnect();
      locationSocket = undefined;
    }
  }, []);
  if (!locationSocket) {
    locationSocket = io('http://nolmung.kr/location', {
      transports: ['websocket'],
    });
    locationSocket.on('connect', () =>
      console.log('location...socket..connected'),
    );
  }
  return [locationSocket, locationDisconnect];
};

import { useContext } from 'react';

import { MessagesContext } from '../contexts/MessagesContext';

export function useMessages() {
  return useContext(MessagesContext);
}

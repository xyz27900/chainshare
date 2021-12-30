import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { Text } from '@/components/Text';
import { classname } from '@/utils/string';

type Message = {
  id: string;
  body: string;
  type: 'success' | 'error';
}

type Notifications = {
  messages: Message[];
  notify: (message: string, type?: 'success' | 'error') => void;
}

const initialState: Notifications = {
  messages: [],
  notify: () => console.warn('Notify function is empty'),
};

const NotificationsContext = React.createContext<Notifications>(initialState);

type NotificationProviderProps = {
  limit?: number;
  timeout?: number;
}

export const NotificationsProvider: React.FC<NotificationProviderProps> = ({
  limit = 3,
  timeout = 2000,
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef(messages);

  const notify = (text: string, type: 'success' | 'error' = 'success'): void => {
    const message: Message = {
      id: v4(),
      body: text,
      type,
    };

    window.setTimeout(() => {
      setMessages(messagesRef.current.filter(item => item.id !== message.id));
    }, timeout);

    setMessages([...messages.slice(0, limit - 1), message]);
  };

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  return <NotificationsContext.Provider
    value={{
      messages,
      notify,
    }}
  >
    <div className="fixed bottom-0 flex flex-col flex-col-reverse p-2 left-1/2 -translate-x-1/2">
      {
        messages.map(message => {
          return <div
            key={`message-${message.id}`}
            className={
              classname(
                'px-4',
                'py-2',
                'rounded-lg',
                'mb-2',
                'first:mb-0',
                message.type === 'error' ? 'bg-red' : 'bg-green',
              )
            }
          >
            <Text color={'white'}>{ message.body }</Text>
          </div>;
        })
      }
    </div>
    { children }
  </NotificationsContext.Provider>;
};

export const useNotifications = (): Notifications => {
  return useContext(NotificationsContext);
};

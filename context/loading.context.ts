import { Dispatch, SetStateAction, createContext } from 'react';

type ChatLoadingContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ChatLoadingContext = createContext<ChatLoadingContextProps>({
  isLoading: false,
} as ChatLoadingContextProps);

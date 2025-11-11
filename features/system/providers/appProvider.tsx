import { PropsWithChildren, ReactElement, createContext, useCallback, useContext, useState } from 'react';

export interface AppContextType {
  setLoading: (_show: boolean) => void;
}

const initContextState: AppContextType = {
  setLoading: () => false,
};

const AppProviderContext = createContext<AppContextType>(initContextState);
const AppProvider = (props: PropsWithChildren): ReactElement => {
  const { children } = props;
  const [showLoading, setShowLoading] = useState(false);
  
  const handleSetLoading = (isLoading = false) => setShowLoading(isLoading);

  const getValue = useCallback(() => {
    return {
      isLoading: showLoading,
      setLoading: handleSetLoading,
    };
  }, [showLoading]);

  return <AppProviderContext.Provider value={getValue()}>{children}</AppProviderContext.Provider>;
};
export default AppProvider;

export const useAppCtx = () => useContext(AppProviderContext);

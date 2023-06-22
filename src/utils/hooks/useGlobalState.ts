import { useContext } from 'react';
import { RootStoreContext } from '../../state';

export const useGlobalState = () => {
  const store = useContext(RootStoreContext);
  if(store === null){
    throw new Error('Store cannot be null, please add a context provider');
  }

  return store;
}

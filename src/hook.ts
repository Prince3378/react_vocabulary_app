import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

// eslint-disable-next-line max-len
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

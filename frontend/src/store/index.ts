import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { catalogueSlice } from './CatalogueStore';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineSlices(catalogueSlice);

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

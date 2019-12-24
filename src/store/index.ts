import { combineReducers } from 'redux';

import { tabsReducer } from './tab-manager';

export const rootReducer = combineReducers({
  tabManager: tabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

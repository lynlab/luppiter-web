import {Tab} from '../models/tab';

/// States
export interface TabsState {
  tabs: Tab[];
}

const initialState: TabsState = {
  tabs: [],
};

// Action Types
export const ADD_TAB = 'tabs/ADD_TAB';
export const REMOVE_TAB = 'tabs/REMOVE_TAB';

interface AddTabAction {
  type: typeof ADD_TAB;
  tab: Tab;
}

interface RemoveTabAction {
  type: typeof REMOVE_TAB;
  tab: Tab;
}

export type TabsActionTypes = AddTabAction | RemoveTabAction;

/// Actions
export function addTab(newTab: Tab): AddTabAction {
  return { type: ADD_TAB, tab: newTab };
}

export function removeTab(tabToRemove: Tab): RemoveTabAction {
  return { type: REMOVE_TAB, tab: tabToRemove };
}

/// Reducer
export function tabsReducer(state: TabsState = initialState, action: TabsActionTypes): TabsState {
  switch (action.type) {
    case ADD_TAB:
      return (state.tabs.findIndex((tab) => tab.tabType === action.tab.tabType) !== -1)
        ? state : { tabs: [...state.tabs, action.tab] };
    case REMOVE_TAB:
      return { tabs: state.tabs.filter((tab) => tab.tabType !== action.tab.tabType) };
    default:
      return state;
  }
}

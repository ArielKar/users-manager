export const CLOSE_DRAWER = '[ui] Close Drawer';
export const OPEN_DRAWER = '[ui] Open Drawer';

export const closeDrawerAction = () => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const openDrawerAction = () => {
  return {
    type: OPEN_DRAWER,
  };
};

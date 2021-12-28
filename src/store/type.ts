export type reducerType = (state: stateType, action: actionType) => stateType;

export type actionType = {
  type: string;
  menuIdx?: number;
  text?: string;
};

export type stateType = { menus: string[] };

export type listenerType = () => void;

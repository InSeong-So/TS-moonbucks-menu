const createActionType = (action: string) => {
  const ACTION = action.toUpperCase();
  return [ACTION, `${ACTION}_SUCCESS`, `${ACTION}_FAILURE`];
};

export default createActionType;

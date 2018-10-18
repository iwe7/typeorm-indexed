import { Middleware } from 'redux';

export const indexedDbMiddleware: Middleware = ({
  dispatch,
  getState,
}) => next => action => {
  console.log(action);
  return next(action);
};

import { createBrowserHistory, createHashHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

export const hash = createHashHistory();

interface HashRouterProps {
  hash: typeof hash;
}

export const HashRouter: React.FC<HashRouterProps> = ({ hash, children }) => {
  const [state, setState] = React.useState({
    action: hash.action,
    location: hash.location,
  });

  React.useEffect(() => {
    hash.listen(setState);
  }, [hash.location]);

  return React.createElement(Router, Object.assign({ children, navigator: hash }, state));
};

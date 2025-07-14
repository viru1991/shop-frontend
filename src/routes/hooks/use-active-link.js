import { matchPath, useLocation } from 'react-router-dom';

// // ----------------------------------------------------------------------

// export function useActiveLink(path, deep = true) {
//   const { pathname } = useLocation();

//   const normalActive = path ? !!matchPath({ path, end: true }, pathname) : false;

//   const deepActive = path ? !!matchPath({ path, end: false }, pathname) : false;

//   return deep ? deepActive : normalActive;
// }

export function useActiveLink(path, deep = true) {
  const { pathname } = useLocation();

  if (!path) return false;

  // If path is dynamic details, skip match if on /new
  if (path.includes(':id') && pathname.endsWith('/new')) return false;

  const normalActive = !!matchPath({ path, end: true }, pathname);
  const deepActive = !!matchPath({ path, end: false }, pathname);

  return deep ? deepActive : normalActive;
}

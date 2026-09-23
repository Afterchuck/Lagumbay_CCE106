import { useSyncExternalStore } from 'react';

const mediaQuery = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(mediaQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(mediaQuery).matches ? 'dark' : 'light';
}

function getServerSnapshot() {
  return 'light';
}

/** Use a stable light snapshot during static rendering, then follow the browser preference. */
export function useColorScheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

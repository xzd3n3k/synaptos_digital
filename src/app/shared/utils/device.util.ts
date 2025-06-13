export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv';

function match(query: string): boolean {
  return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

export function isMobile(): boolean {
  return match('(max-width: 480px)');
}

export function isTablet(): boolean {
  return match('(min-width: 481px) and (max-width: 768px)');
}

export function isLaptop(): boolean {
  return match('(min-width: 769px) and (max-width: 1024px)');
}

export function isDesktop(): boolean {
  return match('(min-width: 1025px) and (max-width: 1200px)');
}

export function isTV(): boolean {
  return match('(min-width: 1201px)');
}

export function isSmallDevice(): boolean {
  return match('(max-width: 1024px)');
}

export function getDeviceType(): DeviceType {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  if (isLaptop()) return 'laptop';
  if (isDesktop()) return 'desktop';
  return 'tv';
}

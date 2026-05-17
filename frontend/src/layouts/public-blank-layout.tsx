import type React from 'react';

export function PublicBlankLayout({ children }: { children: React.ReactNode }) {
  return <main className='mx-auto max-w-160 overflow-hidden pb-24.5 min-h-screen'>{children}</main>;
}

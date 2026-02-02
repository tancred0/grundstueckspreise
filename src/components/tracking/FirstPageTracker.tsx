'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { storage } from '@/lib/storage'; // Adjust the import path as needed

export function FirstPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Always set firstPageVisited if it doesn't exist
    if (!storage.get('firstPageVisited')) {
      storage.set('firstPageVisited', pathname);
    }

    // Only process URL parameters for '/boris' paths
    if (pathname.startsWith('/boris') || pathname.startsWith('/bodenrichtwert')) {
      const urlParts = pathname.split('/').filter(Boolean);
      
      // Only proceed if we have more than just '/boris'
      if (urlParts.length > 1) {
        const state = urlParts[1] ?? '';
        const isSpecialState = ['berlin', 'hamburg'].includes(state);

        // Set stateUrl if not already set
        if (!storage.get('stateUrl')) {
          storage.set('stateUrl', state);
        }

        // Set cityUrl if not already set
        if (!storage.get('cityUrl')) {
          storage.set('cityUrl', isSpecialState ? state : (urlParts[2] ?? ''));
        }

        // Set districtUrl if not already set
        if (!storage.get('districtUrl')) {
          storage.set('districtUrl', isSpecialState ? (urlParts[2] ?? '') : (urlParts[3] ?? ''));
        }
      }
    }
  }, [pathname]);

  return null;
}
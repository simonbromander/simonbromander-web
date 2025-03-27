import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics, { trackEvent, identifyUser } from '@/lib/analytics';

function useAnalytics() {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    analytics.page({
      url: location.pathname,
      path: location.pathname,
      search: location.search,
      hash: location.hash,
      title: document.title
    });
  }, [location]);

  return {
    trackEvent,
    identifyUser
  };
}

export default useAnalytics; 
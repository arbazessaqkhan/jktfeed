import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface VisitorData {
  sessionId: string;
  country?: string;
  city?: string;
  device: string;
  browser: string;
  os: string;
  visitedPages: string[];
  timeOnSite: number;
  isReturning: boolean;
}

export default function VisitorTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView();
  }, [location]);

  useEffect(() => {
    // Initialize visitor tracking on component mount
    initializeTracking();
    
    // Track time on site
    const startTime = Date.now();
    
    const trackTimeOnSite = () => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      updateVisitorTimeOnSite(timeOnSite);
    };
    
    // Update time every 30 seconds
    const timeInterval = setInterval(trackTimeOnSite, 30000);
    
    // Update time on page unload
    window.addEventListener('beforeunload', trackTimeOnSite);
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('beforeunload', trackTimeOnSite);
      trackTimeOnSite(); // Final update
    };
  }, []);

  const getSessionId = () => {
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
  };

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    
    // Detect device type
    let device = 'Desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      device = /iPad/i.test(userAgent) ? 'Tablet' : 'Mobile';
    }
    
    // Detect browser
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    return { device, browser, os };
  };

  const getLocationInfo = async () => {
    try {
      // Try to get location info from a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown'
      };
    } catch (error) {
      return {
        country: 'Unknown',
        city: 'Unknown'
      };
    }
  };

  const initializeTracking = async () => {
    const sessionId = getSessionId();
    const { device, browser, os } = getDeviceInfo();
    const locationInfo = await getLocationInfo();
    
    // Check if returning visitor
    const lastVisit = localStorage.getItem('last_visit_timestamp');
    const isReturning = !!lastVisit;
    
    // Update last visit
    localStorage.setItem('last_visit_timestamp', Date.now().toString());
    
    const visitorData: VisitorData = {
      sessionId,
      country: locationInfo.country,
      city: locationInfo.city,
      device,
      browser,
      os,
      visitedPages: [location],
      timeOnSite: 0,
      isReturning
    };

    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData)
      });
    } catch (error) {
      console.error('Failed to track visitor:', error);
    }
  };

  const trackPageView = async () => {
    const sessionId = getSessionId();
    
    try {
      await fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: null, // Will be handled server-side based on sessionId
          page: location,
          title: document.title,
          timeSpent: 0
        })
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  const updateVisitorTimeOnSite = async (timeOnSite: number) => {
    const sessionId = getSessionId();
    
    try {
      // This would need a PUT endpoint to update visitor time
      // For now, we'll track it locally
      localStorage.setItem('session_time_on_site', timeOnSite.toString());
    } catch (error) {
      console.error('Failed to update time on site:', error);
    }
  };

  return null; // This component doesn't render anything
}
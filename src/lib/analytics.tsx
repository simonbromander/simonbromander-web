import Analytics from "analytics";
import simpleAnalyticsPlugin from "@analytics/simple-analytics";

const analytics = Analytics({
  app: "simon-bromander-web",
  plugins: [
    simpleAnalyticsPlugin(),
  ],
});

// Utility function to track custom events
export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  analytics.track(eventName, eventData);
}

// Utility function to identify users (if needed)
export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  analytics.identify(userId, traits);
}

export default analytics;

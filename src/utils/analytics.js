import ReactGA from "react-ga4";

let isInitialized = false;

/**
 * Initializes Google Analytics 4.
 */
export const initGA = () => {
  if (isInitialized) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-TNTV98FR0S";

  if (measurementId) {
    ReactGA.initialize(measurementId);
    isInitialized = true;
    console.log("Google Analytics 4 initialized with ID:", measurementId);
  } else {
    console.warn("Google Analytics 4 Measurement ID is missing.");
  }
};

/**
 * Logs a page view event.
 * @param {string} path - The path of the page viewed.
 */
export const logPageView = (path) => {
  if (!isInitialized) {
    initGA();
  }
  ReactGA.send({ hitType: "pageview", page: path });
};

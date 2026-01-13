const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  error: (message: string, error?: any) => {
    if (isDev) {
      console.error(`[DEV ERROR] ${message}`, error);
    } else {
    }
  },
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
};

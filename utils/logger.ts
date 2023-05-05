const print =
  (type: string) =>
  (message: string, ...args: any[]) => {
    console.log(`[security-guru][${type.toUpperCase()}] ${message}`, ...args);
  };

export default {
  info: print("info"),
  warn: print("warn"),
  error: print("error"),
  log: print("info"),
};

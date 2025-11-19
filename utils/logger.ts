const print =
  (type: string) =>
  (message: unknown, ...args: unknown[]) => {
    const isString = typeof message === "string";
    const toPrint = isString ? message : JSON.stringify(message, null, 2);
    console.log(`[security-guru][${type.toUpperCase()}] ${toPrint}`, ...args);
  };

export default {
  info: print("info"),
  warn: print("warn"),
  error: print("error"),
  log: print("info"),
};

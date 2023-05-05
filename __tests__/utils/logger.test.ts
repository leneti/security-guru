import logger from "@utils/logger";

const expectedLogs = [
  {
    type: "info",
    args: ["test"],
    expected: ["[security-guru][INFO] test"],
  },
  {
    type: "error",
    args: ["test"],
    expected: ["[security-guru][ERROR] test"],
  },
  {
    type: "warn",
    args: ["test"],
    expected: ["[security-guru][WARN] test"],
  },
  {
    type: "log",
    args: ["test with args", "arg1"],
    expected: ["[security-guru][INFO] test with args", "arg1"],
  },
];

describe("logger", () => {
  it.each(expectedLogs)("prints $type messages", ({ type, args, expected }) => {
    const log = jest
      .spyOn(console, "log")
      .mockImplementation((...params: any[]) => params);

    let logFn;

    switch (type) {
      case "info": {
        logFn = logger.info;
        break;
      }
      case "warn": {
        logFn = logger.warn;
        break;
      }
      case "error": {
        logFn = logger.error;
        break;
      }
      default:
        logFn = logger.log;
    }

    logFn(args[0], ...args.slice(1));
    expect(log).toHaveBeenCalledWith(...expected);
  });
});

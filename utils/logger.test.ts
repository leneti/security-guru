/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- low importance file */
const logger = jest.requireActual("@site/utils/logger").default;

const expectedLogs = [
  {
    type: "info",
    args: ["test"],
    expected: ["[security-guru][INFO] test"],
  },
  {
    type: "error",
    args: [{ message: "test" }],
    expected: [
      `[security-guru][ERROR] ${JSON.stringify({ message: "test" }, null, 2)}`,
    ],
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
      .mockImplementation((...params: unknown[]) => params);

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
      default: {
        logFn = logger.log;
      }
    }

    logFn(args[0], ...args.slice(1));
    expect(log).toHaveBeenCalledWith(...expected);
  });
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- low importance file */

export default {
  info: jest.fn().mockName("logger.info"),
  warn: jest.fn().mockName("logger.warn"),
  error: jest.fn().mockName("logger.error"),
  log: jest.fn().mockName("logger.log"),
};

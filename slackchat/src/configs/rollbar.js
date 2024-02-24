const rollbarConfig = {
  accessToken: process.env.SLACKCHAT_ROLLBAR_SECRET,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
};

export default rollbarConfig;

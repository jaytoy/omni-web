export const getHost = () => {
  let host = "http://localhost:3000";
  if (process.env.NODE_ENV === "production") {
    host = "https://demo.blitzomni.com";
  }
  return host;
};

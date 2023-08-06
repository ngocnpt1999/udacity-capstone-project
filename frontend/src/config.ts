// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = "sy62dv5vfb";
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: "dev-nf83vbp3lsqqnsjn.us.auth0.com", // Auth0 domain
  clientId: "HqkkTE3Nmk76AlptUUCuSxPNsISQ4OC7", // Auth0 client id
  callbackUrl: "http://localhost:3000/callback",
};

export const bucketName = "ngocnpt1999-serverless-pokemon-note-images-dev";

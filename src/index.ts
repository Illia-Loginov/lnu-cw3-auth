import app from './app';
import awsServerlessExpress from 'aws-serverless-express';
import { serverConfig } from './config';

if (serverConfig.env === 'production') {
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (
    event: AWSLambda.APIGatewayProxyEvent,
    context: AWSLambda.Context
  ) => {
    awsServerlessExpress.proxy(server, event, context);
  };
} else {
  app.listen(serverConfig.port, () => {
    console.log(`Server started on port ${serverConfig.port}`);
  });
}

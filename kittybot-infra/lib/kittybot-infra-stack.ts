import { Stack, StackProps, } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export const handler = async (event: any) => {
  const response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "https://kittybot.vercel.app",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

dotenv.config()

export class KittybotInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_11],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset( "../OpenAI/",{
        exclude: ['venv', 'OpenAI.env', 'README.md', 'AWSCLIV2.pkg', '.gitignore', '__pycache__', '.DS_Store', '.git'],
      }),
      handler: "kittybot_api.handler",
      layers: [layer],
      environment: {
        "OPENAI_API_KEY": process.env.OPENAI_API_KEY ?? "",
      },
    });

    const kittybotApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "KittyBott API",
    });

    kittybotApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
    });
  }
}

import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as path from 'path';

export class TestAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



    // cdk code for my web spa
    new Bucket(this, 'Test Bucket', {});

    // const deployment = new BucketDeployment(this, 'DeployWebsite', {
    //     sources: [Source.asset(path.join(__dirname, 'my-website'))],
    //     destinationBucket: websiteBucket,
    //   });
      
    //   new ConstructThatReadsFromTheBucket(this, 'Consumer', {
    //     // Use 'deployment.deployedBucket' instead of 'websiteBucket' here
    //     bucket: deployment.deployedBucket,
    //   });
    
  }
}
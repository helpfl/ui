#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestAppStack } from './app-stack';

const app = new cdk.App();
new TestAppStack(app, 'TestAppStack', {
  env: {
    region: process.env['AWS_DEFAULT_REGION'],
    account: process.env['AWS_ACCOUNT']
  }
});

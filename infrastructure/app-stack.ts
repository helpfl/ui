import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CachePolicy, Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class HelpflUiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'HelpflSPABucket', {
        publicReadAccess: true,
        removalPolicy: RemovalPolicy.DESTROY,
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html'
    });

    new BucketDeployment(this, 'HelpflSPADeployment', {
        sources: [
            Source.asset('./dist')
        ],
        destinationBucket: bucket
    });

    const domainName = 'helpfl.click';

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', { domainName });

    const certificate = new DnsValidatedCertificate(this, 'HelpflCert', {
        domainName,
        hostedZone,
        region: 'us-east-1'
    });

    const distribution = new Distribution(this, 'HelpflDistribution', {
        defaultRootObject: 'index.html',
        domainNames: [domainName],
        certificate: certificate,
        defaultBehavior: {
            cachePolicy: new CachePolicy(this, 'HelpflCacheing', {
                defaultTtl: Duration.minutes(1)
            }),
            origin: new S3Origin(bucket),
        },
    });

    new ARecord(this, 'ARecord', {
        zone: hostedZone,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        ttl: Duration.minutes(1),
    });


  }
}

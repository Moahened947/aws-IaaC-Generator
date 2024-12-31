function generateCode() {
  const input = document.querySelector('.input-area').value;
  if (!validateInput(input)) {
    document.getElementById('codeOutput').innerHTML = '';
    return;
  }
  const outputArea = document.getElementById('codeOutput');
  outputArea.style.opacity = '0';
  let generatedCode = processInfrastructureDescription(input);
  setTimeout(() => {
    outputArea.innerHTML = syntaxHighlight(generatedCode);
    document.querySelector('.copy-icon').classList.add('show');
    outputArea.style.transition = 'opacity 0.5s ease';
    outputArea.style.opacity = '1';
  }, 100);
}
function clearCode() {
  document.querySelector('.input-area').value = '';
  document.getElementById('codeOutput').innerHTML = '';
  document.getElementById('validationMessage').style.display = 'none';
  document.querySelector('.copy-icon').classList.remove('show');
}
function syntaxHighlight(code) {
  code = code.replace(/\b(import|class|def|self|try|except|if|raise|return|for|in)\b/g, '<span class="keyword">$1</span>');
  code = code.replace(/'([^']+)'/g, '<span class="string">\'$1\'</span>');
  code = code.replace(/(#.+)$/gm, '<span class="comment">$1</span>');
  code = code.replace(/\b(\w+)\(/g, '<span class="function">$1</span>(');
  code = code.replace(/\b(AWSInfrastructure)\b/g, '<span class="class-name">$1</span>');
  code = code.replace(/self\.(\w+)/g, 'self.<span class="variable">$1</span>');
  code = code.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
  return code;
}
function copyToClipboard() {
  const codeOutput = document.getElementById('codeOutput');
  const notification = document.getElementById('copyNotification');
  const copyIcon = document.querySelector('.copy-icon svg');
  const textarea = document.createElement('textarea');
  textarea.value = codeOutput.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    notification.style.display = 'block';
    copyIcon.style.fill = '#4CAF50';
    setTimeout(() => {
      copyIcon.style.fill = '#61dafb';
    }, 1000);
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
  document.body.removeChild(textarea);
}
function processInfrastructureDescription(input) {
  let code = `# Prerequisites:
# 1. Install boto3: pip install boto3
# 2. Configure AWS credentials: 
#    - Option 1: Run 'aws configure' and provide access key, secret key
#    - Option 2: Set environment variables:
#        export AWS_ACCESS_KEY_ID="your_access_key"
#        export AWS_SECRET_ACCESS_KEY="your_secret_key"
# 3. Ensure you have necessary IAM permissions to create resources
# 4. For Lambda functions, prepare lambda_function.zip containing your code
# 5. For RDS, note down the password you want to use
# 6. Make sure you have sufficient quotas/limits for the resources

import boto3
import time

class AWSInfrastructure:
    def __init__(self, region='us-east-1'):
        # Create a session with the specified region
        self.session = boto3.Session(region_name=region)
        
        # Initialize service clients using the session
        self.ec2 = self.session.client('ec2')
        self.s3 = self.session.client('s3')
        self.lambda_client = self.session.client('lambda')
        self.rds = self.session.client('rds')
        self.dynamodb = self.session.client('dynamodb')
        self.ecs = self.session.client('ecs')
        self.eks = self.session.client('eks')
        self.cloudfront = self.session.client('cloudfront')
        self.route53 = self.session.client('route53')
        self.elasticache = self.session.client('elasticache')
        self.elb = self.session.client('elbv2')
        self.sns = self.session.client('sns')
        self.sqs = self.session.client('sqs')
        self.apigateway = self.session.client('apigateway')
        self.cloudwatch = self.session.client('cloudwatch')
        self.iam = self.session.client('iam')
        self.waf = self.session.client('waf')
        self.shield = self.session.client('shield')
        self.kms = self.session.client('kms')
        self.cognito = self.session.client('cognito-idp')
        self.stepfunctions = self.session.client('stepfunctions')
        self.eventbridge = self.session.client('events')
        self.codebuild = self.session.client('codebuild')
        self.codepipeline = self.session.client('codepipeline')
        self.codedeploy = self.session.client('codedeploy')
        self.secretsmanager = self.session.client('secretsmanager')
        self.ecr = self.session.client('ecr')
        
        # Store resource IDs
        self.vpc_id = None
        self.public_subnet_id = None
        self.private_subnet_id = None
        self.security_group_id = None
        
    def create_infrastructure(self):
        try:
`;
  const lines = input.split('\n');
  lines.forEach(line => {
    if (line.toLowerCase().includes('vpc')) {
      code += generateVPCCode(line);
    }
    if (line.toLowerCase().includes('ec2')) {
      code += generateEC2Code(line);
    }
    if (line.toLowerCase().includes('s3')) {
      code += generateS3Code(line);
    }
    if (line.toLowerCase().includes('lambda')) {
      code += generateLambdaCode(line);
    }
    if (line.toLowerCase().includes('rds')) {
      code += generateRDSCode(line);
    }
    if (line.toLowerCase().includes('dynamodb')) {
      code += generateDynamoDBCode(line);
    }
    if (line.toLowerCase().includes('ecs')) {
      code += generateECSCode(line);
    }
    if (line.toLowerCase().includes('eks')) {
      code += generateEKSCode(line);
    }
    if (line.toLowerCase().includes('cloudfront')) {
      code += generateCloudFrontCode(line);
    }
    if (line.toLowerCase().includes('route53')) {
      code += generateRoute53Code(line);
    }
    if (line.toLowerCase().includes('elasticache')) {
      code += generateElastiCacheCode(line);
    }
    if (line.toLowerCase().includes('elb')) {
      code += generateELBCode(line);
    }
    if (line.toLowerCase().includes('sns')) {
      code += generateSNSCode(line);
    }
    if (line.toLowerCase().includes('sqs')) {
      code += generateSQSCode(line);
    }
    if (line.toLowerCase().includes('api gateway')) {
      code += generateAPIGatewayCode(line);
    }
    if (line.toLowerCase().includes('cloudwatch')) {
      code += generateCloudWatchCode(line);
    }
    if (line.toLowerCase().includes('iam')) {
      code += generateIAMCode(line);
    }
    if (line.toLowerCase().includes('waf')) {
      code += generateWAFCode(line);
    }
    if (line.toLowerCase().includes('shield')) {
      code += generateShieldCode(line);
    }
    if (line.toLowerCase().includes('kms')) {
      code += generateKMSCode(line);
    }
    if (line.toLowerCase().includes('cognito')) {
      code += generateCognitoCode(line);
    }
    if (line.toLowerCase().includes('step functions')) {
      code += generateStepFunctionsCode(line);
    }
    if (line.toLowerCase().includes('eventbridge')) {
      code += generateEventBridgeCode(line);
    }
    if (line.toLowerCase().includes('codebuild')) {
      code += generateCodeBuildCode(line);
    }
    if (line.toLowerCase().includes('codepipeline')) {
      code += generateCodePipelineCode(line);
    }
    if (line.toLowerCase().includes('codedeploy')) {
      code += generateCodeDeployCode(line);
    }
    if (line.toLowerCase().includes('secrets manager')) {
      code += generateSecretsManagerCode(line);
    }
    if (line.toLowerCase().includes('ecr')) {
      code += generateECRCode(line);
    }
  });
  code += `
        except Exception as e:
            print(f"Error creating infrastructure: {str(e)}")
            raise
            
def main():
    # Specify your desired AWS region
    region = 'us-east-1'
    infra = AWSInfrastructure(region=region)
    infra.create_infrastructure()
            
if __name__ == "__main__":
    main()
`;
  return code;
}
function generateVPCCode(line) {
  return `            # Create VPC
            vpc_response = self.ec2.create_vpc(
                CidrBlock='10.0.0.0/16', 
                TagSpecifications=[
                    {
                        'ResourceType': 'vpc',
                        'Tags': [
                            {
                                'Key': 'Name',
                                'Value': 'MyVPC'
                            }
                        ]
                    }
                ]
            )
            self.vpc_id = vpc_response['Vpc']['VpcId']

            # Get AZs for the region
            azs = self.ec2.describe_availability_zones()['AvailabilityZones']

            # Create public subnet
            public_subnet_response = self.ec2.create_subnet(
                VpcId=self.vpc_id,
                CidrBlock='10.0.1.0/24',
                AvailabilityZone=azs[0]['ZoneName'],
                TagSpecifications=[
                    {
                        'ResourceType': 'subnet',
                        'Tags': [
                            {
                                'Key': 'Name',
                                'Value': 'PublicSubnet'
                            }
                        ]
                    }
                ]
            )
            self.public_subnet_id = public_subnet_response['Subnet']['SubnetId']

            # Create private subnet
            private_subnet_response = self.ec2.create_subnet(
                VpcId=self.vpc_id,
                CidrBlock='10.0.2.0/24', 
                AvailabilityZone=azs[0]['ZoneName'],
                TagSpecifications=[
                    {
                        'ResourceType': 'subnet',
                        'Tags': [
                            {
                                'Key': 'Name',
                                'Value': 'PrivateSubnet'
                            }
                        ]
                    }
                ]
            )
            self.private_subnet_id = private_subnet_response['Subnet']['SubnetId']

            # Create Internet Gateway
            igw_response = self.ec2.create_internet_gateway()
            igw_id = igw_response['InternetGateway']['InternetGatewayId']
            
            # Attach Internet Gateway to VPC
            self.ec2.attach_internet_gateway(
                InternetGatewayId=igw_id,
                VpcId=self.vpc_id
            )

            # Create NAT Gateway
            eip_response = self.ec2.allocate_address(Domain='vpc')
            nat_response = self.ec2.create_nat_gateway(
                SubnetId=self.public_subnet_id,
                AllocationId=eip_response['AllocationId']
            )
            nat_gateway_id = nat_response['NatGateway']['NatGatewayId']

            # Create route tables
            public_rt = self.ec2.create_route_table(VpcId=self.vpc_id)
            private_rt = self.ec2.create_route_table(VpcId=self.vpc_id)

            # Add routes
            self.ec2.create_route(
                RouteTableId=public_rt['RouteTable']['RouteTableId'],
                DestinationCidrBlock='0.0.0.0/0',
                GatewayId=igw_id
            )

            self.ec2.create_route(
                RouteTableId=private_rt['RouteTable']['RouteTableId'], 
                DestinationCidrBlock='0.0.0.0/0',
                NatGatewayId=nat_gateway_id
            )

            # Associate route tables with subnets
            self.ec2.associate_route_table(
                RouteTableId=public_rt['RouteTable']['RouteTableId'],
                SubnetId=self.public_subnet_id
            )

            self.ec2.associate_route_table(
                RouteTableId=private_rt['RouteTable']['RouteTableId'],
                SubnetId=self.private_subnet_id
            )
            
            print(f"VPC created with ID: {self.vpc_id}")
            print(f"Public Subnet ID: {self.public_subnet_id}")
            print(f"Private Subnet ID: {self.private_subnet_id}")
`;
}
function generateEC2Code(line) {
  const instances = line.match(/\d+/) || [2];
  return `            # Launch EC2 instances
            instance_response = self.ec2.run_instances(
                ImageId='ami-0c55b159cbfafe1f0',  
                InstanceType='t2.micro',
                MinCount=${instances[0]},
                MaxCount=${instances[0]},
                NetworkInterfaces=[{
                    'SubnetId': self.private_subnet_id, 
                    'DeviceIndex': 0,
                    'AssociatePublicIpAddress': False  
                }],
                TagSpecifications=[
                    {
                        'ResourceType': 'instance',
                        'Tags': [
                            {
                                'Key': 'Name',
                                'Value': 'MyEC2Instance'
                            }
                        ]
                    }
                ]
            )
            
            instance_ids = [instance['InstanceId'] for instance in instance_response['Instances']]
            print(f"Launched EC2 instances with IDs: {instance_ids}")
`;
}
function generateS3Code(line) {
  return `            # Create S3 bucket
            bucket_name = f"my-static-files-{int(time.time())}"
            self.s3.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={
                    'LocationConstraint': 'us-east-1'
                }
            )
            
            # Configure bucket for static website hosting
            self.s3.put_bucket_website(
                Bucket=bucket_name,
                WebsiteConfiguration={
                    'IndexDocument': {'Suffix': 'index.html'},
                    'ErrorDocument': {'Key': 'error.html'}
                }
            )
            
            print(f"Created S3 bucket: {bucket_name}")
`;
}
function generateLambdaCode(line) {
  return `            # Note: Requires lambda_function.zip in current directory
            # Create Lambda function
            with open('lambda_function.zip', 'rb') as f:
                lambda_code = f.read()
                
            # Note: Replace ACCOUNT_ID with your AWS account ID
            lambda_response = self.lambda_client.create_function(
                FunctionName=f'my-lambda-function-{int(time.time())}',
                Runtime='python3.8',
                Role='arn:aws:iam::ACCOUNT_ID:role/lambda-role',
                Handler='index.handler',
                Code={
                    'ZipFile': lambda_code
                },
                Description='Lambda function created via Boto3',
                Timeout=30,
                MemorySize=128,
                Publish=True
            )
            
            print(f"Created Lambda function: {lambda_response['FunctionName']}")
`;
}
function generateRDSCode(line) {
  return `            # Note: Replace 'your-password-here' with secure password
            # Create RDS instance
            rds_response = self.rds.create_db_instance(
                DBName='mydb',
                DBInstanceIdentifier=f'my-rds-instance-{int(time.time())}',
                AllocatedStorage=20,
                DBInstanceClass='db.t2.micro',
                Engine='mysql',
                MasterUsername='admin',
                MasterUserPassword='your-password-here',  # Change this!
                VpcSecurityGroupIds=[self.vpc_id],
                AvailabilityZone='us-east-1a',
                PubliclyAccessible=False,
                BackupRetentionPeriod=7,
                MultiAZ=False,
                EngineVersion='8.0.28',
                AutoMinorVersionUpgrade=True,
                Tags=[
                    {
                        'Key': 'Environment',
                        'Value': 'Production'
                    }
                ]
            )
            
            print(f"Created RDS instance: {rds_response['DBInstance']['DBInstanceIdentifier']}")
`;
}
function generateDynamoDBCode(line) {
  return `            # Create DynamoDB table
            table_name = f'my-dynamodb-table-{int(time.time())}'
            dynamodb_response = self.dynamodb.create_table(
                TableName=table_name,
                KeySchema=[
                    {
                        'AttributeName': 'id',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'timestamp',
                        'KeyType': 'RANGE'
                    }
                ],
                AttributeDefinitions=[
                    {
                        'AttributeName': 'id',
                        'AttributeType': 'S'
                    },
                    {
                        'AttributeName': 'timestamp',
                        'AttributeType': 'N'
                    }
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                },
                Tags=[
                    {
                        'Key': 'Environment',
                        'Value': 'Production'
                    }
                ]
            )
            
            print(f"Created DynamoDB table: {table_name}")
`;
}
function generateECSCode(line) {
  return `            # Create ECS Cluster
            cluster_response = self.ecs.create_cluster(
                clusterName=f'my-ecs-cluster-{int(time.time())}',
                capacityProviders=['FARGATE'],
                defaultCapacityProviderStrategy=[
                    {
                        'capacityProvider': 'FARGATE',
                        'weight': 1
                    }
                ]
            )
            print(f"Created ECS Cluster: {cluster_response['cluster']['clusterName']}")
`;
}
function generateEKSCode(line) {
  return `            # Create EKS Cluster
            cluster_response = self.eks.create_cluster(
                name=f'my-eks-cluster-{int(time.time())}',
                roleArn='arn:aws:iam::ACCOUNT_ID:role/eks-cluster-role',
                resourcesVpcConfig={
                    'subnetIds': [self.public_subnet_id, self.private_subnet_id],
                    'endpointPublicAccess': True,
                    'endpointPrivateAccess': False
                },
                version='1.21'
            )
            print(f"Created EKS Cluster: {cluster_response['cluster']['name']}")
`;
}
function generateCloudFrontCode(line) {
  return `            # Create CloudFront Distribution
            distribution_config = {
                'CallerReference': f'distribution-{int(time.time())}',
                'DefaultRootObject': 'index.html',
                'Origins': {
                    'Quantity': 1,
                    'Items': [
                        {
                            'Id': 'my-origin',
                            'DomainName': 'my-bucket.s3.amazonaws.com',
                            'S3OriginConfig': {
                                'OriginAccessIdentity': ''
                            }
                        }
                    ]
                },
                'DefaultCacheBehavior': {
                    'ForwardedValues': {
                        'QueryString': False,
                        'Cookies': {
                            'Forward': 'none'
                        }
                    },
                    'TrustedSigners': {
                        'Enabled': False,
                        'Quantity': 0
                    },
                    'ViewerProtocolPolicy': 'allow-all',
                    'MinTTL': 0
                },
                'Comment': '',
                'Enabled': True
            }
            distribution_response = self.cloudfront.create_distribution(DistributionConfig=distribution_config)
            print(f"Created CloudFront Distribution: {distribution_response['Distribution']['Id']}")
`;
}
function generateRoute53Code(line) {
  return `            # Create Route53 Hosted Zone
            zone_response = self.route53.create_hosted_zone(
                Name='example.com',
                CallerReference=f'zone-{int(time.time())}'
            )
            print(f"Created Route53 Hosted Zone: {zone_response['HostedZone']['Id']}")
`;
}
function generateElastiCacheCode(line) {
  return `            # Create ElastiCache Cluster
            cache_cluster_response = self.elasticache.create_cache_cluster(
                CacheClusterId=f'my-cache-cluster-{int(time.time())}',
                Engine='redis',
                CacheNodeType='cache.t2.micro',
                NumCacheNodes=1
            )
            print(f"Created ElastiCache Cluster: {cache_cluster_response['CacheCluster']['CacheClusterId']}")
`;
}
function generateELBCode(line) {
  return `            # Create Application Load Balancer
            load_balancer_response = self.elb.create_load_balancer(
                Name=f'my-load-balancer-{int(time.time())}',
                Listeners=[
                    {
                        'Protocol': 'HTTP',
                        'LoadBalancerPort': 80,
                        'InstanceProtocol': 'HTTP',
                        'InstancePort': 80
                    }
                ],
                AvailabilityZones=[self.ec2.describe_availability_zones()['AvailabilityZones'][0]['ZoneName']]
            )
            print(f"Created Application Load Balancer: {load_balancer_response['LoadBalancers'][0]['LoadBalancerName']}")
`;
}
function generateSNSCode(line) {
  return `            # Create SNS Topic
            topic_response = self.sns.create_topic(
                Name=f'my-topic-{int(time.time())}'
            )
            print(f"Created SNS Topic: {topic_response['TopicArn']}")
`;
}
function generateSQSCode(line) {
  return `            # Create SQS Queue
            queue_response = self.sqs.create_queue(
                QueueName=f'my-queue-{int(time.time())}'
            )
            print(f"Created SQS Queue: {queue_response['QueueUrl']}")
`;
}
function generateAPIGatewayCode(line) {
  return `            # Create API Gateway REST API
            rest_api_response = self.apigateway.create_rest_api(
                name=f'my-api-{int(time.time())}',
                description='My API'
            )
            print(f"Created API Gateway REST API: {rest_api_response['id']}")
`;
}
function generateCloudWatchCode(line) {
  return `            # Create CloudWatch Alarm
            alarm_response = self.cloudwatch.put_metric_alarm(
                AlarmName=f'my-alarm-{int(time.time())}',
                ComparisonOperator='GreaterThanThreshold',
                EvaluationPeriods=1,
                MetricName='CPUUtilization',
                Namespace='AWS/EC2',
                Period=300,
                Statistic='Average',
                Threshold=70.0,
                ActionsEnabled=True,
                AlarmDescription='My Alarm',
                AlarmActions=['arn:aws:sns:us-east-1:123456789012:my-topic']
            )
            print(f"Created CloudWatch Alarm: {alarm_response['AlarmName']}")
`;
}
function parseInfrastructure(input) {
  const components = {
    vpc: false,
    ec2: 0,
    s3: false,
    lambda: false,
    rds: false,
    dynamodb: false,
    ecs: false,
    eks: false,
    cloudfront: false,
    route53: false,
    elasticache: false,
    elb: false,
    sns: false,
    sqs: false,
    apigateway: false,
    cloudwatch: false,
    iam: false,
    waf: false,
    shield: false,
    kms: false,
    cognito: false,
    stepfunctions: false,
    eventbridge: false,
    codebuild: false,
    codepipeline: false,
    codedeploy: false,
    secretsmanager: false,
    ecr: false
  };
  const lines = input.split('\n');
  lines.forEach(line => {
    if (line.toLowerCase().includes('vpc')) components.vpc = true;
    if (line.toLowerCase().includes('ec2')) {
      const count = line.match(/\d+/);
      components.ec2 = count ? parseInt(count[0]) : 1;
    }
    if (line.toLowerCase().includes('s3')) components.s3 = true;
    if (line.toLowerCase().includes('lambda')) components.lambda = true;
    if (line.toLowerCase().includes('rds')) components.rds = true;
    if (line.toLowerCase().includes('dynamodb')) components.dynamodb = true;
    if (line.toLowerCase().includes('ecs')) components.ecs = true;
    if (line.toLowerCase().includes('eks')) components.eks = true;
    if (line.toLowerCase().includes('cloudfront')) components.cloudfront = true;
    if (line.toLowerCase().includes('route53')) components.route53 = true;
    if (line.toLowerCase().includes('elasticache')) components.elasticache = true;
    if (line.toLowerCase().includes('elb')) components.elb = true;
    if (line.toLowerCase().includes('sns')) components.sns = true;
    if (line.toLowerCase().includes('sqs')) components.sqs = true;
    if (line.toLowerCase().includes('api gateway')) components.apigateway = true;
    if (line.toLowerCase().includes('cloudwatch')) components.cloudwatch = true;
    if (line.toLowerCase().includes('iam')) components.iam = true;
    if (line.toLowerCase().includes('waf')) components.waf = true;
    if (line.toLowerCase().includes('shield')) components.shield = true;
    if (line.toLowerCase().includes('kms')) components.kms = true;
    if (line.toLowerCase().includes('cognito')) components.cognito = true;
    if (line.toLowerCase().includes('step functions')) components.stepfunctions = true;
    if (line.toLowerCase().includes('eventbridge')) components.eventbridge = true;
    if (line.toLowerCase().includes('codebuild')) components.codebuild = true;
    if (line.toLowerCase().includes('codepipeline')) components.codepipeline = true;
    if (line.toLowerCase().includes('codedeploy')) components.codedeploy = true;
    if (line.toLowerCase().includes('secrets manager')) components.secretsmanager = true;
    if (line.toLowerCase().includes('ecr')) components.ecr = true;
  });
  return components;
}
function generateInfraAndDiagram() {
  const input = document.querySelector('.input-area').value;
  if (!validateInput(input)) {
    document.getElementById('codeOutput').innerHTML = '';
    return;
  }
  const outputArea = document.getElementById('codeOutput');
  let infraCode = processInfrastructureDescription(input);
  let diagramCode = generateDiagramCode(input);
  let combinedCode = infraCode + '\n\n# Diagram Code:\n' + diagramCode + '\n\n# The infrastructure diagram will be saved as infrastructure.svg in the same directory';
  outputArea.innerHTML = syntaxHighlight(combinedCode);
  document.querySelector('.copy-icon').classList.add('show');
}
function generateDiagramCode(input) {
  const components = parseInfrastructure(input);
  let code = `# pip install diagrams
from diagrams import Diagram
from diagrams.aws.compute import EC2, Lambda
from diagrams.aws.storage import S3
from diagrams.aws.network import VPC
from diagrams.aws.database import RDS, DynamoDB
from diagrams.aws.container import ECS, EKS
from diagrams.aws.network import ELB
from diagrams.aws.general import Internet
from diagrams.aws.storage import Elasticache
from diagrams.aws.integration import SQS, SNS
from diagrams.aws.network import Route53
from diagrams.aws.network import CloudFront
from diagrams.aws.management import CloudWatch
from diagrams.aws.security import IAM

# Create diagram in SVG format 
with Diagram("AWS Infrastructure", show=False, filename="infrastructure", outformat="svg"):
`;
  if (components.vpc) {
    code += '    vpc = VPC("VPC")\n';
  }
  if (components.ec2 > 0) {
    code += `    ec2_nodes = [EC2("EC2 Instance") for _ in range(${components.ec2})]\n`;
  }
  if (components.s3) {
    code += '    s3 = S3("Static Files")\n';
  }
  if (components.lambda) {
    code += '    lambda_fn = Lambda("Lambda Function")\n';
  }
  if (components.rds) {
    code += '    rds = RDS("Database")\n';
  }
  if (components.dynamodb) {
    code += '    dynamodb = DynamoDB("NoSQL Database")\n';
  }
  if (components.ecs) {
    code += '    ecs = ECS("ECS Cluster")\n';
  }
  if (components.eks) {
    code += '    eks = EKS("EKS Cluster")\n';
  }
  if (components.cloudfront) {
    code += '    cloudfront = CloudFront("CloudFront Distribution")\n';
  }
  if (components.route53) {
    code += '    route53 = Route53("Route53 Hosted Zone")\n';
  }
  if (components.elasticache) {
    code += '    elasticache = Elasticache("ElastiCache Cluster")\n';
  }
  if (components.elb) {
    code += '    elb = ELB("Application Load Balancer")\n';
  }
  if (components.sns) {
    code += '    sns = SNS("SNS Topic")\n';
  }
  if (components.sqs) {
    code += '    sqs = SQS("SQS Queue")\n';
  }
  if (components.apigateway) {
    code += '    apigateway = IAM("API Gateway")\n';
  }
  if (components.cloudwatch) {
    code += '    cloudwatch = CloudWatch("CloudWatch Alarms")\n';
  }
  if (components.iam) {
    code += '    iam = IAM("IAM Role")\n';
  }
  if (components.waf) {
    code += '    waf = IAM("WAF")\n';
  }
  if (components.shield) {
    code += '    shield = IAM("Shield")\n';
  }
  if (components.kms) {
    code += '    kms = IAM("KMS")\n';
  }
  if (components.cognito) {
    code += '    cognito = IAM("Cognito")\n';
  }
  if (components.stepfunctions) {
    code += '    stepfunctions = IAM("Step Functions")\n';
  }
  if (components.eventbridge) {
    code += '    eventbridge = IAM("EventBridge")\n';
  }
  if (components.codebuild) {
    code += '    codebuild = IAM("CodeBuild")\n';
  }
  if (components.codepipeline) {
    code += '    codepipeline = IAM("CodePipeline")\n';
  }
  if (components.codedeploy) {
    code += '    codedeploy = IAM("CodeDeploy")\n';
  }
  if (components.secretsmanager) {
    code += '    secretsmanager = IAM("Secrets Manager")\n';
  }
  if (components.ecr) {
    code += '    ecr = IAM("ECR")\n';
  }
  code += `
    # Add relationships between components
    # vpc >> ec2_nodes
    # vpc >> rds
    # vpc >> dynamodb
    # ec2_nodes >> sns
    # sns >> sqs
`;
  return code;
}
function validateInput(input) {
  const validationMessage = document.getElementById('validationMessage');
  if (!validationMessage) {
    console.error('Validation message element not found');
    return false;
  }
  validationMessage.textContent = '';
  if (!input.trim()) {
    validationMessage.textContent = 'Please enter infrastructure description';
    return false;
  }
  if (input.includes('create') && !input.includes('-')) {
    validationMessage.textContent = 'Please use bullet points (-) to describe resources';
    return false;
  }
  const validServices = ['vpc', 'ec2', 's3', 'lambda', 'rds', 'dynamodb', 'ecs', 'eks', 'cloudfront', 'route53', 'elasticache', 'elb', 'sns', 'sqs', 'apigateway', 'cloudwatch', 'iam', 'waf', 'shield', 'kms', 'cognito', 'stepfunctions', 'eventbridge', 'codebuild', 'codepipeline', 'codedeploy', 'secretsmanager', 'ecr'];
  const inputServices = input.toLowerCase().split('\n').filter(line => line.trim()).map(line => validServices.find(service => line.includes(service))).filter(Boolean);
  if (inputServices.length === 0) {
    validationMessage.textContent = 'Please specify at least one valid AWS service';
    return false;
  }
  return true;
}
function generateIAMCode(line) {
  return `            # Create IAM role
            role_response = self.iam.create_role(
                RoleName=f'my-service-role-{int(time.time())}',
                AssumeRolePolicyDocument='{"Version": "2012-10-17","Statement": [{"Effect": "Allow","Principal": {"Service": "ec2.amazonaws.com"},"Action": "sts:AssumeRole"}]}'
            )
            print(f"Created IAM role: {role_response['Role']['RoleName']}")
`;
}
function generateWAFCode(line) {
  return `            # Create WAF Web ACL
            waf_response = self.waf.create_web_acl(
                Name=f'my-web-acl-{int(time.time())}',
                MetricName='mywebacl',
                DefaultAction={
                    'Type': 'ALLOW'
                },
                Rules=[]
            )
            print(f"Created WAF Web ACL: {waf_response['WebACL']['WebACLId']}")
`;
}
function generateShieldCode(line) {
  return `            # Enable Shield Advanced
            shield_response = self.shield.create_protection(
                Name=f'my-protection-{int(time.time())}',
                ResourceArn='resource-arn'
            )
            print(f"Enabled Shield protection: {shield_response['ProtectionId']}")
`;
}
function generateKMSCode(line) {
  return `            # Create KMS key
            key_response = self.kms.create_key(
                Description='My encryption key',
                KeyUsage='ENCRYPT_DECRYPT',
                Origin='AWS_KMS'
            )
            print(f"Created KMS key: {key_response['KeyMetadata']['KeyId']}")
`;
}
function generateCognitoCode(line) {
  return `            # Create Cognito User Pool
            user_pool_response = self.cognito.create_user_pool(
                PoolName=f'my-user-pool-{int(time.time())}',
                Policies={
                    'PasswordPolicy': {
                        'MinimumLength': 8,
                        'RequireUppercase': True,
                        'RequireLowercase': True,
                        'RequireNumbers': True,
                        'RequireSymbols': True
                    }
                }
            )
            print(f"Created Cognito User Pool: {user_pool_response['UserPool']['Id']}")
`;
}
function generateStepFunctionsCode(line) {
  return `            # Create Step Functions State Machine
            state_machine_response = self.stepfunctions.create_state_machine(
                name=f'my-state-machine-{int(time.time())}',
                definition='{
                    "StartAt": "FirstState",
                    "States": {
                        "FirstState": {
                            "Type": "Pass",
                            "End": true
                        }
                    }
                }',
                roleArn='state-machine-role-arn'
            )
            print(f"Created Step Functions State Machine: {state_machine_response['stateMachineArn']}")
`;
}
function generateEventBridgeCode(line) {
  return `            # Create EventBridge Rule
            rule_response = self.eventbridge.put_rule(
                Name=f'my-rule-{int(time.time())}',
                ScheduleExpression='rate(5 minutes)',
                State='ENABLED'
            )
            print(f"Created EventBridge Rule: {rule_response['RuleArn']}")
`;
}
function generateCodeBuildCode(line) {
  return `            # Create CodeBuild Project
            build_response = self.codebuild.create_project(
                name=f'my-build-project-{int(time.time())}',
                source={
                    'type': 'CODECOMMIT'
                },
                artifacts={
                    'type': 'NO_ARTIFACTS'
                },
                environment={
                    'type': 'LINUX_CONTAINER',
                    'image': 'aws/codebuild/standard:4.0',
                    'computeType': 'BUILD_GENERAL1_SMALL'
                }
            )
            print(f"Created CodeBuild Project: {build_response['project']['name']}")
`;
}
function generateCodePipelineCode(line) {
  return `            # Create CodePipeline
            pipeline_response = self.codepipeline.create_pipeline(
                pipeline={
                    'name': f'my-pipeline-{int(time.time())}',
                    'roleArn': 'pipeline-role-arn',
                    'artifactStore': {
                        'type': 'S3',
                        'location': 'bucket-name'
                    },
                    'stages': [{
                        'name': 'Source',
                        'actions': [{
                            'name': 'Source',
                            'actionTypeId': {
                                'category': 'Source',
                                'owner': 'AWS',
                                'provider': 'CodeCommit',
                                'version': '1'
                            }
                        }]
                    }]
                }
            )
            print(f"Created CodePipeline: {pipeline_response['pipeline']['name']}")
`;
}
function generateCodeDeployCode(line) {
  return `            # Create CodeDeploy Application
            deploy_response = self.codedeploy.create_application(
                applicationName=f'my-application-{int(time.time())}',
                computePlatform='Server'
            )
            print(f"Created CodeDeploy Application: {deploy_response['applicationId']}")
`;
}
function generateSecretsManagerCode(line) {
  return `            # Create Secrets Manager Secret
            secret_response = self.secretsmanager.create_secret(
                Name=f'my-secret-{int(time.time())}',
                Description='My secret value',
                SecretString='{"username":"myuser","password":"mypassword"}'
            )
            print(f"Created Secret: {secret_response['ARN']}")
`;
}
function generateECRCode(line) {
  return `            # Create ECR Repository
            repo_response = self.ecr.create_repository(
                repositoryName=f'my-repo-{int(time.time())}',
                imageScanningConfiguration={
                    'scanOnPush': True
                }
            )
            print(f"Created ECR Repository: {repo_response['repository']['repositoryName']}")
`;}
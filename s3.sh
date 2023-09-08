#!/bin/bash

bucket_name='your-bucket-name'
website_directory='/path/to/website/'

region='us-east-1'
profile='default'

# 1. Create a new bucket with a unique name
aws s3 mb --profile $profile --region $region --region us-east-1 "s3://$bucket_name" 

# 2. Enable public access to the bucket
aws s3api put-public-access-block --profile $profile --region $region --bucket $bucket_name \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 3. Update the bucket policy for public read access:
aws s3api put-bucket-policy --profile $profile --region $region --bucket $bucket_name \
  --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [
      {
          \"Sid\": \"PublicReadGetObject\",
          \"Effect\": \"Allow\",
          \"Principal\": \"*\",
          \"Action\": \"s3:GetObject\",
          \"Resource\": \"arn:aws:s3:::$bucket_name/*\"
      }
  ]
}"

# 4. Enable the s3 bucket to host an `index` and `error` html page
aws s3 website "s3://$bucket_name" --profile $profile --region $region --index-document index.html --error-document index.html

# # 5. Upload you website - call frequently
aws s3 sync --profile $profile --region $region $website_directory "s3://$bucket_name/"

# 6 Delete
# aws s3 rm --profile $profile --region $region --recursive s3://$bucket_name
# aws s3api delete-bucket --profile $profile --region $region --bucket $bucket_name
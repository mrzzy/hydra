#
# Boris
# Terraform Deployment on Alibaba Cloud
#

terraform {
  required_providers {
    alicloud = {
      source  = "aliyun/alicloud"
      version = "~> 1.193.0"
    }
  }
}
provider "alicloud" {
  // credentials to be passed via ALICLOUD_ACCESS_KEY & ALICLOUD_SECRET_KEY env vars
  region = "cn-hongkong"
}

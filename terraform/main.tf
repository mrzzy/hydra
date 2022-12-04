#
# Hydra
# Example Terraform of Linux Host Machine
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
  # credentials to be passed via ALICLOUD_ACCESS_KEY & ALICLOUD_SECRET_KEY env vars
  region = "cn-hongkong"
}

# VM instance hosting Boris
data "alicloud_simple_application_server_images" "images" {
  image_type = "system"
  platform   = "Linux"
  name_regex = "^Ubuntu-20.04$"
}

data "alicloud_simple_application_server_plans" "plans" {
  bandwidth = 30
  core      = 2
  disk_size = 40
  flow      = 1024
  memory    = 0 # 500 MB
  platform  = "Linux"
}

resource "alicloud_simple_application_server_instance" "hydra" {
  payment_type  = "Subscription"
  period        = 1 # 1 month
  instance_name = "hydra"
  plan_id       = data.alicloud_simple_application_server_plans.plans.plans.0.id
  image_id      = data.alicloud_simple_application_server_images.images.images.0.id
}


resource "alicloud_simple_application_server_firewall_rule" "hydra" {
  instance_id   = alicloud_simple_application_server_instance.hydra.id
  rule_protocol = "Tcp"
  port          = "8399"
  remark        = "proxy"
}

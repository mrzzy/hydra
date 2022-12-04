#
# hydra
# Terraform Deployment on Alibaba Cloud
# Outputs
#

data "alicloud_simple_application_server_instances" "hydra" {
  ids = [alicloud_simple_application_server_instance.hydra.id]
}

output "hydra" {
  description = "Publicly accessible IP address of hydra VM."
  value       = data.alicloud_simple_application_server_instances.hydra.instances.0.public_ip_address
}

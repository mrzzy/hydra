#
# Boris
# Terraform Deployment on Alibaba Cloud
# Outputs
#

data "alicloud_simple_application_server_instances" "boris" {
  ids = [alicloud_simple_application_server_instance.boris.id]
}

output "boris_ip" {
  description = "Publicly accessible IP address of Boris VM."
  value       = data.alicloud_simple_application_server_instances.boris.instances.0.public_ip_address
}

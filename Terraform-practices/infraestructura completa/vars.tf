variable "cidr" {
  description = "CIDR for VPC"
  default = "10.0.16.0/20"
}

variable "ssh_pub_path" {
  description = "SSH Key file directory"
  default = "you_path/public.pub"
}
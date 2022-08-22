resource "aws_instance" "servidor1" {
    availability_zone = "us-east-2a"
    ami = "ami-051dfed8f67f095f5"
    instance_type = "t2.micro"
    subnet_id = aws_subnet.public[0].id
    vpc_security_group_ids = concat([aws_security_group.webserver.id], [aws_default_security_group.default.id])
    key_name = aws_key_pair.key1.id
    
    lifecycle {
      create_before_destroy = true
    }

    root_block_device {
      volume_type = "gp2"
      volume_size = "10"
      delete_on_termination = true
    }

    tags = {
      Name = "Server1"
    }
    
    depends_on = [
      aws_vpc.vpc_deploy,
      aws_key_pair.key1,
      aws_security_group.webserver
    ]
}

output "dns-name" {
  value = aws_instance.servidor1.public_ip
}
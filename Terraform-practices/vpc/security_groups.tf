resource "aws_default_security_group" "default" {
  vpc_id = aws_vpc.vpc_deploy.id

  ingress {
    protocol = -1
    self = true
    from_port = 0
    to_port = 0
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  tags = {
    Name = "Default"
  }

  depends_on = [
    aws_vpc.vpc_deploy
  ]
}
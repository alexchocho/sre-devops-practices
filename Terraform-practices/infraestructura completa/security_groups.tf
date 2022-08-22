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
    Name = "Default Security Group"
  }

  depends_on = [
    aws_vpc.vpc_deploy
  ]
}

resource "aws_security_group" "webserver" {
  name = "webserver"
  description = "Security group for WebServer"
  vpc_id = aws_vpc.vpc_deploy.id
  tags = {
    Name = "Web Server"
  }
}

resource "aws_security_group_rule" "http" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
    ipv6_cidr_blocks = [ "::/0" ]
    security_group_id = aws_security_group.webserver.id
    description = "Allow HTTP from anywhere"

    depends_on = [
      aws_security_group.webserver
    ]
}

resource "aws_security_group_rule" "https" {
    type = "ingress"
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
    ipv6_cidr_blocks = [ "::/0" ]
    security_group_id = aws_security_group.webserver.id
    description = "Allow HTTPS from anywhere"

    depends_on = [
      aws_security_group.webserver
    ]
}

resource "aws_security_group_rule" "ssh" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
    ipv6_cidr_blocks = [ "::/0" ]
    security_group_id = aws_security_group.webserver.id
    description = "Allow SSH from anywhere"

    depends_on = [
      aws_security_group.webserver
    ]
}

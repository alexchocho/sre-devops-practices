resource "aws_vpc" "vpc_deploy" {
    cidr_block = var.cidr
    assign_generated_ipv6_cidr_block = false
    enable_dns_hostnames = true
    
    tags = {
      Name = "Tests-Terraform"
    }

    lifecycle {
      prevent_destroy = false //para produccion colocarlo en true
    }
}

resource "aws_subnet" "public" {
    vpc_id = aws_vpc.vpc_deploy.id
    count = length(data.aws_availability_zones.available.zone_ids)
    cidr_block = cidrsubnet(var.cidr, 4, 0 + count.index)
    map_public_ip_on_launch = true
        availability_zone = element(data.aws_availability_zones.available.names, count.index)
    tags = {
      Name = "public-network-${count.index}"
    }
    depends_on = [
      aws_vpc.vpc_deploy
    ]
}

resource "aws_subnet" "private" {
    vpc_id = aws_vpc.vpc_deploy.id
    count = length(data.aws_availability_zones.available.zone_ids)
    cidr_block = cidrsubnet(var.cidr, 4, 3 + count.index)
    map_public_ip_on_launch = false
    availability_zone = element(data.aws_availability_zones.available.names, count.index)

    tags = {
      Name = "private-network-${count.index}"
    }
    depends_on = [
      aws_vpc.vpc_deploy
    ]
}

#Internet Gateway para red publica
resource "aws_internet_gateway" "vpc_deploy-IG" {
    vpc_id = aws_vpc.vpc_deploy.id
    tags = {
      Name = "IG for public network"
    }
    lifecycle {
        prevent_destroy = false
    }

    depends_on = [
      aws_vpc.vpc_deploy
    ]
}

# Routes for public network
resource "aws_route_table" "public" {
  vpc_id           = aws_vpc.vpc_deploy.id
  # Internet
  route {
    ipv6_cidr_block = "::/0"
    gateway_id = aws_internet_gateway.vpc_deploy-IG.id
  }
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.vpc_deploy-IG.id
  }
  tags = {
    Name = "Tabla de Route para las redes public"
  }

}
# Route table Association for public network
resource "aws_route_table_association" "public" {
  count = length(data.aws_availability_zones.available.zone_ids)
  route_table_id = aws_route_table.public.id
  subnet_id = element(aws_subnet.public[*].id, count.index)

  depends_on = [
    aws_route_table.public
  ]
}

output "vpc-id" {
  value = aws_vpc.vpc_deploy.id
}


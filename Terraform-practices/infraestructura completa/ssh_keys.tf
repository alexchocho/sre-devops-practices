resource "aws_key_pair" "key1" {
  key_name   = "key1"
  public_key = file(var.ssh_pub_path)

  tags = {
    Name     = "key1"
    Usuario  = "alexchocho"
  }
}

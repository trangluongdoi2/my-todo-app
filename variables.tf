variable "s3_name" {
  type = string
  default = "s3-todo-uploads"
}

variable "default_aws_region" {
  type = string
  default = "ap-southeast-1"
}

variable "acm_cert_arn" {
  type    = string
  default = ""
}

variable "aws_profile" {
  type    = string
  default = "default"
}

terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "todo-org"
    workspaces {
      name = "dev"
    }
  }
}
provider "aws" {
  region  = "ap-southeast-1"
  profile = "default"
}

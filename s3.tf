resource "aws_s3_bucket" "my_todo_frontend_bucket" {
  bucket  = var.s3_name
}

resource "aws_s3_bucket_policy" "my_todo_frontend_bucket_policy" {
  bucket = aws_s3_bucket.my_todo_frontend_bucket.id
  policy = jsonencode({
    Version = "2008-10-17"
    Id = "PolicyForCloudFrontPrivateContent"
    Statement = [
      {
        Sid = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action = "s3:GetObject",
        Resource = "${aws_s3_bucket.my_todo_frontend_bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.my_todo_frontend_cdn.arn
          }
        }
      }
    ]
  })
  provisioner "local-exec" {
    command = "echo ${self.arn} >> s3_arn.txt"
  }

}

provider "aws" {
  region = var.default_aws_region
}
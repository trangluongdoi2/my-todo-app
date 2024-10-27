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
}

resource "aws_s3_bucket_website_configuration" "frontend_bucket_website" {
  bucket = aws_s3_bucket.my_todo_frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}
resource "aws_cloudfront_origin_access_control" "my_todo_frontend_cdn_oac" {
  name                              = "CloudFront S3 OAC"
  description                       = "CloudFront S3 OAC"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "my_todo_frontend_cdn" {
  enabled             = true
  default_root_object = "index.html"
  aliases = ["dev.trangluongdoi2.com"]

  origin {
    domain_name              = aws_s3_bucket.my_todo_frontend_bucket.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.my_todo_frontend_bucket.id
    origin_access_control_id = aws_cloudfront_origin_access_control.my_todo_frontend_cdn_oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.my_todo_frontend_bucket.id
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_cert_arn
    ssl_support_method = "sni-only"
  }

}
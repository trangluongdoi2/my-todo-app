resource "aws_cloudfront_origin_access_control" "my_todo_frontend_cdn_oac" {
  name                              = "my_todo_frontend_cdn_oac"
  description                       = "OAC for My Todo App Host"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "my_todo_frontend_cdn" {
  enabled             = true
  # description         = "CloudFront distribution for My Todo App Host"
  # default_root_object = "index.html"
  aliases = ["dev.trangluongdoi2.com"]

  origin {
    domain_name              = aws_s3_bucket.my_todo_frontend_bucket.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.my_todo_frontend_bucket.id
    origin_access_control_id = aws_cloudfront_origin_access_control.my_todo_frontend_cdn_oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = aws_s3_bucket.my_todo_frontend_bucket.id
    # cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    # origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    # # This is id for SecurityHeadersPolicy copied from https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
    # response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"

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

  ordered_cache_behavior {
    path_pattern           = "/*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.my_todo_frontend_bucket.id
    viewer_protocol_policy = "allow-all"
    # cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    # origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    # This is id for SecurityHeadersPolicy copied from https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
    response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"

    default_ttl = 0
    min_ttl     = 0
    max_ttl     = 0

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern           = "/js/*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.my_todo_frontend_bucket.id
    viewer_protocol_policy = "allow-all"
    # cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    # origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    # This is id for SecurityHeadersPolicy copied from https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
    response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"

    default_ttl = 0
    min_ttl     = 0
    max_ttl     = 0

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern           = "/css/*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.my_todo_frontend_bucket.id
    viewer_protocol_policy = "allow-all"
    # cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    # origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    # This is id for SecurityHeadersPolicy copied from https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
    response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"

    default_ttl = 0
    min_ttl     = 0
    max_ttl     = 0

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
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
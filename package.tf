resource "null_resource" "build_and_sync_vue_files" {
  triggers = {
    always_rebuild = "${timestamp()}"
  }

  provisioner "local-exec" {
    working_dir = "src/"
    command     = <<-EOF
      set -eo pipefail
      if ! command -v pnpm &> /dev/null; then
        echo "pnpm not found. Please install Node.js and npm."
        exit 1
      fi &&
      pnpm install &&
      pnpm run build &&
      aws s3 sync --profile ${var.aws_profile} ../dist/ s3://${aws_s3_bucket.my_todo_frontend_bucket.id}/public/
    EOF
  }
}

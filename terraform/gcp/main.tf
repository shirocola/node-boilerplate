provider "google" {
  project = "your-gcp-project-id"
  region  = "us-central1"
}

resource "google_container_cluster" "primary" {
  name     = "example-cluster"
  location = "us-central1"
  node_config {
    machine_type = "e2-medium"
  }
  initial_node_count = 1
}

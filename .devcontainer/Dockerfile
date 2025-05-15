# Use an official node image as a parent image
FROM node:23

# Set environment variables for versions
ARG HUGO_VERSION=0.147.3
ARG GO_VERSION=1.24.0

# Install dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates openssl git curl wget build-essential && \
    rm -rf /var/lib/apt/lists/*

# Determine architecture
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ]; then ARCH=arm64; else ARCH=amd64; fi && \
    echo "Architecture: $ARCH"

# Download and install Hugo Extended
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ]; then ARCH=arm64; else ARCH=amd64; fi && \
    wget -O hugo_extended_${HUGO_VERSION}.tar.gz https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${ARCH}.tar.gz && \
    tar xf hugo_extended_${HUGO_VERSION}.tar.gz && \
    mv hugo /usr/bin/hugo && \
    rm hugo_extended_${HUGO_VERSION}.tar.gz && \
    echo "Hugo installed"

# Download and install Go
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ]; then ARCH=arm64; else ARCH=amd64; fi && \
    wget -O go${GO_VERSION}.linux-${ARCH}.tar.gz https://dl.google.com/go/go${GO_VERSION}.linux-${ARCH}.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-${ARCH}.tar.gz && \
    rm go${GO_VERSION}.linux-${ARCH}.tar.gz && \
    echo "Go installed"

# Export Go path
ENV PATH=$PATH:/usr/local/go/bin

# Verify versions
RUN git --version && \
    hugo version && \
    go version

# Default shell
CMD ["/bin/bash"]

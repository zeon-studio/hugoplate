#!/bin/bash

# default versions
if [ -z $GO_VERSION ]; then GO_VERSION='1.19.3'; fi
if [ -z $HUGO_VERSION ]; then HUGO_VERSION='0.112.5'; fi

# install Go
curl -sSOL https://dl.google.com/go/go${GO_VERSION}.linux-amd64.tar.gz
tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# install Hugo
echo "Installing Hugo $HUGO_VERSION..."
curl -sSOL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
tar -xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
hugo version

# run Hugo
echo "Running Hugo..."
hugo --gc --minify
#!/usr/bin/env bash
set -e

USERNAME="${USERNAME:-"${_REMOTE_USER}"}"

# Script copies localhost's ~/.kube/config file into the container and swaps out 
# localhost for host.docker.internal on bash/zsh start to keep them in sync.
cp copy-kube-config.sh /usr/local/share/

chown ${USERNAME}:root /usr/local/share/copy-kube-config.sh
echo "source /usr/local/share/copy-kube-config.sh" | tee -a /root/.bashrc >> /root/.zshrc
if [ ! -z "${USERNAME}" ] && [ "${USERNAME}" != "root" ]; then
    echo "source /usr/local/share/copy-kube-config.sh" | tee -a /home/${USERNAME}/.bashrc >> /home/${USERNAME}/.zshrc
fi
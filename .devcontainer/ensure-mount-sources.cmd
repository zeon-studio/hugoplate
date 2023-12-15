@echo off

REM This Windows batch script ensures that the source mount points in devcontainer.json exist on the host.

setlocal enableextensions
echo "Ensuring mount points exist..."
md "%USERPROFILE%\.kube"
md "%USERPROFILE%\.minikube"
endlocal
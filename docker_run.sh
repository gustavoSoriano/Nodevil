#!/bin/bash
#
# Script para gerar um Docker Image
# Versão 1.0
# Soriano
# 08/02/2019

#Producao
docker rm -f nodevil
docker rmi nodevil
docker build -t nodevil:latest . 
docker run -d --name nodevil -p 9000:9000 nodevil:latest 

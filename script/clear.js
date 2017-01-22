#!/bin/bash

script=$(readlink -f "$0")
scriptDir=$(dirname "$script")
baseDir=$(dirname "$scriptDir")
baseDir="$baseDir"

cd $baseDir
set -ex && rm -rf $baseDir/html/*

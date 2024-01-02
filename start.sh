#!/bin/bash

cd ./frontend
yarn install
yarn build --emptyOutDir
cd ../backend
yarn install
yarn build
yarn start:prod

#!/usr/bin/env bash
rm -f .env
cp -f env.prod.env .env
yarn dev
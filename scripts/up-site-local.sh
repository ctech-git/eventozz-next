#!/usr/bin/env bash
rm -f .env
cp -f env.local.env .env
yarn dev
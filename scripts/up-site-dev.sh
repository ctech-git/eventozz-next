#!/usr/bin/env bash
rm -f .env
cp -f env.dev.env .env
yarn dev
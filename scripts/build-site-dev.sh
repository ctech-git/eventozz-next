#!/usr/bin/env bash
rm -f .env
cp -f env.dev.env .env
git add .
git commit -m "Update .env"
git push origin dev
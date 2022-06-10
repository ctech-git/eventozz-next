#!/usr/bin/env bash
rm -f .env
cp -f env.prod.env .env
git add .
git commit -m "Update .env"
git push origin prod
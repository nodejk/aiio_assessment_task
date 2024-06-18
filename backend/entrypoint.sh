#!/usr/bin/env bash

set -e

HOST=${HOST:-0.0.0.0}
PORT=${PORT:-8000}
HOST_PORT="${HOST}:${PORT}"

poetry run python manage.py migrate api

if [[ $ENVIRONMENT = "DEV" ]]; then
    exec poetry run python manage.py runserver $HOST_PORT
else
    exec /usr/local/bin/gunicorn core.wsgi:application -w 4 -k uvicorn.workers.UvicornWorker
fi

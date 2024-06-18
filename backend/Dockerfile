FROM python:3.12

RUN apt-get update -y \
    && apt-get upgrade -y 

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

RUN pip install poetry

WORKDIR /backend

COPY pyproject.toml .

RUN poetry install

COPY . .

CMD ["/bin/bash", "./entrypoint.sh"]


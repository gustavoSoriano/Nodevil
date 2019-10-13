FROM ubuntu:14.04
LABEL maintainer="Soriano sorianox2010@hotmail.com"
LABEL version="1.2"

RUN apt-get update \
&& apt-get install -y curl locales \
&& curl -sL https://deb.nodesource.com/setup_10.x | bash - \
&& apt-get update \
&& apt-get install -y nodejs \
&& apt-get install -y git \
&& apt-get install -y nano \
&& apt-get clean \
&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG pt_BR.UTF-8

WORKDIR /app

COPY . /app

RUN cd /app/config && mv config-producao.json config.json && cd /app && npm install && npm install -g pm2

CMD ["pm2-runtime", "process.yml"]

EXPOSE 9000
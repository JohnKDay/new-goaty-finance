FROM node:8

#RUN apt-get update && apt-get upgrade -y && apt-get install -y gnupg wget nodejs npm

ARG REACT_APP_QUANDL_KEY
ENV REACT_APP_QUANDL_KEY ${REACT_APP_QUANDL_KEY}
RUN if [ "${REACT_APP_QUANDL_KEY}" = "<no value>" ]; then \
    echo "Environment variable REACT_APP_QUANDL_KEY must be specified. Exiting."; \
    exit 40; \
    fi


ADD server /app/server
ADD public /app/public
ADD Procfile /app/Procfile
ADD package-lock.json /app/
ADD package.json /app/
ADD config /app/config
ADD src /app/src
ADD scripts /app/scripts
#ADD node_modules /app/node_modules
WORKDIR /app

RUN mkdir -p /app/node_modules && npm install

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000
CMD ["npm", "start"]
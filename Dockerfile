##################################BUILDER#########################################

FROM node:12.18.3 as builder

RUN \

    mkdir -p /app

COPY package*.json /app/


WORKDIR /app/

RUN \

    npm config set registry=${NPM_MIRROR_URL} && \

    npm install --no-cache

    COPY . .

EXPOSE 3001

CMD ["npm", "run", "prod"]
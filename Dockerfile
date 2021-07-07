FROM node:14-alpine

ARG APP_NAME
ARG BUILD_ID
ARG VERSION

WORKDIR /opt/app

ENV APP_NAME="${APP_NAME}"
ENV BUILD_ID="${BUILD_ID}"
ENV VERSION="${VERSION}"
# Do not rely on NODE_ENV - exists for performance reasons only
ENV NODE_ENV=production
ENV PORT=3000

ADD dist dist
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN apk add --no-cache make gcc g++ python && \
  npm prune --production && \
  npm rebuild bcrypt --build-from-source && \
  npm ci && \
  npm version ${VERSION} --no-git-tag-version --allow-same-version || true && \
  apk del make gcc g++ python

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
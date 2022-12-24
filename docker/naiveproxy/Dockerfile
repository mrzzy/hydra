#
# Hydra
# Naiveproxy
# Docker Container
#

ARG CADDY_VERSION=2.6.2
FROM caddy:$CADDY_VERSION-builder AS build
# build caddy with naiveproxy plugin
RUN xcaddy build \
  --with github.com/caddyserver/forwardproxy@caddy2=github.com/klzgrad/forwardproxy@naive \
  --output /usr/local/bin/caddy

FROM caddy:${CADDY_VERSION} AS production
LABEL org.opencontainers.image.source=https://github.com/mrzzy/hydra
COPY --from=build /usr/local/bin/caddy /usr/bin/caddy
# copy config
COPY ./Caddyfile /etc/caddy/Caddyfile

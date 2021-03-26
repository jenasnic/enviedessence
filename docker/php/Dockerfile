FROM composer:2 AS composer
FROM php:7.4-fpm AS php

# Add PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions gd intl pdo_mysql xdebug zip

# Set timezone
RUN echo 'Europe/Paris' > /etc/timezone

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /www

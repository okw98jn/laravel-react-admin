FROM php:8.1-fpm-alpine

# install composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# install php extensions
RUN docker-php-ext-install pdo pdo_mysql
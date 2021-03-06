SHELL = /bin/sh
USER_ID=$(shell id -u)
USER_GROUP=$(shell id -g)
DOCKER_ROOT=docker-compose run --rm
DOCKER_USER=docker-compose run --rm -u $(USER_ID):$(USER_GROUP)

DRUSH_BIN=php ./vendor/bin/drush
COMPOSER_BIN=php composer
YARN_BIN=node yarn

ifndef APP_ENV
	export APP_ENV:=dev
endif



##
## Commands
##---------------------------------------------------------------------------

.PHONY: install
install: vendor assets cache

.PHONY: vendor
vendor:
	$(DOCKER_USER) $(COMPOSER_BIN) install --prefer-dist --no-interaction

.PHONY: cache
cache:
	$(DOCKER_USER) $(DRUSH_BIN) cache:rebuild

.PHONY: import
import:
	$(DOCKER_USER) $(DRUSH_BIN) config:import

.PHONY: export
export:
	$(DOCKER_USER) $(DRUSH_BIN) config:export



##
## Assets
##---------------------------------------------------------------------------

.PHONY: assets
assets:
	$(DOCKER_USER) $(YARN_BIN) --cwd ./themes/enviedessence install
	$(DOCKER_USER) $(YARN_BIN) --cwd ./themes/enviedessence build

.PHONY: watch
watch:
	$(DOCKER_ROOT) $(YARN_BIN) --cwd ./themes/enviedessence start

.PHONY: build
build:
	$(DOCKER_USER) $(YARN_BIN) --cwd ./themes/enviedessence build

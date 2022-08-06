include .env

NAME = quizz-saas-backend
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))
DOCKER_FILE ?= docker-compose.yml

.PHONY: start dev_up

info:
	$(info CURRENT_BRANCH: $(CURRENT_BRANCH))
	$(info DOCKER_FILE: $(DOCKER_FILE))

dev_up:
	yarn start:dev

debug:
	yarn debug:dev

build:
	yarn postbuild:prod
	yarn build:prod

bootstrap:
	yarn

fork-kill-dev:
    lsof -t -i tcp:3000 | xargs kill

install:
	npm ci

render-build:
	npm install && npm run build

render-start:
	npm run start

start-backend:
	npx start-server

start-frontend:
	make -C slackchat start

start-deploy:
	make start-backend & make start-frontend

lint-slack:
	make -C slackchat lint-fix

start:
	npx start-server -s ./slackchat/build

build:
	npm run build
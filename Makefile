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

start:
	make start-backend & make start-frontend

build:
	npm run build
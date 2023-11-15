install:
	npm ci

render-build:
	make install && npm run build

render-start:
	npm run start

start-backend:
	npx start-server

start-frontend:
	make -C slack-project start

start:
	make start-backend & make start-frontend
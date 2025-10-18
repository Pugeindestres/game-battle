games:
	node bin/game.js;

game: games
play: games
run: games

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npx jest --coverage


help:
	@echo "Доступные команды:"
	@echo "  make games    - Запустить игру"
	@echo "  make lint     - Проверить код ESLint"
	@echo "  make lint-fix - Исправить ошибки ESLin"
	@echo "  make test     - Запускает тест игрового кода"
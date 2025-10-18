games:
	node bin/game.js;

game: games
play: games
run: games

lint:
	npm run lint

lint-fix:
	npm run lint:fix


help:
	@echo "Доступные команды:"
	@echo "  make games    - Запустить игру"
	@echo "  make lint     - Проверить код ESLint"
	@echo "  make lint-fix - Исправить ошибки ESLin
copy-env:
	@echo "Copying .env.testing to .env..."
	@cp .env.testing .env
	@echo "File .env.testing copied to .env successfully."

test: copy-env
	@echo "Installing dependencies..."
	@docker compose exec node npm cache clean --force
	@docker compose exec node npm install
	@echo "Running tests..."
	@docker compose exec node npm test
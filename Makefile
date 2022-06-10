

up-local: ## Start the prod server
	@bash ./scripts/up-site-local.sh

up-dev: ## Start the local server
	@bash ./scripts/up-site-dev.sh

up-prod: ## Start the prod server
	@bash ./scripts/up-site-prod.sh

build-dev: ## Start the local server
	@bash ./scripts/build-site-dev.sh

build-prod: ## Start the local server
	@bash ./scripts/build-site-prod.sh
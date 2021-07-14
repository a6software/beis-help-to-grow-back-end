APPS = src

down:
	docker compose down
.PHONY: down

install:
	npm ci
.PHONY: install

migrate-latest:
	docker compose exec node-app npm run db:migration:migrate:latest
.PHONY: migrate-latest

migrate-roll-back:
	docker compose exec node-app npm run db:migration:rollback
.PHONY: migrate-roll-back

seed-run:
	docker compose exec node-app npm run db:seed:run
.PHONY: seed-run

serve:
	docker compose \
				-p help_to_grow_vendor_www \
				down --remove-orphans && \
		docker compose up --remove-orphans
.PHONY: serve

uninstall:
	rm -Rf node_modules

	for dir in ${APPS}; do \
		(cd $${dir} && rm -Rf node_modules); \
  	done
.PHONY: uninstall

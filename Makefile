APPS = src

down:
	docker compose down
.PHONY: down

install:
	npm ci
.PHONY: install

serve:
	mkdir -p ./volumes/postgres-data && \
		docker compose up
.PHONY: serve

uninstall:
	rm -Rf node_modules

	for dir in ${APPS}; do \
		(cd $${dir} && rm -Rf node_modules); \
  	done
.PHONY: uninstall

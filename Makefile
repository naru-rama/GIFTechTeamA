up:
	docker compose up
init:
	chmod +x ./get-local-ip-addr.sh
	./get-local-ip-addr.sh
down:
	docker compose down
app:
	docker compose exec myapp bash
build:
	docker compose build

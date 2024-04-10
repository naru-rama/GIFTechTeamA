up:
	docker-compose up -d
	docker-compose exec myapp bash --login
init:
	chmod +x ./get-local-ip-addr.sh
	./get-local-ip-addr.sh
down:
	docker compose down
app:
	docker compose exec myapp bash
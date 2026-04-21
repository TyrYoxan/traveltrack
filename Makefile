.PHONY: help up down logs build rebuild clean migrate seed migrate-reset

help:
	@echo "TravelTrack Docker Commands"
	@echo "==========================="
	@echo "make up              - Démarrer tous les services"
	@echo "make down            - Arrêter tous les services"
	@echo "make logs            - Afficher les logs (tous les services)"
	@echo "make logs-backend    - Logs du backend uniquement"
	@echo "make logs-frontend   - Logs du frontend uniquement"
	@echo "make build           - Build les images"
	@echo "make rebuild         - Rebuild les images (sans cache)"
	@echo "make clean           - Arrêter et supprimer les volumes"
	@echo "make migrate         - Exécuter les migrations Prisma"
	@echo "make seed            - Seeder la DB"
	@echo "make migrate-reset   - Reset la DB (DANGER!)"
	@echo "make shell-db        - Accéder à psql dans le container"
	@echo "make shell-backend   - Accéder au shell du backend"

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

build:
	docker compose build

rebuild:
	docker compose build --no-cache

clean:
	docker compose down -v

migrate:
	docker compose exec backend npx prisma migrate deploy

seed:
	docker compose exec backend npx prisma db seed

migrate-reset:
	docker compose exec backend npx prisma migrate reset

shell-db:
	docker compose exec db psql -U traveltrack -d traveltrack

shell-backend:
	docker compose exec backend sh

.DEFAULT_GOAL := help

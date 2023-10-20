-- grouper les commandes à effectuer pour pouvoir avoir un rollback en cas d'erreur
BEGIN;

ALTER TABLE "user" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'member';

COMMIT;
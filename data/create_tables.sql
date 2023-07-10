-- SQLBook: Code
-- -----------------------------------------------------
-- Schemas oquiz
-- -----------------------------------------------------

-- Note 1 : par convention on va nommer toutes les tables au singulier, en minuscule et en anglais.

-- Note 2 : Chaque table contiendra un champs created_at contenant la date de création d'un enregistrement
-- et un champ updated_at contenant la date de mise à jour de cet enregistrement


BEGIN; 
-- Note : BEGIN déclare le début d'une transition : un groupe d'instructions SQL qui rend celles-ci dépendantes les unes des autres. 
-- Si au moins une des instructions génère une erreur, alors toutes les commandes sont invalidées.


-- Comme c'est un script de création de tables, on s'assure que celles-ci sont bien supprimées avant de les créer. 
-- On peut supprimer plusieurs tables en même temps
-- Note : attention à ne pas lancer ce script en production en revanche :wink:
DROP TABLE IF EXISTS "level",
"answer",
"user",
"quiz",
"question",
"tag",
"quiz_has_tag";

-- -----------------------------------------------------
-- Table "level"
-- -----------------------------------------------------
CREATE TABLE "level" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

/*
Notes :

  - id : 
    - La clé primaire est automatiquement NOT NULL. Pas besoin de le préciser.
    - On spécifie que la colonne sera générée automatiquement par la BDD en suivant une séquence numérique prédéfinie, s'incrémentant de 1 en 1.
    - On peut définir 'BY DEFAULT' (surcharge de la valeur possible) ou 'ALWAYS' (surcharge de la valeur impossible)
    - Ici on utilise BY DEFAULT, car on définit nous même les valeurs des clés primaires (dans le fichier de seeding).
    - Mais on utilisera plus généralement ALWAYS afin de sécurisé l'incrémentation des valeurs du champ

  - created_at 
    - CURRENT_TIMESTAMP : on peut aussi utiliser now()
*/


-- -----------------------------------------------------
-- Table "answer"
-- -----------------------------------------------------
CREATE TABLE "answer" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "question_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);
-- Note : On ne peut pas référencé le champ id de la table question ici, car la table n'existe pas encore. On fera une modification à la fin du script pour ajouter la référence.

-- -----------------------------------------------------
-- Table "app_user"
-- -----------------------------------------------------
CREATE TABLE "user" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "firstname" text NULL,
  "lastname" text NULL,
  "admin" boolean DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "quiz"
-- -----------------------------------------------------
CREATE TABLE "quiz" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NULL,
  "user_id" integer NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
CREATE TABLE "question" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "anecdote" text NULL,
  "wiki" text NULL,
  "level_id" integer NOT NULL REFERENCES "level"("id"),
  "answer_id" integer NOT NULL REFERENCES "answer"("id"), -- 'La BONNE réponse du quiz',
  "quiz_id" integer NOT NULL REFERENCES "quiz"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "tag"
-- -----------------------------------------------------
CREATE TABLE "tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "quiz_has_tag"
-- -----------------------------------------------------
CREATE TABLE "quiz_has_tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "quiz_id" integer NOT NULL REFERENCES "quiz"("id"),
  "tag_id" integer NOT NULL REFERENCES "tag"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz,
  UNIQUE ("quiz_id", "tag_id")
);
-- UNIQUE créé une contrainte sur le coupe quiz_id/tag_id qui doit alors être unique au sein de la BDD. 



-- Maintenant, on peut créer la référence vers la table 'question' pour le champ "question_id" dans la table "answer" afin de réprésenter notre clé étrangère.
-- On remarquera ici la présence de l'instruction FOREIGN KEY qui dit explicitement que cette colonne sert de clé étrangère faisant référence à la colonne id de la table question
-- Autrement, lors de la création d'une table avec le mot clef "REFERENCES", cette opération est implicite.
ALTER TABLE "answer" ADD FOREIGN KEY ("question_id") REFERENCES "question"("id");


COMMIT; -- Pour mettre fin à au bloc de transaction et l'exécuter

/*Здесь создается вся струткура базы данных для хранения пользователей, ролей, вообще всех данных
*/

--CREATE DATABASE mynestdatabase;

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "hash" TEXT NOT NULL
);

CREATE TABLE "profile" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL UNIQUE,
    "userId" INTEGER REFERENCES "user"("id")
);

CREATE TABLE "role" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "user_roles_role" (
    "userId" INTEGER REFERENCES "user"("id"),
    "roleId" INTEGER REFERENCES "role"("id")
);

CREATE TABLE "text_block" (
    "id" SERIAL PRIMARY KEY,
    "uniqName" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "imageName" TEXT,
    "text" TEXT,
    "group" TEXT
);

CREATE TABLE "file" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMPTZ,
    "essenceTable" TEXT,
    "essenceId" INTEGER
)
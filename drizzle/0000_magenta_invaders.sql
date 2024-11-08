CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"mobile_number" varchar(11) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"meters" jsonb,
	CONSTRAINT "users_mobile_number_unique" UNIQUE("mobile_number")
);

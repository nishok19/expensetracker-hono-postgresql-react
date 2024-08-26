ALTER TABLE "expenses" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN IF EXISTS "date";
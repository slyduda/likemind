CREATE TABLE IF NOT EXISTS "activity_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importance" smallint NOT NULL,
	"activity_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activity_review_activity_id_user_id_unique" UNIQUE("activity_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "activity_tag" DROP CONSTRAINT "activity_tag_activity_id_entity_id_pk";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_review" ADD CONSTRAINT "activity_review_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_review" ADD CONSTRAINT "activity_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_id_unique" UNIQUE("id");
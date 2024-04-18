ALTER TABLE "activity_tag" RENAME COLUMN "entity_id" TO "tag_name";--> statement-breakpoint
ALTER TABLE "activity_tag" DROP CONSTRAINT "activity_tag_entity_id_tag_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_tag" ALTER COLUMN "tag_name" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_tag_name_tag_name_fk" FOREIGN KEY ("tag_name") REFERENCES "tag"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "activity_tag" DROP CONSTRAINT key_id;
--> statement-breakpoint
ALTER TABLE "activity_tag" ADD CONSTRAINT key_id PRIMARY KEY(activity_id,tag_name);
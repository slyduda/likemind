CREATE TABLE IF NOT EXISTS "involvement_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"involvement_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "involvement" DROP COLUMN IF EXISTS "source";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvement_evidence" ADD CONSTRAINT "involvement_evidence_involvement_id_involvement_id_fk" FOREIGN KEY ("involvement_id") REFERENCES "involvement"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvement_evidence" ADD CONSTRAINT "involvement_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "evidence"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

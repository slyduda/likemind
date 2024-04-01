CREATE TABLE IF NOT EXISTS "activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"started_at" date NOT NULL,
	"ended_at" date,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"activity_id" uuid NOT NULL,
	"entity_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_tag" (
	"id" uuid DEFAULT gen_random_uuid(),
	"activity_id" uuid NOT NULL,
	"entity_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "activity_tag_activity_id_entity_id_pk" PRIMARY KEY("activity_id","entity_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community_subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "community_subscription_user_id_community_id_unique" UNIQUE("user_id","community_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"description" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "involvement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"description" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "involvement_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"involvement_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "involvement_review_involvement_id_user_id_unique" UNIQUE("involvement_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationship_arc" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"relationship_id" uuid NOT NULL,
	"start_entity_id" uuid NOT NULL,
	"end_entity_id" uuid NOT NULL,
	"type" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationship_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"relationship_id" uuid NOT NULL,
	"entity_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationship_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"relationship_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "relationship_review_relationship_id_user_id_unique" UNIQUE("relationship_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "tag_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"handle" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_evidence" ADD CONSTRAINT "activity_evidence_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_evidence" ADD CONSTRAINT "activity_evidence_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "entity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_entity_id_tag_id_fk" FOREIGN KEY ("entity_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community_subscription" ADD CONSTRAINT "community_subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community_subscription" ADD CONSTRAINT "community_subscription_community_id_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvement_review" ADD CONSTRAINT "involvement_review_involvement_id_involvement_id_fk" FOREIGN KEY ("involvement_id") REFERENCES "involvement"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvement_review" ADD CONSTRAINT "involvement_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_start_entity_id_entity_id_fk" FOREIGN KEY ("start_entity_id") REFERENCES "entity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_end_entity_id_entity_id_fk" FOREIGN KEY ("end_entity_id") REFERENCES "entity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_evidence" ADD CONSTRAINT "relationship_evidence_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_evidence" ADD CONSTRAINT "relationship_evidence_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "entity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_review" ADD CONSTRAINT "relationship_review_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationship_review" ADD CONSTRAINT "relationship_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

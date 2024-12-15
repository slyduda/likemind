CREATE TABLE "activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activity_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"activity_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activity_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importance" smallint NOT NULL,
	"activity_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "activity_review_activity_id_user_id_unique" UNIQUE("activity_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "activity_tag" (
	"id" uuid DEFAULT gen_random_uuid(),
	"activity_id" uuid NOT NULL,
	"tag_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "key_id" PRIMARY KEY("activity_id","tag_name"),
	CONSTRAINT "activity_tag_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "community" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "membership" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "membership_user_id_community_id_unique" UNIQUE("user_id","community_id")
);
--> statement-breakpoint
CREATE TABLE "involvement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"activity_id" uuid NOT NULL,
	"entity_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "involvement_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sentiment" smallint NOT NULL,
	"impact" smallint NOT NULL,
	"involvement_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "involvement_review_involvement_id_user_id_unique" UNIQUE("involvement_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "involvement_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"involvement_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relationship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relationship_arc" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"relationship_id" uuid NOT NULL,
	"start_entity_id" uuid NOT NULL,
	"end_entity_id" uuid NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relationship_evidence" (
	"id" uuid DEFAULT gen_random_uuid(),
	"relationship_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relationship_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"significance" smallint NOT NULL,
	"relationship_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "relationship_review_relationship_id_user_id_unique" UNIQUE("relationship_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "tag_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"handle" text NOT NULL,
	"native_sub" uuid,
	"supabase_sub" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"is_locked" boolean DEFAULT false NOT NULL,
	"is_fake" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_native_sub_unique" UNIQUE("native_sub"),
	CONSTRAINT "user_supabase_sub_unique" UNIQUE("supabase_sub")
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_evidence" ADD CONSTRAINT "activity_evidence_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_evidence" ADD CONSTRAINT "activity_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_review" ADD CONSTRAINT "activity_review_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_review" ADD CONSTRAINT "activity_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_tag" ADD CONSTRAINT "activity_tag_tag_name_tag_name_fk" FOREIGN KEY ("tag_name") REFERENCES "public"."tag"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_community_id_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."community"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement" ADD CONSTRAINT "involvement_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement" ADD CONSTRAINT "involvement_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement_review" ADD CONSTRAINT "involvement_review_involvement_id_involvement_id_fk" FOREIGN KEY ("involvement_id") REFERENCES "public"."involvement"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement_review" ADD CONSTRAINT "involvement_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement_evidence" ADD CONSTRAINT "involvement_evidence_involvement_id_involvement_id_fk" FOREIGN KEY ("involvement_id") REFERENCES "public"."involvement"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involvement_evidence" ADD CONSTRAINT "involvement_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "public"."relationship"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_start_entity_id_entity_id_fk" FOREIGN KEY ("start_entity_id") REFERENCES "public"."entity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_arc" ADD CONSTRAINT "relationship_arc_end_entity_id_entity_id_fk" FOREIGN KEY ("end_entity_id") REFERENCES "public"."entity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_evidence" ADD CONSTRAINT "relationship_evidence_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "public"."relationship"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_evidence" ADD CONSTRAINT "relationship_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_review" ADD CONSTRAINT "relationship_review_relationship_id_relationship_id_fk" FOREIGN KEY ("relationship_id") REFERENCES "public"."relationship"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship_review" ADD CONSTRAINT "relationship_review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_native_sub_subject_id_fk" FOREIGN KEY ("native_sub") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;
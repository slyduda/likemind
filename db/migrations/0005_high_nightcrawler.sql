ALTER TABLE "activity" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_evidence" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_review" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_tag" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "community" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "entity" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "membership" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "involvement" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "involvement_review" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "relationship" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "relationship_arc" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "relationship_evidence" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "relationship_review" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_locked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_fake" boolean DEFAULT false NOT NULL;
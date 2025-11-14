CREATE TABLE `boxes` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`content` text,
	`password` text,
	`is_protected` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `boxes_slug_unique` ON `boxes` (`slug`);--> statement-breakpoint
CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`box_id` text NOT NULL,
	`name` text NOT NULL,
	`original_name` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`path` text NOT NULL,
	`uploaded_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`box_id`) REFERENCES `boxes`(`id`) ON UPDATE no action ON DELETE cascade
);

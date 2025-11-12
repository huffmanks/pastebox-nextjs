## Client

1. Validate password on view.
2. [pastebox view](<app/(home)/[slug]/page.tsx>)
   - [ ] Show expired time left.
3. Rich text editor
   - [ ] Fix speech to text error.
   - [ ] Copying rich text fails on mobile.
   - [ ] Creating a link on mobile is buggy.
4. Results page
   - [ ] Share button doesn't work on mobile.

## Server

1. Hash password.
2. Refactor some apis to actions.
3. Cron job to remove expired boxes.
4. Check expiration before returning box.

## Docker

1. Refactor to remove drizzle-kit, db and migrations bloat.
   - Remove/refactor:
     - [COPY --from=builder /app/.next/standalone/db ./db](./Dockerfile#L40)
     - [COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts](./Dockerfile#L44)
     - [CMD ["sh", "-c", "npx drizzle-kit migrate && node server.js"]](./Dockerfile#L57)
     - [Only refs to drizzle-kit](./next.config.ts)

## Client

1. Validate password on view.
2. [pastebox view](<app/(home)/[slug]/page.tsx>)
   - [ ] Show expired time left.
3. Rich text editor
   - [ ] Fix speech to text error.
   - [ ] Copying rich text fails on mobile.
   - [ ] Creating a link on mobile is buggy.

## Server

1. Hash password.
2. Refactor some apis to actions.
3. Cron job to remove expired boxes.
4. Check expiration before returning box.

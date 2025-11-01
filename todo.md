Client side

1. Validate password on view.
2. [pastebox view](<app/(home)/[slug]/page.tsx>)
   1. delete box and all files.
   2. Show expired time left.

Server side

1. hash password.
2. Fix api/download/route.ts
3. make uploaded assets serveable filePath: '/app/uploads/abd5ba16-1.....ext'

Docker

1. Move db migration out of image and have it run once in compose.

# Docs:

1. Initialise an empty turbo repo.
2. Delete the docs folder from apps.
3. Add http server and ws-backend folders.
4. Initialize a package.json in both the folders.
5. Add `tsconfig.json` in both the folders and using `extends` import `base.json` from `@repo/typescript-config`.
6. Do a global `pnpm i ` to add the base.json as a dependency.
7. Add a build, start, dev script in both the folders.
8. Update the turbo-config in both the projects.
9. Initialise a http and ws server.
10. Create an express server, add signup, signin and create room.
11. Create Middleware, gate the create room point.
12. Gate the web socket server using the token.
13. Create a DB package.
14. Using the db package in the http layer.
15. Add a common package where we can add the zod schema and the JWT_SECRET.  

```
HomeWork: Step 13 and 14
```
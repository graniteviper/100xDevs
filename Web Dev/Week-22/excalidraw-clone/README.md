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
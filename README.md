# fantas-aguas · Pasapalabra

- `/` — player screen (project on the TV)
- `/admin` — host console: start game, correct / wrong / pasapalabra, create & edit roscos

## Dev
```
npm i
npx convex dev   # backend, writes .env.local
npm run dev      # vite
```

## Deploy
- Backend: `npx convex deploy` (pushes `convex/` to prod)
- Frontend: push to `main` → Vercel builds with `VITE_CONVEX_URL` pointing at the prod deployment.

To have Vercel deploy the backend too: create a production deploy key in the Convex dashboard, set it as `CONVEX_DEPLOY_KEY` in Vercel, and change the build command to `npx convex deploy --cmd 'npm run build'`.

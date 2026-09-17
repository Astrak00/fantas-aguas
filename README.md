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
Vercel builds with `npx convex deploy --cmd 'npm run build'`; set `CONVEX_DEPLOY_KEY` (production deploy key from the Convex dashboard) in Vercel env vars.

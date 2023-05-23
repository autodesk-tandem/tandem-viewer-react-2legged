# Tandem Viewer example for React
## Prerequisites
- APS credentials
- Service account added to your facility
- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)

## Development environment
1. Open **server** project.
2. Setup APS credentials (FORGE_CLIENT_ID, FORGE_CLIENT_SECRET).
3. Start server. The server runs on port 5000.
4. Open **client** project.
5. Replace facility URN in *App.tsx* inside *onLoadClick* function.
6. Start client using `npm run dev`.

## Notes
- The sample is accessing Tandem using proxy (http://localhost:3000/viewer) which is served through Vite (see *vite.config.ts*).
- The viewer initialization is using similar approach to Forge viewer (see *main.tsx*).

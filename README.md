# Tandem Viewer example for React
## Prerequisites
- [APS credentials](https://aps.autodesk.com/myapps/).
- Service account added to your facility. This allows using 2-legged authentication to access facility.
- [Node.js](https://nodejs.org/).
- [Vite](https://vitejs.dev/).

## Development environment
1. Open **server** project.
2. Setup APS credentials using environment variables (FORGE_CLIENT_ID, FORGE_CLIENT_SECRET).
3. Start server. The server runs on port 5000.
4. Open **client** project.
5. Replace facility URN in *App.tsx* inside *onLoadClick* function.
6. Start client using `npm run dev`. The client runs on port 3000. Server calls are automatically routed to `http://localhost:5000` (see *vite.config.ts* for proxy settings).

## Notes
- The sample is accessing Tandem using proxy (http://localhost:3000/viewer) which is served through Vite (see *vite.config.ts*).
- The viewer initialization is using similar approach to Forge viewer (see *main.tsx*).

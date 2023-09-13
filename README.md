# Tandem Viewer example for React (2-legged)

## Overview
This sample provides example of using Tandem Viewer in React application. It covers following concepts:
- Using 2-legged authentication
- How to wrap Tandem Viewer by React component
- How to get list of facilities for user
- How to display default view of facility

## Prerequisites
- [APS credentials](https://aps.autodesk.com/myapps/).
- Service account added to your facility or account. This allows using 2-legged authentication to access facility.
- [Node.js](https://nodejs.org/).
- [Vite](https://vitejs.dev/).

## Development mode
This is assuming you're using VS Code as your development editor. It's possible to use another environment but steps below may differ.

Follow these steps to run application locally:
1. Run `git clone` to clone repository. The repo has two sub folders:
   * `server`
   * `client` 
2. Start VS Code and open `server` folder.
3. Run `npm install`.
4. Update `.env` file with your details.
5. Run server under debugger (Run - Start Debugging or F5).
6. Open new VS Code window (File - New Window).
7. Open `client` folder.
8. Run `npm install`.
9. Open terminal and run `npm run dev`.
10. Open your browser and navigate to http://localhost:3000

## How it works
### Server
The server is simple Node.js server which exposes following end points:
- `/api/auth/token` - provides valid token to the client. Then token is used by viewer to display facility.

### Client
1. When the application is loaded it intialized viewer component.
2. This trigger `onAppInitialized` callback. From within the callback the drop down is populated by available facilities.
3. When user selects facility it's passed to `Viewer` component. The facility is loaded and default view is set as active.

**Note** If you're looking for 3-legged example you can find it [here](https://github.com/autodesk-tandem/tandem-viewer-react-3legged).

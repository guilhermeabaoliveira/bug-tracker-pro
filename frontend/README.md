# Bug Tracker Pro — Frontend

React dashboard for listing, creating, and deleting issues through the FastAPI backend.

## Local development

From this directory, install dependencies and start Vite:

```sh
npm ci
npm run dev -- --port 5173 --strictPort
```

Node.js must be compatible with Vite 7 (20.19+ or 22.12+). Open [localhost:5173](http://localhost:5173). Start the backend separately using the [repository setup](../README.md#run-locally).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Generate the frontend bundle in `dist/` |
| `npm run preview` | Preview the generated bundle locally |
| `npm run lint` | Run the configured ESLint checks |

The API address is defined in `src/App.jsx` as `http://localhost:8000/bugs`. The backend CORS configuration accepts `http://localhost:5173`. A preview on another port requires a compatible backend CORS configuration; the preview command does not start the API.

## Interface behavior

- Fetches issues when the dashboard mounts and after a successful create or delete request.
- Creates issues using a title and one of four severity options.
- Requests browser confirmation before deletion.
- Counts `High` and `Critical` records together in **Critical Bugs**.
- Displays **System Status** as a fixed label rather than a service health check.

Severity editing is exposed by the backend API but has no control in this interface. The dashboard uses HTTP requests rather than a real-time subscription.

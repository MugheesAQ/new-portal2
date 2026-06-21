# Citizen Portal - Digital Innovation Center

## Product Summary
The Citizen Portal is a modern, full-stack conceptual application designed for the Government of Khyber Pakhtunkhwa to bridge the gap between citizens reporting administrative issues and the officials managing them. It features two distinct role-based experiences: a "Citizen" interface for submitting requests, tracking statuses, and visualizing history patterns, and an "Officer" interface for managing requests, tracking live citizen system usage, and monitoring system telemetry. The application ensures an efficient, transparent, and responsive administrative workflow with a pristine, high-contrast, official design.

## Architecture & Inner Workings
The application leverages a modular Single Page Application (SPA) architecture utilizing **React 18** and **Vite**, with a heavy emphasis on client-side state predictability and component isolation. 
- **State Engine**: Currently relies on React hooks (`useState`, `useEffect`) and property drilling to manage application state such as active sessions, complaints, and navigation routers in a mock-offline environment.
- **Visual Layer**: Designed using **Tailwind CSS**, strictly adhering to utilitarian functional colors, precise sizing, and responsive grid layouts. The charts are powered by `recharts`, visualizing timeline dynamics seamlessly.
- **Routing**: Employs an internal view-state router mapping explicit string tokens (e.g. `dashboard`, `citizen-tracker`) to conditional component renders, guaranteeing fast rendering without heavy browser history management overlays.

## Containerization & Deployment
I have authored an official `Dockerfile` and `.dockerignore` for production-grade deployments. 
- **Actual Frontend Container**: A multi-stage Docker build is configured. It uses `node:18-alpine` to cleanly build the Vite application and bundles it securely into an `nginx:alpine` image serving the compiled static assets over port `80`.
- **Backend Mock Infrastructure**: The `SystemStatus.tsx` visualizes an ecosystem where requests from the frontend would hit a Node (`desc-api-gateway`), routed through a Go authentication mesh (`desc-auth-service`), backed by `postgres:15` and a `redis:7` caching layer.

## Security Details
1. **Isolated Role Gateways**: Citizens and Officers are separated structurally starting from the `Login.tsx` view.
2. **Session Monitoring**: The implementation features an active user tracking layer (`CitizenTracker.tsx`) mapping telemetry inputs such as `SESSION_ID` and component routes locally to ensure auditable tracks.
3. **Restricted Views**: Components explicitly deny access internally by comparing strict `user.role` constraints inside the core rendering loop (`App.tsx`).

## File Directory Map
| File Path | Role Scope | Component Explanation |
|-----------|-----------|-----------------------|
| `/src/App.tsx` | **Core** | Main application controller managing global user states, routing flags, and the main data arrays. |
| `/src/types.ts` | **Global** | Shared Typescript interfaces defining entity schemas like `User`, `Complaint`, and strict status enums. |
| `/src/main.tsx` | **Core** | Initialization layer bootstrapping the React DOM inside standard strict modes. |
| `/src/components/Login.tsx` | **Auth** | Unified authentication UI implementing robust input fields for CNICs and Official Emails. |
| `/src/components/Dashboard.tsx` | Citizen | Primary landing view for citizens featuring historical request comparisons using `recharts` and recent cases. |
| `/src/components/SubmitComplaint.tsx` | Citizen | Structured form input module for gathering complaint metadata, types, and descriptions securely. |
| `/src/components/Tracking.tsx` | Citizen | Real-time status list mapping the lifecycle of each submitted complaint (e.g. `NEW`, `IN_PROGRESS`). |
| `/src/components/OfficerCases.tsx` | Officer | Management panel permitting officials to search cases, review details, issue comments, and change resolution statuses. |
| `/src/components/SystemStatus.tsx` | Officer | Infrastructure telemetry board displaying active container vitals, memory layouts, and server synchronizations. |
| `/src/components/CitizenTracker.tsx` | Officer | Security auditing tool letting officers search for active citizens and monitor their real-time application routes. |
| `/src/components/Profile.tsx` | **Shared** | General user identity panel incorporating a local offline avatar uploader capability. |
| `/src/components/Sidebar.tsx` | **Shared** | Persistent structural element controlling application routing depending on the logged-in user profile. |
| `/src/components/Header.tsx` | **Shared** | Global top branding bar rendering dynamic identity banners representing the current portal. |

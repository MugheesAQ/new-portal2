# DESC Citizen Portal - Repository Structure

The GitOps compliant monorepo structure (or multi-repo equivalent logical structure) isolates infrastructure definition, cluster management, frontend, and independent microservice business contexts.

```text
desc-citizen-portal/
├── .github/
│   └── workflows/          # CI/CD Pipelines (Build, Test, Security, Push)
├── docs/                   # Architecture, ERDs, and Playbooks
├── infrastructure/
│   ├── terraform/          # AWS IaC (VPC, EKS, NodeGroups, RDS, ECR, S3)
│   └── ansible/            # Config Management & OS Hardening
├── kubernetes/
│   ├── base/               # Kustomize base manifests
│   ├── overlays/           # Env overlays (dev, staging, prod)
│   └── argocd/             # GitOps definitions (AppProjects, Apps)
├── backend/
│   ├── api-gateway/        # Edge Routing & Rate Limiting (Spring Cloud Gateway)
│   ├── auth-service/       # JWT Auth & Identity Provider (Spring Security)
│   ├── citizen-service/    # Resident Profiles & Verification Context
│   ├── complaint-service/  # Ticketing, Tracking & Routing Context
│   ├── forms-service/      # Dynamic PDF & Schema Form Builder
│   ├── notification-svc/   # Async Comms (SMS, Email, Push)
│   ├── document-service/   # Secure S3 Uploads & Virus Scan APIs
│   └── admin-service/      # Operator Dashboards & Audit Views
└── frontend/
    └── portal-ui/          # Citizen React SPA (Typescript, Redux, Tailwind)
        ├── public/
        └── src/
            ├── components/ # Reusable UI components
            ├── pages/      # Route-level views
            ├── store/      # Redux Root & Slices
            └── utils/      # Security guards, Axios interceptors
```

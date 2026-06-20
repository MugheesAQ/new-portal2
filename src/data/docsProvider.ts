export const docsList = [
  {
    id: "01-Solution-Architecture.md",
    title: "Solution Architecture",
    content: `# DESC Citizen Portal - Solution Architecture

## Executive Summary
The DESC Citizen Portal is a cloud-native, microservices-based application designed for the Digital Innovation Center (Mardan, KPK). It transitions the legacy monolith into a scalable, secure, and highly available enterprise platform.

## Core Technology Stack
- **Frontend Layer:** React 19, TypeScript, Material UI / Tailwind CSS, Redux Toolkit
- **API Gateway:** Spring Cloud Gateway (Java 21)
- **Microservices Layer:** Spring Boot 3.x (Auth, Citizen, Complaint, Forms, Notification, Document, Admin)
- **Data Layer:** PostgreSQL (AWS RDS Multi-AZ)
- **Caching Layer:** Redis (Amazon ElastiCache)
- **Infrastructure:** AWS EKS, S3, WAF, Secrets Manager
- **CI/CD Pipeline:** GitHub Actions, ArgoCD (GitOps Workflow)

## Security & Compliance Model
- **Authentication:** JWT-based Stateless Authentication with short-lived tokens and refresh rotation.
- **Network Security:** TLS 1.3 everywhere, AWS WAF for Layer 7 DDoS and OWASP Top 10 mitigation.
- **Cluster Policy:** OPA Gatekeeper for Kubernetes compliance enforcement.
- **Role-Based Access Control (RBAC):** Hierarchical model securing views and operations for Citizens, Officers, Managers, and Admins.
- **Data Protection:** Encryption at rest (KMS) and in transit, complete audit trailing for all state variations.

## Migration Strategy
The modernization roadmap implements the Strangler Fig pattern. Component capabilities are gradually moved to the managed microservice grid (AWS EKS) ensuring zero-downtime deployment for public consumers.`
  },
  {
    id: "02-Folder-Structure.md",
    title: "Folder Structure",
    content: `# DESC Citizen Portal - Repository Structure

The GitOps compliant monorepo structure (or multi-repo equivalent logical structure) isolates infrastructure definition, cluster management, frontend, and independent microservice business contexts.

\`\`\`text
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
\`\`\``
  },
  {
    id: "03-AWS-Architecture.md",
    title: "AWS Architecture",
    content: `# AWS Architecture Diagram

The AWS infrastructure follows highly-available multi-AZ deployment strategies for Government workloads.

\`\`\`mermaid
graph TD
    Internet((Internet Client)) --> Route53[Amazon Route 53 DNS]
    Route53 --> WAF[AWS WAF & Shield]
    WAF --> ALB[Application Load Balancer]
    ALB --> EKS[Amazon EKS Cluster]

    subgraph "AWS Cloud (VPC)"
        EKS --> APIGW[Spring Cloud Gateway Pods]
        APIGW --> Services[Microservices Fleet]

        Services --> Secrets[AWS Secrets Manager]

        subgraph "Data & Persistence Layer"
            Services --> RDS[(Amazon RDS PostgreSQL Multi-AZ)]
            Services --> Redis[(Amazon ElastiCache Redis)]
            Services --> S3[Amazon S3 Secure Object Storage]
        end
    end
\`\`\``
  },
  {
    id: "04-Kubernetes-Architecture.md",
    title: "Kubernetes Architecture",
    content: `# Kubernetes Architecture (EKS)

The Kubernetes layer demonstrates traffic ingress, service meshes, zero-trust configuration, and horizontal scaling metrics inside the cluster.

\`\`\`mermaid
graph TD
    ALB[AWS ALB Ingress Controller] --> Ingress[K8s NGINX/ALB Ingress Resource]
    Ingress --> GW_SVC[Service: API Gateway]

    GW_SVC --> GW_POD[Pod: API Gateway]

    GW_POD --> AUTH_SVC[Service: Auth]
    GW_POD --> CITZ_SVC[Service: Citizen]
    GW_POD --> COMP_SVC[Service: Complaint]
    GW_POD --> OTH_SVC[Service: Other MS]

    AUTH_SVC --> AUTH_POD[Pods: Auth Service + HPA]
    CITZ_SVC --> CITZ_POD[Pods: Citizen Service + HPA]
    COMP_SVC --> COMP_POD[Pods: Complaint Service + HPA]

    subgraph "Kubernetes Namespaces (production)"
        AUTH_POD -.-> SECRETS[External Secrets Operator]
        COMP_POD -.-> CONFIG[Environment ConfigMaps]
    end
\`\`\``
  },
  {
    id: "05-Database-ERD.md",
    title: "Database ERD",
    content: `# Database Entity Relationship Diagram (ERD)

The conceptual entity map showcases how bounded contexts interact within the shared PostgreSQL cluster (or database-per-service paradigm).

\`\`\`mermaid
erDiagram
    USER {
        uuid id PK
        string username
        string password_hash
        string email
        boolean mfa_enabled
        datetime last_login
    }

    ROLE {
        int id PK
        string name
    }

    CITIZEN_PROFILE {
        uuid id PK
        uuid user_id FK
        string cnic
        string first_name
        string last_name
        string mobile_number
        string address
        boolean is_verified
    }

    COMPLAINT {
        uuid id PK
        uuid citizen_id FK
        string category
        string headline
        text description
        string status
        uuid assigned_officer_id FK
        datetime created_at
        datetime resolved_at
    }

    DOCUMENT {
        uuid id PK
        uuid owner_id FK
        uuid complaint_id FK
        string s3_path
        string file_type
        float file_size_mb
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string ip_address
        datetime timestamp
    }

    USER ||--|{ ROLE : "assigned"
    USER ||--|| CITIZEN_PROFILE : "has"
    CITIZEN_PROFILE ||--|{ COMPLAINT : "raises"
    COMPLAINT ||--|{ DOCUMENT : "contains"
    USER ||--|{ DOCUMENT : "uploads"
    USER ||--|{ AUDIT_LOG : "generates"
\`\`\``
  }
];

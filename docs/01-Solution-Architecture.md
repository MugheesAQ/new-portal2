# DESC Citizen Portal - Solution Architecture

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
The modernization roadmap implements the Strangler Fig pattern. Component capabilities are gradually moved to the managed microservice grid (AWS EKS) ensuring zero-downtime deployment for public consumers.

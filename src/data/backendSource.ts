export type FileNode = {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
};

export const backendSourceCode: FileNode[] = [
  {
    name: 'backend',
    type: 'folder',
    children: [
      {
        name: 'api-gateway',
        type: 'folder',
        children: [
          { name: 'pom.xml', type: 'file', language: 'xml', content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
    </parent>
    <groupId>pk.gov.kpk.desc</groupId>
    <artifactId>api-gateway</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>
</project>` },
          { name: 'src', type: 'folder', children: [
            { name: 'main', type: 'folder', children: [
              { name: 'java', type: 'folder', children: [
                 { name: 'pk/gov/kpk/desc/gateway', type: 'folder', children: [
                    { name: 'GatewayApplication.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}` }
                 ]}
              ]},
              { name: 'resources', type: 'folder', children: [
                { name: 'application.yml', type: 'file', language: 'yaml', content: `server:
  port: 8080
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: auth-service
          uri: lb://auth-service
          predicates:
            - Path=/api/v1/auth/**
        - id: citizen-service
          uri: lb://citizen-service
          predicates:
            - Path=/api/v1/citizens/**` }
              ]}
            ]}
          ]}
        ]
      },
      {
        name: 'auth-service',
        type: 'folder',
        children: [
          { name: 'pom.xml', type: 'file', language: 'xml', content: `<!-- Standard Spring Boot + Spring Security JWT + Data JPA POM -->`},
          { name: 'src', type: 'folder', children: [
             { name: 'main', type: 'folder', children: [
                { name: 'java', type: 'folder', children: [
                  { name: 'pk/gov/kpk/desc/auth', type: 'folder', children: [
                    { name: 'security', type: 'folder', children: [
                       { name: 'JwtUtil.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("\${jwt.secret}")
    private String secret;

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }
}` }
                    ]},
                    { name: 'controller', type: 'folder', children: [
                       { name: 'AuthController.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pk.gov.kpk.desc.auth.security.JwtUtil;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
    private final JwtUtil jwtUtil;
    
    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        // Implementation for authentication
        String token = jwtUtil.generateToken(request.getUsername(), "ROLE_CITIZEN");
        return ResponseEntity.ok(token);
    }
}` }
                    ]}
                  ]}
                ]}
             ]}
          ]}
        ]
      },
      {
        name: 'complaint-service',
        type: 'folder',
        children: [
          { name: 'src', type: 'folder', children: [
            { name: 'main', type: 'folder', children: [
              { name: 'java/pk/gov/kpk/desc/complaint', type: 'folder', children: [
                { name: 'model', type: 'folder', children: [
                  { name: 'Complaint.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.complaint.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "citizen_id")
    private UUID citizenId;
    
    private String category;
    private String headline;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}` }
                ]},
                { name: 'repository', type: 'folder', children: [
                   { name: 'ComplaintRepository.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.complaint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.gov.kpk.desc.complaint.model.Complaint;
import java.util.UUID;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
}` }
                ]},
                { name: 'service', type: 'folder', children: [
                   { name: 'ComplaintService.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.complaint.service;

import org.springframework.stereotype.Service;
import pk.gov.kpk.desc.complaint.model.Complaint;
import pk.gov.kpk.desc.complaint.repository.ComplaintRepository;

@Service
public class ComplaintService {
    private final ComplaintRepository repository;
    
    public ComplaintService(ComplaintRepository repository) {
        this.repository = repository;
    }
    
    public Complaint createComplaint(Complaint complaint) {
        complaint.setStatus("NEW");
        return repository.save(complaint);
    }
}` }
                ]}
              ]}
            ]}
          ]}
        ]
      }
    ]
  },
  {
    name: 'kubernetes',
    type: 'folder',
    children: [
      {
        name: 'base',
        type: 'folder',
        children: [
          { name: 'deployment.yaml', type: 'file', language: 'yaml', content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  labels:
    app: api-gateway
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-gateway
        image: desc-registry.azurecr.io/api-gateway:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: 500m
            memory: 1Gi
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10` },
          { name: 'service.yaml', type: 'file', language: 'yaml', content: `apiVersion: v1
kind: Service
metadata:
  name: api-gateway
spec:
  selector:
    app: api-gateway
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP` },
          { name: 'ingress.yaml', type: 'file', language: 'yaml', content: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: desc-portal-ingress
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  rules:
    - host: portal.desc.kpk.gov.pk
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-gateway
                port:
                  number: 80` }
        ]
      },
      {
        name: 'argocd',
        type: 'folder',
        children: [
          { name: 'application.yaml', type: 'file', language: 'yaml', content: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: desc-citizen-portal
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/desc-kpk/citizen-portal-gitops.git'
    targetRevision: HEAD
    path: kubernetes/overlays/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true` }
        ]
      }
    ]
  },
  {
    name: 'terraform',
    type: 'folder',
    children: [
      { name: 'main.tf', type: 'file', language: 'hcl', content: `provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "desc-portal-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false
  one_nat_gateway_per_az = true

  tags = {
    Environment = "production"
    Project     = "desc-citizen-portal"
  }
}` },
      { name: 'eks.tf', type: 'file', language: 'hcl', content: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "desc-portal-cluster"
  cluster_version = "1.28"

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  control_plane_subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      desired_size = 3
      min_size     = 3
      max_size     = 10

      instance_types = ["m5.large"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = "production"
  }
}` },
      { name: 'rds.tf', type: 'file', language: 'hcl', content: `module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "desc-portal-db"

  engine               = "postgres"
  engine_version       = "15.4"
  family               = "postgres15"
  major_engine_version = "15"
  instance_class       = "db.t4g.large"

  allocated_storage     = 100
  max_allocated_storage = 500

  db_name  = "desc_portal"
  username = "desc_admin"
  port     = 5432

  multi_az               = true
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [module.security_group.security_group_id]

  maintenance_window      = "Mon:00:00-Mon:03:00"
  backup_window           = "03:00-06:00"
  backup_retention_period = 14
}` }
    ]
  },
  {
    name: '.github',
    type: 'folder',
    children: [
      {
        name: 'workflows',
        type: 'folder',
        children: [
          { name: 'ci-cd.yaml', type: 'file', language: 'yaml', content: `name: DESC Portal CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [api-gateway, auth-service, citizen-service, complaint-service]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 21
      uses: actions/setup-java@v3
      with:
        java-version: '21'
        distribution: 'temurin'
        cache: maven
        
    - name: Build with Maven
      run: mvn -B package --file backend/\${{ matrix.service }}/pom.xml
      
    - name: SonarQube Scan
      run: mvn -B verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar -Dsonar.projectKey=\${{ matrix.service }}
      env:
        SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
        
    - name: Build Docker Image
      run: docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}/\${{ matrix.service }}:\${{ github.sha }} backend/\${{ matrix.service }}
      
    - name: Trivy Vulnerability Scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: '\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}/\${{ matrix.service }}:\${{ github.sha }}'
        format: 'table'
        exit-code: '1'
        ignore-unfixed: true
        vuln-type: 'os,library'
        severity: 'CRITICAL,HIGH'
        
    - name: Push to Container Registry
      if: github.event_name == 'push'
      run: |
        echo \${{ secrets.GITHUB_TOKEN }} | docker login \${{ env.REGISTRY }} -u \${{ github.actor }} --password-stdin
        docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}/\${{ matrix.service }}:\${{ github.sha }}` }
        ]
      }
    ]
  }
];

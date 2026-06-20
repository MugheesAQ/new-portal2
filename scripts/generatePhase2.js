const fs = require('fs');
const path = require('path');

const SERVICES = [
  'api-gateway',
  'auth-service',
  'citizen-service',
  'complaint-service',
  'forms-service',
  'notification-service',
  'document-service',
  'admin-service'
];

const BACKEND_DIR = path.join(__dirname, '../backend');

if (!fs.existsSync(BACKEND_DIR)) {
  fs.mkdirSync(BACKEND_DIR, { recursive: true });
}

function createPom(serviceName, port) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>pk.gov.kpk.desc</groupId>
    <artifactId>${serviceName}</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>${serviceName}</name>
    <description>DESC Citizen Portal - ${serviceName}</description>
    <properties>
        <java.version>21</java.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        ${serviceName !== 'api-gateway' ? `
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>` : `
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        `}
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.12.5</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>\${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
`;
}

function createApplicationProperties(serviceName, port) {
    return `server.port=${port}
spring.application.name=${serviceName}

# Database Configurations (using environment variables for AWS Secrets Manager)
spring.datasource.url=\${DB_URL:jdbc:postgresql://localhost:5432/${serviceName.replace('-', '_')}}
spring.datasource.username=\${DB_USER:desc_admin}
spring.datasource.password=\${DB_PASS:admin123}

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Flyway Migrations
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# Actuator
management.endpoints.web.exposure.include=health,metrics,prometheus
management.endpoint.health.show-details=always

# JWT Secret (In production mapped from AWS Secrets Manager)
jwt.secret=\${JWT_SECRET:a_very_long_secure_secret_key_for_desc_citizen_portal_development_only}
jwt.expiration=3600000
    `;
}

function createMainClass(serviceName) {
    const className = serviceName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Application';
    const pkg = `pk.gov.kpk.desc.${serviceName.replace('-', '')}`;
    return `package ${pkg};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }
}
`;
}

function createDockerfile(serviceName) {
    return `FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY --from=build /app/\${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
`;
}

const templates = {
    'auth-service': {
        entities: ['User', 'Role'],
        controller: 'AuthController'
    },
    'citizen-service': {
        entities: ['CitizenProfile'],
        controller: 'CitizenController'
    },
    'complaint-service': {
        entities: ['Complaint', 'ComplaintHistory'],
        controller: 'ComplaintController'
    }
};

SERVICES.forEach((service, index) => {
    const serviceDir = path.join(BACKEND_DIR, service);
    fs.mkdirSync(serviceDir, { recursive: true });
    
    // pom.xml
    fs.writeFileSync(path.join(serviceDir, 'pom.xml'), createPom(service, 8080 + index));
    fs.writeFileSync(path.join(serviceDir, 'Dockerfile'), createDockerfile(service));
    
    // src/main/java and resources
    const pkgName = `pk.gov.kpk.desc.${service.replace('-', '')}`;
    const srcDir = path.join(serviceDir, 'src/main/java', pkgName.replace(/\./g, '/'));
    const resourcesDir = path.join(serviceDir, 'src/main/resources');
    
    fs.mkdirSync(srcDir, { recursive: true });
    fs.mkdirSync(resourcesDir, { recursive: true });
    fs.mkdirSync(path.join(resourcesDir, 'db/migration'), { recursive: true });
    
    // Application properties
    fs.writeFileSync(path.join(resourcesDir, 'application.properties'), createApplicationProperties(service, 8080 + index));
    
    // Main App Class
    fs.writeFileSync(path.join(srcDir, `${service.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Application.java`), createMainClass(service));

    // Basic Migration
    fs.writeFileSync(path.join(resourcesDir, 'db/migration/V1__Initial_Setup.sql'), `-- Initial Schema for ${service}\n-- Designed for PostgreSQL\n`);

    // Add sample controllers and entities if defined
    if (templates[service]) {
        ['controller', 'service', 'repository', 'model', 'dto', 'security'].forEach(layer => {
            fs.mkdirSync(path.join(srcDir, layer), { recursive: true });
        });

        // Generate JwtUtil for security
        fs.writeFileSync(path.join(srcDir, 'security', 'JwtUtil.java'), `package ${pkgName}.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("\${jwt.secret}")
    private String secret;

    @Value("\${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }
}
`);
        // Basic Controller
        const controllerClass = `${templates[service].controller}`;
        fs.writeFileSync(path.join(srcDir, 'controller', `${controllerClass}.java`), `package ${pkgName}.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/${service.split('-')[0]}s")
public class ${controllerClass} {

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("${service} is operational.");
    }
}
`);
    }

    console.log(`Generated basic structure for ${service}`);
});

console.log('All backend microservices generated.');

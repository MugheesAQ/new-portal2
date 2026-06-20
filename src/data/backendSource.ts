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
          { name: 'pom.xml', type: 'file', language: 'xml', content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
    </parent>
    <groupId>pk.gov.kpk.desc</groupId>
    <artifactId>auth-service</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>auth-service</name>
    <description>DESC Citizen Portal - auth-service</description>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
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
</project>` },
          { name: 'Dockerfile', type: 'file', language: 'dockerfile', content: `FROM eclipse-temurin:21-jdk-alpine AS build
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
ENTRYPOINT ["java", "-jar", "/app.jar"]` },
          { name: 'src', type: 'folder', children: [
            { name: 'main', type: 'folder', children: [
              { name: 'resources', type: 'folder', children: [
                { name: 'application.yml', type: 'file', language: 'yaml', content: `server:
  port: 8081

spring:
  application:
    name: auth-service
  datasource:
    url: \${DB_URL:jdbc:postgresql://localhost:5432/auth_db}
    username: \${DB_USER:postgres}
    password: \${DB_PASS:postgres}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
  flyway:
    enabled: true
    locations: classpath:db/migration

jwt:
  secret: \${JWT_SECRET:your_very_long_secure_secret_key_for_development_environment_only}
  expiration: 86400000` },
                { name: 'db', type: 'folder', children: [
                  { name: 'migration', type: 'folder', children: [
                    { name: 'V1__Init_Schema.sql', type: 'file', language: 'sql', content: `CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (name) VALUES ('ROLE_CITIZEN'), ('ROLE_OFFICER'), ('ROLE_ADMIN');` }
                  ]}
                ]}
              ]},
              { name: 'java', type: 'folder', children: [
                { name: 'pk/gov/kpk/desc/auth', type: 'folder', children: [
                  { name: 'AuthServiceApplication.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}` },
                  { name: 'config', type: 'folder', children: [
                    { name: 'SecurityConfig.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pk.gov.kpk.desc.auth.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/register", "/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}` }
                  ]},
                  { name: 'controller', type: 'folder', children: [
                    { name: 'AuthController.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pk.gov.kpk.desc.auth.dto.AuthResponse;
import pk.gov.kpk.desc.auth.dto.LoginRequest;
import pk.gov.kpk.desc.auth.dto.RegisterRequest;
import pk.gov.kpk.desc.auth.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
}` }
                  ]},
                  { name: 'dto', type: 'folder', children: [
                    { name: 'LoginRequest.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}` },
                    { name: 'RegisterRequest.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}` },
                    { name: 'AuthResponse.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
}` }
                  ]},
                  { name: 'entity', type: 'folder', children: [
                    { name: 'Role.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;
}` },
                    { name: 'User.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}` }
                  ]},
                  { name: 'exception', type: 'folder', children: [
                    { name: 'GlobalExceptionHandler.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid username or password"));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}` }
                  ]},
                  { name: 'repository', type: 'folder', children: [
                    { name: 'UserRepository.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pk.gov.kpk.desc.auth.entity.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}` },
                    { name: 'RoleRepository.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pk.gov.kpk.desc.auth.entity.Role;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}` }
                  ]},
                  { name: 'security', type: 'folder', children: [
                    { name: 'CustomUserDetailsService.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pk.gov.kpk.desc.auth.entity.User;
import pk.gov.kpk.desc.auth.repository.UserRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true, true, true,
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList())
        );
    }
}` },
                    { name: 'JwtAuthenticationFilter.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        jwt = authHeader.substring(7);
        username = jwtUtil.extractUsername(jwt);
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            
            if (jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}` },
                    { name: 'JwtUtil.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("\${jwt.secret}")
    private String secretKey;

    @Value("\${jwt.expiration}")
    private long jwtExpiration;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String username, java.util.List<String> roles) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", roles);
        return generateToken(extraClaims, username);
    }

    public String generateToken(Map<String, Object> extraClaims, String subject) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}` }
                  ]},
                  { name: 'service', type: 'folder', children: [
                    { name: 'AuthService.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pk.gov.kpk.desc.auth.dto.AuthResponse;
import pk.gov.kpk.desc.auth.dto.LoginRequest;
import pk.gov.kpk.desc.auth.dto.RegisterRequest;
import pk.gov.kpk.desc.auth.entity.Role;
import pk.gov.kpk.desc.auth.entity.User;
import pk.gov.kpk.desc.auth.repository.RoleRepository;
import pk.gov.kpk.desc.auth.repository.UserRepository;
import pk.gov.kpk.desc.auth.security.JwtUtil;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use");
        }

        Role citizenRole = roleRepository.findByName("ROLE_CITIZEN")
                .orElseThrow(() -> new RuntimeException("Default role not found"));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(citizenRole))
                .isActive(true)
                .build();

        userRepository.save(user);

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        String jwtToken = jwtUtil.generateToken(user.getUsername(), roleNames);

        return AuthResponse.builder()
                .token(jwtToken)
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        String jwtToken = jwtUtil.generateToken(user.getUsername(), roleNames);

        return AuthResponse.builder()
                .token(jwtToken)
                .message("Login successful")
                .build();
    }
}` }
                  ]}
                ]}
              ]}
            ]},
            { name: 'test', type: 'folder', children: [
              { name: 'java', type: 'folder', children: [
                { name: 'pk/gov/kpk/desc/auth', type: 'folder', children: [
                  { name: 'service', type: 'folder', children: [
                    { name: 'AuthServiceTest.java', type: 'file', language: 'java', content: `package pk.gov.kpk.desc.auth.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import pk.gov.kpk.desc.auth.dto.AuthResponse;
import pk.gov.kpk.desc.auth.dto.LoginRequest;
import pk.gov.kpk.desc.auth.dto.RegisterRequest;
import pk.gov.kpk.desc.auth.entity.Role;
import pk.gov.kpk.desc.auth.entity.User;
import pk.gov.kpk.desc.auth.repository.RoleRepository;
import pk.gov.kpk.desc.auth.repository.UserRepository;
import pk.gov.kpk.desc.auth.security.JwtUtil;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtUtil jwtUtil;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private User validUser;
    private Role validRole;

    @BeforeEach
    void setUp() {
        validRole = new Role();
        validRole.setId(1);
        validRole.setName("ROLE_CITIZEN");

        validUser = User.builder()
                .username("testuser")
                .email("test@example.com")
                .password("encoded_password")
                .roles(Set.of(validRole))
                .build();
    }

    @Test
    void register_Success() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("newuser");
        request.setEmail("new@example.com");
        request.setPassword("password123");

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(roleRepository.findByName("ROLE_CITIZEN")).thenReturn(Optional.of(validRole));
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenReturn(new User());
        when(jwtUtil.generateToken(anyString(), anyList())).thenReturn("jwt.token.here");

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertNotNull(response);
        assertEquals("jwt.token.here", response.getToken());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void login_Success() {
        // Arrange
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(validUser));
        when(jwtUtil.generateToken(eq("testuser"), anyList())).thenReturn("jwt.token.here");

        // Act
        AuthResponse response = authService.login(request);

        // Assert
        assertNotNull(response);
        assertEquals("jwt.token.here", response.getToken());
    }

    @Test
    void register_UsernameTaken_ThrowsException() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(validUser));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Username is already taken", exception.getMessage());
    }
}
` }
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

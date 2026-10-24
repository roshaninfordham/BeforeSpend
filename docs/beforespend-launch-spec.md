# BeforeSpend — Complete Launch Specification

*Combined reading copy of the individual files. For work in a coding agent, prefer the individual docs.*

**Version:** MVP v0.1 — hackathon build · **Event date:** October 24, 2026 · **Submission lock:** 6:45 p.m. ET

## Contents

1. Product Requirements Document (PRD)
2. Market Evidence, Positioning, and Demand Hypotheses
3. Architecture and Data Contracts
4. Autonomous Company Operating Model
5. Terac Human Study Protocol
6. Go-to-Market and Sales Assets
7. Security, Privacy, and Customer Promise
8. QA Plan and Release Gates
9. Hackathon Build Runbook — 24 October 2026
10. Lovable Build Prompt
11. Pitch, Demo, and Investor Narrative
12. Unit Economics and Pricing Gates
13. Sources and Verification Notes

---

## 1. Product Requirements Document (PRD)

*Source: 01_PRD.md*

**Product:** BeforeSpend
**Version:** MVP v0.1 — hackathon build
**Owner:** Founder / autonomous-company orchestrator
**Deadline:** October 24, 2026, submission lock 6:45 p.m. ET

### 1. Problem

Founders and small businesses often publish a landing page and spend time or money promoting it before knowing whether a person unfamiliar with the product can understand the offer. Friends may be too polite, generic AI critique is not actual customer evidence, and traditional research services can require more money, process, or time than a small team can justify.

BeforeSpend productizes the first step: collect structured reactions from actual people, identify the highest-impact clarity gap, produce a grounded rewrite, and provide evidence of what changed.

### 2. Target customer and buying moment

Primary ICP: independent founders, early-stage startups, solo builders, creators selling a product, and small service businesses that already have a public landing page and are about to promote it.

Trigger event: they are about to publish, launch on Product Hunt, pitch partners, or spend money sending traffic to a page.

Exclude from MVP: regulated/high-stakes offers; medical, financial, legal, political persuasion, employment decisions, products targeting children, private logged-in pages, pages with personal/sensitive data, and requests to manipulate or deceive respondents.

### 3. Job to be done

“When I am about to launch or promote an offer, help me find out what new people understand or misunderstand, give me one concrete improvement grounded in their responses, and show me the evidence so I can decide what to do next.”

### 4. Product promise

Promise: “Evidence-backed first-impression feedback and one concrete messaging revision before you spend on traffic.”

Not promised: sales, conversion lift, product-market fit, statistical significance, acceptance by investors, or proof that respondents will buy.

### 5. Primary workflow

1. Customer enters public URL, product category, intended audience, desired action, and the decision they need to make.
2. Preflight checks URL reachability, page title/headline, CTA existence, mobile viewport rendering, and obvious page errors. These are deterministic checks; label them as such.
3. Customer sees the exact package, total price, delivery scope, limitations, and refund/fulfilment policy.
4. Customer pays using Whop hosted checkout. No Stripe.
5. Order enters PAID_NEEDS_SCOPE or PAID_READY_TO_RESEARCH. Before the study launches, the system confirms the Terac quote and cost cap. If not within cap, pause fulfillment, reprice/change scope with customer consent, or refund under the published policy.
6. Study agent uses Terac MCP to create/price/launch a real general-population opportunity. Persist the real opportunity/request ID and actual approved budget.
7. Wait for submissions. Do not fabricate a completion time. Notify the customer of status.
8. Analyze responses with deterministic calculations plus agent-written synthesis tied to verbatim evidence. Do not invent citations or quotes.
9. Produce a report with: sample and dates; what people thought the product did; clarity/comprehension results; recurring confusion; objections; representative anonymized quotes; proposed revision; why that revision maps to evidence; limitations; next action.
10. If study budget and event time permit, conduct a second study on the revised version or a counterbalanced comparison. Show actual before/after measures and sample sizes.
11. Deliver the result page and downloadable PDF/Markdown. Keep order/event audit history.
12. Support agent answers routine status questions and routes ambiguous refunds, privacy requests, or safety issues to the owner.

### 6. MVP features — must-have

- One responsive landing page with clear offer and Whop purchase CTA.
- Submission form for public URL and decision context.
- Deterministic URL/page preflight and graceful error states.
- Order status page: Awaiting payment, Paid, Scoping research, Recruiting, Analyzing, Delivered, Paused/Refund pending.
- Whop hosted checkout and a verified server-side paid-order signal (webhook if time permits; otherwise disclose any manual step and do not claim fully automated payments-to-delivery).
- Terac MCP used for an actual study, with general-population participants and real study ID saved.
- Evidence-backed report template, generated only from actual returned submissions.
- Measurable before/after comparison when both versions have data; otherwise label the post-change result as pending.
- Agent activity log showing action, tool/result ID, cost estimate/approved spend, and state transition.
- Privacy notice, terms/limits, refund/fulfillment rule, contact route.
- A customer can use/try a demo mode clearly labeled DEMO DATA — NOT REAL PARTICIPANT RESULTS.

### 7. Should-have if time remains

- Solari browser-based visual test of the submitted URL and the deployed app.
- Exa citations for public competitive-context references, not for human-feedback claims.
- PDF report download.
- Automatic customer email/notification via available sponsor tooling. If email provider requires secrets or additional approval, use an order page instead.
- Product analytics: page submitted, checkout opened, paid order, study launched, report delivered.

### 8. Explicit non-goals for the hackathon

- A generic survey builder or marketplace.
- Paid advertising automation.
- Multi-tenant subscriptions or full customer accounts.
- Targeted B2B panel recruitment before the general-population launch works.
- Statistical claims, conversion predictions, or ROI guarantees.
- Running an unrestricted agent with payment, refund, outbound, or legal authority.
- Accepting private, authenticated, or sensitive URLs.
- Building a complex backend before a real order can be completed.

### 9. Suggested founding offer

BeforeSpend Clarity Sprint — proposed $79 one-time

- One public landing page.
- Five general-population responses, subject to confirmed Terac capacity and quote.
- Evidence-backed clarity report.
- One suggested headline, subheading, and CTA revision.
- Side-by-side original/revised copy and response score comparison if a valid second measurement is available.

The fixed price is an experiment, not a validated market price. Only publish after checking the actual Terac quote and keeping total variable delivery cost at or below the defined cap (see 12_UNIT_ECONOMICS.md).

### 10. Metrics

Business: qualified visits, checkout starts, paid orders, gross revenue, refunds, contribution per order, time from payment to launch, time to report, completed order rate.

Product: time to understand the offer, task completion, preflight success/error rate, report usefulness rating, revision adoption intent.

Human input: number recruited / completed / approved; response validity; general-population study ID; number of actual findings tied to source responses.

Before/after: correct unaided explanation rate, correct CTA identification rate, confusion incidence, and confidence rating. Report raw numerator/denominator as well as percentages. Treat low sample sizes as directional.

### 11. Acceptance criteria

- A new user understands the product, output, price, and limits within 15 seconds of seeing the hero area (validate with study, do not assume).
- User can submit a public URL and intended customer action.
- Purchase route uses Whop, not Stripe; the app never trusts a query-string paid=true claim.
- A real Terac MCP tool call creates or manages the study; actual IDs and status are persisted.
- Each generated finding can be traced to one or more real participant response IDs / quoted excerpts or is labeled as an agent hypothesis.
- No report says the study is complete before completed/approved submissions exist.
- No automatic study launch occurs if the quote exceeds the configured max cost or allowed budget.
- No fabricated results, testimonials, logos, urgency, or sales guarantees.
- Demo fixtures are visibly marked and cannot be mistaken for live data.

---

## 2. Market Evidence, Positioning, and Demand Hypotheses

*Source: 02_MARKET_AND_POSITIONING.md*

### 1. The pain we choose

BeforeSpend does not sell “AI feedback.” It sells a practical pre-spend decision: can an unfamiliar person understand the offer and identify the next step? If not, the customer receives a concrete messaging revision based on real responses.

This is most valuable when the customer is about to commit to a launch, paid traffic, a public demo, or an important pitch. The buying trigger should be tied to a real decision, not generic curiosity.

### 2. Evidence of an existing paid category

- PickFu: its official pricing page says surveys start at $1 per response and describes pay-as-you-go testing plus AI analysis. This proves low-cost survey responses exist; it means BeforeSpend must differentiate on the completed service and decision-ready output, not claim to be the cheapest survey tool. https://www.pickfu.com/pricing
- Wynter: its official pricing page advertises B2B research on demand, annual plans at $20,000 (Pro) and $40,000 (Elite), and a $100,000/year managed-research tier. It is not directly comparable to general-population testing, but signals willingness to pay for managed, specialized research. https://wynter.com/pricing
- LaunchProof.ai: markets a service that builds a landing page, runs ads, and delivers validation data in seven days. It is an adjacent competitor and a warning: do not position BeforeSpend as the only automated validation tool. https://launchproof.ai/
- Terac: its official researcher docs describe opportunities for unmoderated tasks or human-moderated calls, participant recruitment, screening, submissions, and pricing before launch. https://terac.com/docs/researchers/getting-started and https://terac.com/docs/researchers/opportunities/creating-an-opportunity

These pages provide category evidence, not evidence that our exact product or price has demand. Real pre-sales and conversion data are still required.

### 3. Positioning statement

For solo founders and small businesses about to launch or promote a public landing page, BeforeSpend is a human-backed launch-clarity sprint that shows what strangers understand, what confuses them, and one evidence-mapped revision—without a traditional research project. Unlike a standalone survey or generic AI critique, it connects real participant responses to a concrete change and shows the evidence behind it.

### 4. Why we might win

- Outcome vs. dashboard: the customer receives an answer and an edit, not another research workspace to operate.
- Evidence vs. synthetic opinion: actual human participants are required for the human-feedback deliverable. AI helps organize and map the evidence but does not replace respondents.
- Narrow scope: one page, one decision, one revision. This lowers delivery complexity and makes pricing understandable.
- Fast setup: customers submit a public URL and context instead of designing a study themselves.
- Cost transparency: Terac's real quote is checked before the system accepts a price/launch budget.

### 5. Initial ideal customer profile

Primary: a founder who already has a public page and a specific launch or promotion decision.

Good trigger language:

> “I am about to launch this page.”
> “I am about to spend $300–$1,000 sending traffic.”
> “People keep asking what we do.”
> “I have two offers/headlines and need a neutral read.”
> “I need a fast, evidence-backed fix before a demo or public launch.”

Poor first customers: people with only a vague idea and no page; customers expecting market sizing or representative survey statistics; buyers in sensitive domains; people requiring specialist B2B recruitment not supported by the general-population pilot.

### 6. Competitive map

| Alternative | Strength | Gap BeforeSpend aims to cover |
| --- | --- | --- |
| Informal feedback from friends | Cheap, fast | Often biased or polite; unstructured evidence |
| Generic AI copy critique | Immediate, cheap | Not independent human evidence |
| PickFu | Low-priced structured responses and analysis | Customer may still need to frame the decision and convert responses into an implementation-ready revision |
| Wynter / research agencies | Specialized research and more targeted audiences | More process and potentially higher cost; exact comparison varies by audience and study |
| LaunchProof.ai / validation services | Broader validation workflows, including traffic and landing page work | BeforeSpend focuses on one-page clarity and fast feedback rather than claiming full market validation |

### 7. Critical assumptions to validate

1. A founder will pay $79 for five general-population responses plus a useful revision.
2. People can be recruited and return quality submissions in a turnaround the buyer accepts.
3. General-population feedback is useful for the specific page. It is only directional if the intended buyers are a specialized B2B segment.
4. The report saves enough customer effort to justify the price over a do-it-yourself survey.
5. Terac costs plus processing fees leave contribution margin under the price cap.

Do not treat these as facts. Test them with paid orders, not likes or compliments.

### 8. Category expansion after the MVP works

- Product-name and tagline tests.
- Ad creative and thumbnail preference tests.
- Pricing-page comprehension.
- Product concept comparison.
- Creator offer clarity.
- Accelerator/agency bulk pilots.

Do not expand to these until one page → paid order → real Terac study → evidence report is reliable.

---

## 3. Architecture and Data Contracts

*Source: 03_ARCHITECTURE_AND_DATA.md*

### 1. Architecture principle

Build the smallest system that can complete one real paid order safely. Use rules for state transitions, budgets, and deterministic measurements. Use an agent for research synthesis, copy alternatives, and orchestration—not to bypass cost, privacy, payment, or evidence checks.

### 2. Suggested stack for this deadline

- UI: Lovable-generated React + TypeScript. Responsive single-page intake, order status, report page, visible demo/live labels.
- Hosting: Lovable's hosted deployment for the fastest launch, or the team's already-configured host. Verify the published build, not just preview. Official publishing doc: https://docs.lovable.dev/features/publish
- Persistence: use the Lovable-supported database/backend if already connected; otherwise use a small server-backed store available in the stack. Avoid storing customer orders only in browser localStorage if payments or private reports are involved.
- Payments: Whop one-time product and hosted checkout URL. Keep API keys and webhook secrets server-side. Event rule explicitly prohibits Stripe.
- Human research: Terac MCP at https://terac.com/api/mcp; use the connected agent's real MCP tools. Keep org credentials out of client code and public repositories. Install guide: https://terac.com/docs/researchers/mcp/install
- Web research: Exa for public competitor/context research if used. Do not send private customer data to Exa unless necessary and disclosed.
- Browser QA: Solari browser or local Playwright for public URL checks and replay. It is optional if the app can be tested manually before the deadline.
- Reports: HTML report first; print-to-PDF/export only after correct content. PDF is a format, not evidence of validity.

### 3. End-to-end state machine

DRAFT → PREFLIGHTED → CHECKOUT_PENDING → PAID → QUOTE_PENDING → READY_TO_LAUNCH → RECRUITING → SUBMISSIONS_READY → ANALYZING → REPORT_QA → DELIVERED

Terminal/exception states: CHECKOUT_ABANDONED, COST_GATE_BLOCKED, CUSTOMER_DECISION_REQUIRED, RECRUITMENT_TIMEOUT, REFUND_PENDING, REFUNDED, CANCELLED, FAILED_RETRYABLE, FAILED_ESCALATED.

A state transition must be idempotent. Replayed webhook or retry must not create a second study, charge twice, or send duplicate reports.

### 4. Core entities

**Order**
id (random, non-sequential)
created_at, updated_at
customer_email (only if needed for delivery)
public_url
product_context (plain-text brief, length-limited)
intended_audience
intended_action
package_id, quoted_customer_price, currency
whop_checkout_url, whop_purchase_id (nullable until confirmed)
state
terac_opportunity_id / terac_feasibility_request_id
terac_actual_quote, approved_variable_cost_cap
created_report_id
consent_version, privacy_notice_version

**Study**
id, order_id
platform = terac
opportunity_id, feasibility_request_id
study_version = baseline or revision
actual_population_description
planned_n, completed_n, approved_n
quote_amount, launch_amount, status
launched_at, completed_at

**Response**
id, study_id, submission_id
approved boolean / platform status
structured answer fields
quoted excerpts (exact text from submission)
quality flags and review status
respondent data minimized; do not publish identity or raw personal details

**Report**
id, order_id, baseline_study_id, revision_study_id nullable
generated_at, version
metrics_json
findings[] where every human-evidence finding links to response IDs
agent_hypotheses[] separated from evidence
revision_copy (headline/subhead/CTA)
limitations, data_completeness, delivery_status

**AuditEvent**
id, order_id, timestamp, actor_type, actor_id
action, state_before, state_after
tool_name, external_id, result_summary
cost_estimate, actual_cost, budget_remaining
avoid writing secret values or sensitive participant data into logs

### 5. Minimal API surface

Use the framework's normal routes/server functions, but preserve these contracts:

- POST /api/orders: validate URL/context, create draft/preflight order, return order ID and preflight summary.
- POST /api/checkout: create or return Whop hosted checkout URL for the configured package. Never accept arbitrary amount/product IDs from a browser.
- POST /api/webhooks/whop: verify provider signature using official Whop method, deduplicate event IDs, confirm purchase server-side, transition order to PAID.
- POST /api/orders/:id/quote: agent records actual Terac feasibility/quote result. Enforce max cost before launch.
- POST /api/orders/:id/launch: only allowed when payment is confirmed, the quote is approved, the customer scope is valid, and no sensitive URL is involved. Calls the actual Terac MCP tool through the authorized agent integration.
- GET /api/orders/:id/status: return least-privilege status without exposing raw participant data.
- GET /api/reports/:id: signed/authorized access to report.
- POST /api/orders/:id/refund-request: queues policy evaluation; high-risk/ambiguous cases escalate.

If you cannot implement and verify the webhook within the remaining hours, use Whop's hosted checkout and a clearly disclosed fulfillment queue. Do not call the company fully automated if someone manually advances a paid order.

### 6. Integration behavior

**Terac MCP**

- Discover actual available tools from the connected MCP server; do not invent tool names or schemas.
- First validate terac_get_context or equivalent context tool to confirm organization and credit balance.
- Use a general-population audience in the study because this is a hackathon requirement.
- Obtain actual price/feasibility first. Log the real quote. Launch only after budget checks.
- Save actual opportunity/request/submission IDs and status. Retrieve real submissions; don't fabricate results.
- If connection is absent, report the blocker, do not emulate Terac with fixture data and label it real.

**Whop**

- Customer payments go only through Whop. Use a hosted purchase URL to reduce implementation time.
- Webhook signature verification and event idempotency required before automated fulfillment.
- Do not trust browser redirects or query strings as proof of payment.
- Use the exact event names/signature mechanism from current Whop docs or SDK; do not guess.

**Exa**

- Public web search only for competitor and category context.
- Save source URLs and dates for every market claim in the report.
- Never present Exa search results as participant research.

**Solari**

- Optional: open public customer URL and verify title/headline/CTA, screenshot desktop/mobile viewport, and check the deployed checkout link.
- Do not bypass authentication or attempt destructive activity on customer sites.

### 7. Report generation contract

Output JSON / typed object:

- executive_summary: max 120 words.
- sample: number invited/completed/approved, dates, audience criteria, platform IDs.
- metrics: understood_offer_count, identified_cta_count, confusion_count, confidence_scores, each with raw numerator and denominator.
- findings: at least one exact supporting response excerpt per human-evidence finding, with response_id.
- revision: one headline, one subheading, one CTA, plus the evidence supporting each change.
- limitations: always include small-sample and general-population caveat.
- post_test: not_run, pending, or measured results; never infer.
- decision: revise, test_again, or ready_for_live_test, with reason. Do not use market_validated as a result label.

### 8. Deployment and secrets

- .env files must be gitignored. Commit .env.example containing names only.
- Server-side secrets: WHOP_API_KEY, WHOP_WEBHOOK_SECRET, TERAC_API_KEY (if using key auth), EXA_API_KEY if used, any delivery provider credentials.
- Prefer OAuth where supported by the connected MCP client. Rotate leaked secrets immediately.
- No API keys in Vite VITE_* client variables.
- Before submission, verify the published URL with a fresh browser session and check no secret or private response appears in the client bundle.

---

## 4. Autonomous Company Operating Model

*Source: 04_AUTONOMOUS_OPERATING_MODEL.md*

### 1. Company mission

Turn one customer decision about a public landing page into an evidence-backed action by automatically coordinating web preflight, human research, analysis, revision, checkout, delivery, and support.

Autonomy definition: agents perform routine operations without handoffs when they remain within explicit rules. The company still uses humans as the source of research evidence and escalates legal, privacy, budget, and ambiguous customer situations.

### 2. One orchestrator, bounded tools

For this deadline, use one orchestrator agent with specialized roles/prompts rather than building a multi-agent platform framework. Each role writes its outputs into the shared order record and audit log.

**A. CEO / Orchestrator**
Reads state and policy.
Chooses the next allowed action.
Prioritizes paid order fulfillment and hackathon demo reliability over feature work.
Cannot bypass a failed payment, cost cap, privacy rejection, or missing study evidence.

**B. Market Research Agent (Exa)**
Searches public competitor/pricing/docs pages.
Saves URLs, observed date, and concise claim excerpts.
Never invents market size, testimonials, or customer logos.

**C. Product Agent**
Conducts deterministic preflight checks on the submitted public page.
Produces a revision only after seeing actual responses.
Separates facts from hypotheses.
Never claims a suggested copy change is proven to increase conversion without live conversion evidence.

**D. Human Research Operations Agent (Terac MCP)**
Checks organization context and remaining credits.
Creates/requests pricing for general-population study.
Enforces sample, audience, question, budget, and privacy rules.
Launches only after actual cost quote is captured and within cap.
Polls/retrieves submissions, approves or rejects only according to the platform's documented quality workflow, and uses actual records.

**E. Analyst / Report Agent**
Computes counts and ratios deterministically.
Links each finding to specific approved response IDs.
Writes a concise decision report.
Labels small-sample insight as directional.

**F. Sales & Support Agent**
Prepares honest, individualized messages to potential customers who are appropriate to contact.
Does not scrape private data, spam lists, pretend to be a customer, or make false urgency claims.
Responds to status and product questions using the exact order state.
Never promises result delivery time unless operationally supported.

**G. Finance / Payment Agent (Whop)**
Verifies payment through server-confirmed Whop events.
Deduplicates events and maps one purchase to one order.
Records gross sales, fees when available, Terac cost, refunds, and contribution estimate.
Does not collect or route payments through Stripe or another processor.

**H. QA Agent (Solari or Playwright)**
Checks public site usability, links, input validation, order state transitions, privacy labels, and report provenance.
Cannot place live orders or launch paid studies in production tests without an explicit test mode / approved budget.

### 3. Decision policy

Routine decisions may be automatic only when all conditions pass:

- Payment has been confirmed by Whop, not inferred from a redirect.
- URL is public and within allowed scope.
- Customer supplied required context and consents to research processing.
- Actual Terac quote is available.
- Total cost is below per-order cap and total event budget remaining.
- No sensitive or disallowed content is present.
- Study wording is neutral and not designed to manipulate participants.
- All tool calls are logged with IDs and results.

Escalate / pause conditions

- Cost exceeds cap, quote cannot be verified, credits are insufficient, or potential costs are uncertain.
- Payment status conflicts or webhook signature fails.
- Customer requests a refund after study launch, alleges harm, or disputes report integrity.
- The page contains sensitive personal information, a regulated/high-stakes claim, malware, or a request to deceive respondents.
- Terac connection fails or no valid submissions are returned.
- The report agent cannot trace a finding to evidence.
- Any request for legal, medical, employment, credit, or other high-stakes decisions.

### 4. Autonomy metrics

paid_to_study_launch_rate
study_launch_to_report_delivery_rate
orders_with_manual_intervention_rate (lower is better, but zero is not a goal at the expense of safety)
budget_cap_violation_count (must remain zero)
duplicate_study_count (must remain zero)
invalid_evidence_claim_count (must remain zero)
median time by state
contribution per order

### 5. Demo proof requirements

For the judge demo show a real trace:

- Actual Whop product/checkout flow or real payment if obtained; if no sale, do not pretend one occurred.
- Actual Terac MCP connection and launch call.
- Actual study/opportunity identifier and state.
- Real participant feedback, if returned by deadline; otherwise show the study is active and label results as pending.
- Agent's revision generated from actual feedback, not a hardcoded before/after masquerading as real.
- Audit log of tool calls, costs, state changes, and result provenance.
- A polished static dashboard is not enough to substantiate autonomous execution.

---

## 5. Terac Human Study Protocol

*Source: 05_TERAC_STUDY_PROTOCOL.md*

### Purpose

Use genuine general-population feedback to improve the BeforeSpend product and demonstrate a measurable before/after change, as required by the event. Keep the study small, neutral, and focused.

### Study A — before version

Suggested title: Can You Understand This Product Page at a Glance?

Audience: general population, adults 18+, use the broadest permitted population filters. Do not target only startup founders for the hackathon's required general-population study. Do not add unnecessary demographic requirements.

Format: unmoderated, short task. Use a public page or screenshot; no login.

Task description for participants:

> Please look at this webpage for about 10 seconds. Answer based on your first impression. There are no right or wrong opinions. We want to understand what is clear or confusing, not to test you. Do not enter personal information or make a purchase.

Questions:

1. In your own words, what do you think this product/service does?
2. Who do you think it is for?
3. What would you click or do next if you were interested?
4. What is the biggest question or concern you still have?
5. On a 1–5 scale, how confident are you that you understand the offer? (1 = not at all, 5 = completely)
6. Optional: What one thing would you change to make the offer clearer?

Keep the questionnaire neutral; do not say the page is confusing or suggest a preferred answer.

### Analysis rubric

For each response, record:

- offer_understood: yes/no/ambiguous based on a prewritten rubric.
- audience_understood: yes/no/ambiguous.
- cta_identified: yes/no/ambiguous.
- explicit_confusion: yes/no.
- confidence: integer 1–5.
- main_objection: short thematic code + exact excerpt.
- data_quality: approved/rejected according to study platform rules.

Do not equate confidence with correctness. Keep scores and verbatim comments separate.

### Revision policy

The agent can revise only the specific elements implicated by actual responses: headline, subheading, supporting proof, pricing explanation, or CTA. It should not rewrite the entire page just because it can. Every change needs an evidence mapping, for example:

Problem: 3 of 5 approved responses could not state the service outcome.
Evidence: quote response IDs R2 and R4.
Change: move the concrete deliverable into the headline and remove vague “AI-powered” wording.
Expected mechanism: improve comprehension; this is a hypothesis, not a guaranteed conversion lift.

Never fabricate quotes or present generated paraphrases as direct quotes.

### Study B — revised version / before-after

Preferred method: use a second cohort with the same broad audience definition and the same questions to reduce learning/order effects. Keep sample size as similar as feasible. If only one cohort is affordable, use a counterbalanced comparison (randomize which version is seen first) and clearly disclose the design; do not describe it as an independent A/B test.

Report for each version:

- recruited count, submitted count, approved count
- correct offer comprehension n/N
- correct CTA identification n/N
- explicit confusion n/N
- mean and distribution of confidence scores
- 2–3 anonymized exact quotes with response IDs
- changes between versions as raw counts and percentage points where valid

With small samples, use “directional evidence” and show denominators. Do not say “statistically significant,” “validated,” “proven to convert,” or “market demand confirmed.”

### Timing and truthfulness for hackathon

Launch Study A as soon as the actual Terac MCP is connected. Use the general-population setup required by the event guide. Recruitment/approval may not finish by 6:45 p.m.; there is no guaranteed delivery time in this document.

If results are late:

- show the actual opportunity ID and current status;
- use direct feedback gathered from hackathon attendees only as separate, labeled supplementary feedback;
- show the page changes already made, but do not claim a Terac-based before/after result until the submissions exist;
- explain the re-test is pending.

### Data minimization

Do not collect respondent names, emails, addresses, employer, or other identifiers unless the platform requires them and there is a valid reason.
Use anonymous response IDs in the report.
Do not include sensitive personal content from any response in marketing or public demo.
Follow Terac rules for participant data, retention, compensation, and submission approvals.

### Terac MCP operational checklist

- Connect to https://terac.com/api/mcp through a supported MCP client and authenticate securely.
- Discover tools; do not assume tool schemas.
- Verify organization context and credit balance using the actual context tool.
- Draft the study, set general-population audience, neutral screener/task, questions, sample size, and incentive.
- Request/confirm actual quote; record participant incentive, platform fee, and total.
- Check budget and authorize launch only within cap.
- Save actual request/opportunity IDs and status.
- Retrieve submissions through the available Terac tools and use only actual approved responses.

Official refs:

- https://terac.com/docs/researchers/mcp/install
- https://terac.com/docs/researchers/opportunities/creating-an-opportunity
- https://terac.com/docs/researchers/getting-started

---

## 6. Go-to-Market and Sales Assets

*Source: 06_GO_TO_MARKET_AND_SALES.md*

### 1. Landing-page copy

**Hero**

Before you spend on traffic, find out what strangers actually understand.

BeforeSpend recruits real people to review your landing page, identifies the biggest point of confusion, and gives you one evidence-backed rewrite you can test next.

Primary CTA: Check my page
Secondary link: See a sample report

Trust line: Real participant responses. Clear sample sizes. No fake AI-generated “customer opinions.”

**The problem**

You know what your product does. A first-time visitor does not have your context. BeforeSpend gives you a structured first-impression read before you commit more effort or ad spend.

**What you get**

- A first-impression summary from actual participants.
- Raw counts for whether people understood the offer and next action.
- The main recurring confusion and objections, tied to response IDs.
- One revised headline, subheading, and CTA with an explanation of why each change was suggested.
- A clear limitations section, so directional feedback is not mistaken for proof of conversion.

**What it is not**

This is not a guarantee of sales, a conversion prediction, or a statistically representative market survey. General-population feedback may not match your target buyers. Use the result to decide what to test next.

**Pilot package (publish only after quote/cost gate)**

BeforeSpend Clarity Sprint — $79 one-time (proposed founding price)

One public landing page, five approved general-population responses, one evidence-backed report, and one messaging revision. Delivery timing depends on participant recruitment and submission approval; status is visible in the order page.

If the actual research quote exceeds the cost cap, the company must change the package/price with customer consent or not sell this version. Do not charge a fixed amount before understanding whether it can be fulfilled at that price.

**FAQ**

**Does this guarantee higher conversions?**
No. It helps diagnose clarity and first-impression issues. Live conversion requires a later real traffic test.

**Are the responses generated by AI?**
No. Participant responses included in the report come from real research submissions. AI may help organize the evidence and suggest edits; AI suggestions are labeled separately.

**How fast will it be delivered?**
It depends on recruitment and approval. The order page shows status; do not promise an unsupported turnaround.

**Do you store my password?**
No. The MVP accepts public URLs only; never submit login credentials or private content.

**What if the study cannot be launched?**
The published policy explains how the order is paused, repriced with consent, or refunded when the research cannot be fulfilled.

### 2. In-person hackathon pitch

Quick question—do you already have a landing page for the thing you're building, and are you about to launch it or spend money promoting it? BeforeSpend gets real people to tell you what they think your page does, where they get confused, and what you'd change first. You get a concise report plus a revised headline and CTA—not another dashboard. We're running a founding pilot today, subject to study capacity. Want to scan your page and see the exact deliverable before deciding?

Ask permission before opening a person's site or entering their data. Do not pressure people after a no.

### 3. 30-second founder demo

1. Paste a public URL.
2. Show deterministic preflight: title/headline present, CTA found, page accessible.
3. Show the study brief and actual Terac quote before spending.
4. Show a real MCP launch/status and actual ID.
5. Show real responses if available; otherwise clearly show RECRUITING — RESULTS PENDING.
6. Map one real response to one copy revision.
7. Show the report's limitations and Whop purchase path.

### 4. Direct messages (personalize; do not bulk spam)

Message to a founder you have just met

> Hey — I’m building BeforeSpend at the Zero Human Company Hackathon. It tests whether people who don’t know your product understand your landing page, then gives you a concrete evidence-backed headline/CTA revision. I’m looking for a few founders with a public page who are willing to test the workflow. Would a 2-minute demo be useful? No worries if not.

Message after a demo

> Thanks for trying BeforeSpend. The pilot is designed to show what respondents understood, what remained unclear, and one revision tied to actual responses. The sample is directional, not a conversion guarantee. The proposed pilot is $79, but I will only confirm the order after the research cost/capacity check. Here is the checkout/details page: [insert actual published URL].

Business/agency intro for after the hackathon

> Subject: A lightweight human-feedback sprint before your next launch
>
> Hi [Name] — I’m testing a focused service for teams that want a fast read on landing-page clarity without coordinating a full research project. We recruit general-population participants, report how well they understand the offer and CTA, and give you one evidence-mapped revision. It is not a substitute for testing with your exact buyers, but it can catch obvious communication gaps early. Would you be open to a 15-minute conversation about how you currently validate messaging?

### 5. Organic launch sequence for today

First: recruit 3–5 potential buyers in the room for live demos, not merely judges or friends who will be polite.
Second: ask if they have a public page and a decision they need to make within a week.
Third: show the exact output and price. Ask for a real paid pilot only when fulfillment/cost checks pass.
Fourth: measure objections (price, trust, audience fit, speed, sample size) and feed them into the next revision.
Fifth: publish a short build log with the real study status and transparent sample limits; do not exaggerate results.
Do not spend on ads before a working checkout, credible fulfillment capacity, and at least one buyer signal exist.

### 6. Conversion metrics

Track: qualified conversations, demos, checkout opens, paid orders, abandoned checkout, time to quote, launch rate, report completion, refunds, gross revenue, variable cost, contribution, and report usefulness score.

Likes, survey compliments, and waitlist signups are not revenue. A successful payment is revenue; contribution after refunds/fees/research cost is the more meaningful business metric.

---

## 7. Security, Privacy, and Customer Promise

*Source: 07_SECURITY_PRIVACY_AND_COMPLIANCE.md*

This is a product design checklist, not legal advice. Obtain appropriate professional review before scaling, especially around privacy, consumer protection, tax, and refund terms.

### 1. Data policy

- Accept public URLs and a limited text brief only for MVP.
- Explicitly forbid passwords, login-protected URLs, private dashboards, customer records, protected health information, financial account information, and other sensitive personal data.
- Do not store scraped full-page contents longer than necessary. Store minimal evidence needed to fulfill the job and the public source URL.
- Do not publish raw participant data. Anonymize quotations and remove identifying details.
- Never use respondent data to train unrelated models or reuse it for another customer's report.
- Provide a clear retention period and deletion-request contact. Pick an actual retention period before launch and implement it; do not publish a promise the app cannot meet.
- Secure order/report access; random non-sequential IDs are not a substitute for authorization.

### 2. Payment controls

- Whop is the only customer payment processor for this event. Do not integrate Stripe.
- Never trust a client query string, a visible success page, or a screenshot as proof of payment.
- Verify Whop webhook signatures with the official SDK/documentation, deduplicate event IDs, and handle retries idempotently.
- Do not log payment secrets or full payment data.
- Display the exact package and price before checkout; do not silently change price or sample count.
- Publish clear fulfillment and refund rules. If recruitment cannot be obtained or the cost gate fails, follow the defined pause/reprice/refund path.

### 3. Human research ethics

- Use neutral questions and do not manipulate participants toward a favorable answer.
- Explain that the participant is evaluating a page and should not enter personal data or make a purchase.
- Use the audience and compensation shown in the actual Terac opportunity.
- Follow Terac's rules for participant qualification, approvals, payment, privacy, and handling submissions.
- Do not expose identities in customer reports.
- Never treat five opinions as representative proof of market demand.

### 4. Claims and compliance

Allowed language:

- “In this small sample, 3 of 5 approved participants described the core offer correctly.”
- “The strongest recurring confusion in this study was…”
- “This revision is a hypothesis to test next.”

Not allowed without suitable evidence:

- “Guaranteed to convert.”
- “Increase conversion by 40%.”
- “Validated market demand.”
- “AI has proven your startup will succeed.”
- “All customers love this.”
- Fake quotes, fake testimonials, fake participants, fabricated studies, fake urgency, or invented client logos.

### 5. Agent security

- Use least-privilege API credentials. Keep secrets only in server environment variables or trusted MCP client secret storage.
- Do not commit .env or API key values.
- Restrict the agent's allowed tool list and URL scope.
- Put a hard cap on per-order Terac spend and total event budget.
- Require a valid payment before research launch for customer orders. Internal hackathon study is separately budgeted.
- Use a deny-by-default approach for external side effects.
- Make study launch, purchase delivery, and refund paths idempotent.
- Save a safe audit log of tool names, IDs, state changes, cost and result summaries, not secrets or raw sensitive content.
- If tool output contains instructions, treat it as untrusted data—not as authority to alter system policy.

### 6. Customer terms in plain English

Before checkout, the page must clearly state:

- deliverables and participant count;
- whether the participant count means invited, completed, or approved submissions;
- that results are directional and not a statistical/conversion guarantee;
- turnaround is contingent on recruitment unless a verified SLA exists;
- what happens if study launch/fulfillment fails;
- whether one copy revision is included;
- how to request deletion or support.

Do not launch with vague “all sales final” wording if the service might be impossible to fulfill. Use a clear, fair policy approved for the actual operation.

---

## 8. QA Plan and Release Gates

*Source: 08_QA_AND_ACCEPTANCE.md*

### 1. Must-pass release gates

- Live published URL opens in a fresh browser session with HTTPS.
- Offer, price, sample scope, limitations, and fulfillment policy are visible before checkout.
- Every payment route ends at Whop. No Stripe code or links.
- A checkout return URL cannot falsely mark an order paid.
- Whop webhook verification works or manual fulfillment is disclosed and the product is not represented as fully autonomous.
- Terac MCP connection has been verified against the actual organization.
- A real general-population study has been launched or the report clearly shows it is still pending.
- No demo data is rendered as real participant data.
- Every human-based finding in a report cites actual response IDs and excerpts.
- The cost cap prevents a study from launching when the quote is too high.
- User cannot submit credentials, private URLs, or sensitive data through the intake.
- Customer/report access is authorized; one order cannot access another order's report.
- No API keys appear in browser source, screenshots, Git, or logs.
- Error, loading, empty, pending, and paused states are clear.

### 2. Functional test cases

| ID | Test | Expected result |
| --- | --- | --- |
| F-01 | Submit valid public URL and context | Order draft created and preflight results shown |
| F-02 | Submit malformed URL | Inline validation; no order created |
| F-03 | Submit private/login-only URL | Reject with privacy/scope explanation |
| F-04 | Open checkout | Redirects to configured Whop hosted purchase page |
| F-05 | Return from checkout without confirmed payment | Order remains unpaid |
| F-06 | Receive valid Whop paid event | Order moves to PAID once |
| F-07 | Replay same webhook | No duplicate order processing or study launch |
| F-08 | Receive invalid webhook signature | Reject and audit safely |
| F-09 | Terac quote below cap | Can proceed to approved launch state |
| F-10 | Terac quote above cap | Block launch; reprice/change scope with consent or cancel/refund by policy |
| F-11 | Terac MCP unavailable | Order pauses with clear status; no fake study ID or result |
| F-12 | Zero submissions | No generated human-evidence report; show pending or failure path |
| F-13 | Partial submissions | Report actual count and label incomplete/limited |
| F-14 | No second study yet | post_test = pending/not_run, no invented before/after result |
| F-15 | Completed report | All findings trace to response IDs or are labeled agent hypotheses |
| F-16 | One customer tries another order ID | Access denied unless authorized |
| F-17 | Demo mode | Persistent, visible DEMO DATA — NOT REAL PARTICIPANT RESULTS label |
| F-18 | Missing sample size | Prevent final report delivery |
| F-19 | Customer asks for guaranteed conversion | Explain limitations and offer clarity assessment only |
| F-20 | Study launch retry | Same idempotency key / state prevents duplicate opportunity |

### 3. User testing rubric

Ask 3–5 people, where practical:

- “In one sentence, what do you think this product does?”
- “What do you receive after paying?”
- “What would you expect this to prove—and what would it not prove?”
- “What would stop you from buying at this price?”
- “What is the next action you would take?”

Measure:

- correct offer comprehension;
- correct identification of deliverables;
- correct understanding of limitations;
- ability to identify next action;
- top hesitation theme.

Use feedback to revise the homepage. Keep the original copy and the revision, and document which feedback triggered which change.

### 4. Accessibility and usability

- Keyboard navigation to all primary form actions.
- Visible focus indicators; labels for all inputs; error messages not color-only.
- Responsive layout on desktop/mobile.
- Sufficient contrast; no tiny legal text.
- No motion needed to understand the product.
- Report tables are readable and export cleanly.

### 5. Final manual smoke test (minimum 10 minutes)

- Open live page in private browser.
- Submit your own safe public demo URL.
- Confirm invalid URL behavior.
- Click the real Whop checkout and verify product/price are correct; do not purchase with a live card unless intended.
- Confirm order status remains unpaid until real confirmation.
- Open Terac study dashboard/MCP and verify actual status/ID.
- Open the report and verify sample size, exact sources, limitations, and no invented data.
- Confirm the demo label on fixture reports.
- Click all external links.
- Capture one screenshot of the working flow for judges.

A passing app means every listed critical gate is satisfied or an explicitly disclosed manual step is accepted. A “green dashboard” alone is not proof of completion.

---

## 9. Hackathon Build Runbook — 24 October 2026

*Source: 09_HACKATHON_BUILD_RUNBOOK.md*

Known event constraints from the participant guide: build time 9:45 a.m.–6:45 p.m.; submission locks at 6:45 p.m.; every project must use Terac MCP; launch a general-population study; demonstrate real human input improving the project with a before/after; agent-run company must use Whop and take all customer payments through Whop; all revenue must be real and organic.

Planning assumption: as of the user's last provided local timestamp, it was around 2:07 p.m. ET, leaving approximately 4 hours 38 minutes until lock. Re-check the clock now.

### Rule zero

Do not try to build a complete autonomous SaaS platform today. Ship one truthful vertical slice: public page → actual Terac study → evidence-based change → live offer/Whop checkout → auditable workflow. Revenue is a bonus target, not something the build can guarantee.

### Priority order

**Phase 1 — 20 minutes: secure the required rails**

- Confirm Lovable project/account and redeem the event Pro credits if not already done.
- Configure Terac MCP in the coding/agent client using the official installation guide.
- Ask the connected agent to fetch the actual Terac organization context and credit balance.
- Create/verify Whop business, one-time product, and hosted checkout plan. Save the actual purchase URL.
- Confirm that the credits/quote and launch are truly available. Do not guess.

**Phase 2 — 20 minutes: launch the product-improvement study early**

Use 05_TERAC_STUDY_PROTOCOL.md to create a broad general-population study about the current BeforeSpend landing page.
Capture the real study ID/status and actual quoted cost.
Launch only after the actual cost is visible and approved under the event budget.
Do not wait to finish the app before launching the study; recruitment delay is the largest external dependency.

**Phase 3 — 75 minutes: build the vertical-slice UI**

Build only:

- homepage with offer, price, deliverables, limitations, sample report;
- form for public URL, audience, and decision;
- preflight summary;
- Whop checkout button using real purchase URL;
- order status and workflow trace;
- report view with evidence links and actual data state.

Use a visible “results pending” state. Use a deterministic sample report only in an unmistakably labeled demo mode.

**Phase 4 — 45 minutes: connect the workflow**

Order validation and persistent state.
Whop confirmed payment status; use verified webhook if implemented, otherwise disclose the fulfillment/manual step and don't claim end-to-end autonomy.
Agent transitions order and asks Terac for actual study quote/launch after payment and scope checks.
Audit events for actual tool IDs, costs, and states.
Generate report only from returned responses.

**Phase 5 — 45 minutes: test and improve using humans**

Ask 3–5 event attendees to perform the landing-page task; label this separately from Terac data.
Obtain/use Terac submissions when actually returned.
Make one evidenced revision, such as replacing vague positioning with the concrete outcome.
Re-test with a second Terac cohort if time/credits permit. If not, state follow-up study pending.
Never convert attendee feedback into fake Terac results.

**Phase 6 — 30 minutes: sales and organic distribution**

Demo to founders at the event who have public pages and real launch decisions.
Make the offer only at a scope/price supported by the actual quote and capacity.
Route real payments through Whop.
Log paid orders and actual gross revenue. If no payment is made, report zero revenue without hedging.
Do not buy ads during the event unless there is a verified checkout and a clear, approved budget; organic direct demos are preferred.

**Phase 7 — final 30 minutes: QA and submission**

Run the smoke test in 08_QA_AND_ACCEPTANCE.md.
Confirm Terac MCP was genuinely used and the general-population study is launched/visible.
Show one real autonomous workflow trace and one clear before/after where evidence exists.
Show Whop checkout.
Check no API keys or participant identifiers are exposed.
Submission includes product URL, demo video/screenshots if requested, repo, architecture, study ID, actual measured before/after values, revenue evidence (if any), limitations, and next steps.
Submit before 6:45 p.m. ET. Leave buffer for platform issues.

### Minimum winning demo if time becomes tight

- A polished, live webpage with a real Whop checkout link.
- Actual Terac MCP study ID/status for a general-population study.
- A real trace showing how participant feedback caused a specific copy change.
- A real paid order if obtained; otherwise no fabricated payment.
- A clear, honest story about what is automated and what remains pending.

### Do not spend the remaining time on

- custom domain setup;
- complex user authentication;
- building bespoke analytics before a real study exists;
- multi-agent orchestration framework abstractions;
- paid ads or mass outbound;
- a second product track;
- polishing a PDF while checkout/research/state transitions are broken.

---

## 10. Lovable Build Prompt

*Source: 10_LOVABLE_BUILD_PROMPT.md*

Build a mobile-responsive full-stack web app called BeforeSpend. The job is to help founders understand what unfamiliar people do and do not understand about a public landing page before they spend money promoting it. The product uses actual human responses through Terac MCP for its research deliverable. It must never fabricate human data or claim that a small sample proves conversion lift.

### Brand and visual style

Premium but lightweight research utility; calm, direct, credible, not generic AI-gradient slop.
Use a warm off-white background, deep green/navy text, restrained green accent, generous whitespace, and high-contrast CTA.
Avoid robot illustrations, floating badges, fake analytics, fake testimonials, fake customer logos, and made-up numeric impact stats.
Hero headline: “Before you spend on traffic, find out what strangers actually understand.”
Subhead: “Real people review your landing page. BeforeSpend identifies the biggest point of confusion and gives you one evidence-backed messaging revision.”
CTA: “Check my page”. Secondary CTA: “See a sample report”.
Include honest limitations close to the offer: “Small-sample feedback is directional. It does not guarantee sales or predict conversion.”

### Core screens

Homepage: problem, how it works, deliverables, price/price rules, sample report clearly marked demo, FAQ, privacy/limitations, Whop CTA.

Intake form: public URL, what product does, intended audience, intended action, decision to make, contact email only if needed. Disallow private/login URLs, sensitive content, credentials, health/financial/private data. Length-limit text fields.

Preflight result: deterministic checks only — URL reachable, page title/headline extracted if supported, CTA visible if detectable, basic viewport test. Label each check as pass/check/unknown. Do not claim semantic analysis came from AI if it did not.

Checkout screen: exact package and price, deliverables, sample count, study cost/availability condition, refund/fulfillment policy, Whop hosted checkout URL configured from server/environment. Never collect payment directly in the app.

Order status: visible state machine statuses and truthful next step. No fake progress percentages or guaranteed ETA.

Research trace: list real Terac request/opportunity ID, actual state, approved budget/quoted cost, tool action labels, and timestamp. Hide secrets and participant identities.

Report: summary, actual sample size, approved response count, first-impression metrics with raw denominators, evidence-linked observations, revised headline/subheading/CTA, limitations, and post-test status. If no study results exist, render Results pending, not a fabricated report.

Admin/agent view: orders, state, cost cap, Terac status, Whop payment status, event log, exception state, real gross sales and actual costs. Do not allow an admin UI shortcut that bypasses verified payment or budget gates.

### Product logic

Use a persistent server-side store for orders, payments, studies, submissions, and reports if supported by the current Lovable setup.
Do not rely on localStorage for payment proof or private reports.
Implement the state machine defined in 03_ARCHITECTURE_AND_DATA.md.
Whop is the only payment provider. No Stripe code, links, SDK or references.
Checkout success redirect never proves payment. Only a verified server-side Whop event (or explicitly disclosed manual confirmation while in demo mode) can mark an order paid.
Study launch is blocked until: confirmed payment for a customer order; valid public URL; exact study scope; real Terac quote; quote below configured per-order cap; event budget available.
Keep all keys server-side. No secret in client VITE_* variables, HTML, or committed files.
Do not make up Terac tool names. Use the actual tools discovered through the connected MCP. Record actual IDs and statuses.
If the current environment cannot call Terac MCP from app backend, do not pretend it can. Add a real agent-operated execution queue with a clear pending/manual-run status and show the connected coding-agent trace. Clearly state that true self-service orchestration is future work.
Add an audit event for every important state change, tool call, payment confirmation, cost decision, and report delivery.
All workflows must be idempotent. Duplicate webhooks/retries cannot create duplicate studies or reports.

### Required policy and report rules

General-population studies for the event. Use neutral, non-leading questions from the study protocol.
Separate human evidence from agent hypothesis in every report.
Every human-evidence finding must link to actual participant response IDs and exact excerpts.
Small samples must be labeled directional; include n/N denominators.
Do not claim “validated demand”, “statistical significance”, or “proven conversion lift”.
Do not show fake testimonials, logos, sample results, sales counts, or urgency.
Demo content must have a persistent “DEMO DATA — NOT REAL PARTICIPANT RESULTS” label.

### Design and engineering constraints

Prioritize a working end-to-end path over feature count.
Empty, loading, success, pending, blocked, and error states must be intentional and readable.
Validate URL scheme and prevent access to local/private/internal IP ranges from server-side fetches (SSRF protection). If that protection is not implemented, do not fetch arbitrary customer URLs server-side.
Avoid rendering untrusted source HTML. Use safe text extraction and escaping.
Limit request size and rate, avoid public admin routes, and use authorization for report downloads.
Add basic automated tests for URL validation, order states, cost cap, webhook idempotency, report provenance and sample-size labeling.
Before finishing, explain what is truly implemented, what requires environment secrets/third-party setup, which tests passed, what remains manual, and deployment steps. Do not claim integrations work unless exercised with real test events/tools.

Build in this priority order: live landing page → intake/preflight → Whop hosted checkout → actual Terac MCP study trace → evidence-linked report → QA → optional PDF/Exa/Solari extras.

---

## 11. Pitch, Demo, and Investor Narrative

*Source: 11_PITCH_AND_DEMO_SCRIPT.md*

### 60-second pitch

Founders can ship a beautiful page in an hour, but they still have to guess whether a stranger understands the offer. Generic AI can critique the copy, and survey tools can collect answers, but somebody still has to connect evidence to a concrete change.

BeforeSpend is an outcome-driven launch-clarity sprint. A customer submits one public landing page. Our agent checks the page, launches a general-population study through Terac, analyzes real responses, proposes one revision tied to that evidence, and delivers a decision-ready report. Whop handles customer payments. Exa can supply cited public market context, and Solari can verify browser workflows.

We are not claiming five responses predict revenue. We are showing an auditable human-feedback loop: what people understood, what changed, and whether the revised version performs better on the same clarity measures. Our business hypothesis is that productizing this workflow can make a useful first-pass research service cheaper and easier to buy than a custom research engagement.

### Three-minute judge demo

**0:00–0:25 — Customer problem**
Show a public landing page and ask: “Could a stranger say what it does and what they should do next?” Explain that the founder is about to spend time or money on a launch.

**0:25–0:50 — Checkout and scope**
Show exact pilot deliverables, price, limitations, and Whop purchase route. If no actual sale occurred, call it a checkout-ready offer, not revenue.

**0:50–1:25 — Autonomous operations**
Show order status state machine, a real Terac MCP action, study ID, actual quote, budget check, and current recruitment status. Show Exa/Solari only if the integration actually ran and adds value.

**1:25–2:10 — Human evidence to action**
Show real approved responses and the counts. Identify the most common confusion; show the specific copy change the agent proposes. Every quote must map to a real response ID. If results are pending, demonstrate the protocol using clearly labeled fixture data and separately show the live study status; never blur the two.

**2:10–2:35 — Before/after**
Show baseline versus revised version metrics with the actual denominators. If the second cohort has not finished, explicitly label the retest as pending and show only the changes made so far.

**2:35–3:00 — Business**
State actual revenue (if any), actual variable research cost, contribution estimate, and what remains unproven. Close with the next step: repeatable paid pilots, then a self-serve workflow.

### Investor narrative

Pain: small teams must make launch decisions before they have reliable customer language; traditional research may be overkill for the first clarity question, while free AI critique does not provide independent human reactions.

Initial wedge: one-page first-impression clarity test for founders and small businesses immediately before launch/promotion.

Why now: low-code publishing means more people can ship pages quickly; the bottleneck is learning what real people understand. This is a hypothesis to validate using customer interviews and paid pilots, not a quantified market-size claim.

Product advantage: the outcome is a closed loop—order, page preflight, verified human study, evidence map, specific revision, optional re-test—not just a questionnaire or an LLM-generated critique.

Business model: productized one-time reports at first; later usage-based packages and repeat workflows for accelerators, agencies, and small product teams. Pricing must track participant costs and research quality.

Moat hypothesis: accumulated structured links between page patterns, audience context, comprehension errors, revision types, and observed clarity changes. This is a potential advantage only if collected lawfully, with consent, data minimization, and adequate volume; the launch cohort alone is not a moat.

Expansion: message clarity → pricing/offer comprehension → product-concept comparison → creative review, with separate protocols per use case.

What needs proof: repeat purchase, willingness to pay, unit contribution after participant costs, delivery reliability, whether a revised page outperforms baseline, and how general-pop feedback transfers to target-customer decisions.

### Judge criteria mapping

Best Overall: product is a complete outcome and report, not a generic chatbot; real evidence and technical guardrails.

Best Agent-Run Company: real checkout/payment state, autonomous order/research/report flow, transparent real revenue, unit economics, and next customer acquisition loop.

Best Use of Terac: general-population study, real MCP calls, participant data causing a measurable product change, before/after or honest pending state.

Best Use of Exa: cited competitor/reference retrieval feeds a specific market-context section, with source links and date. Do not use it to invent participant feedback.

Best Use of Solari: browser automation checks the actual page and deployed product, captures reproducible screenshots/replay, and validates workflow.

### Claims you can make only after evidence

“We completed X paid orders” only if real Whop payment records exist.
“We improved clarity” only if the defined clarity metric was measured before and after; give n/N.
“We reduced cost” only if you calculate comparable costs for the same scope and show assumptions.
“Autonomous” only for steps the live system actually performed without manual completion.

---

## 12. Unit Economics and Pricing Gates

*Source: 12_UNIT_ECONOMICS.md*

### 1. Never confuse sponsor credits with permanent gross margin

The hackathon credits can subsidize the first experiment and help prove the workflow. They do not demonstrate recurring profitability. The business must eventually cover participant compensation, Terac platform fees, payment fees, hosting, support, refunds, and founder labor.

### 2. Illustrative initial offer

Offer hypothesis: $79 one-time for one page, five approved general-population responses, evidence-backed summary, one headline/subheading/CTA revision, and limitations.

These numbers are planning assumptions. Actual Terac quote must be requested and observed before launch. Official Terac docs say pricing depends on the scope/audience and that the launch review shows participant incentive, fee, and total. Do not assume the amount from a prior study applies to another study.

### 3. Cost cap

For $79 package:

Customer price: $79.
Target variable delivery-cost cap: $35.
Target contribution before payment fee/refunds/support: at least $44 if $35 includes every non-payment variable cost. If payment fees are excluded, include them too in the actual calculation.
Launch rule: if quoted Terac cost + payment fee allowance + variable delivery cost exceeds the cap, do not launch this package at $79.

The cap is a design policy, not a statement of Terac pricing.

### 4. Price/scope decision table

| Condition | Action |
| --- | --- |
| Actual cost within cap and sufficient recruitment capacity | Accept payment, launch and fulfill the published scope |
| Cost above cap before payment | Adjust price/sample size/scope and disclose, or do not sell |
| Cost above cap after payment due to a revised quote | Pause; offer customer a transparent reprice/scope choice or apply published refund policy |
| Sponsor credits cover study cost for the hackathon pilot | May offer a clearly labeled subsidized founding pilot; log sponsor credit as a subsidy, not sustainable unit cost |
| Recruitment turnaround unknown | Do not promise same-day delivery; show status and policies |
| Targeted B2B audience requires a different price or long recruitment | Do not sell the general-population package as B2B research |

### 5. Gross sales arithmetic—not a forecast

7 orders × $79 = $553 gross sales.
10 orders × $79 = $790 gross sales.
18 orders × $29 = $522 gross sales.

These are arithmetic scenarios, not evidence that these order counts are achievable. The $29 example is not recommended for a five-person Terac study without confirming that all variable costs are covered.

### 6. Contribution formula

Contribution = collected revenue − refunds − Whop/payment fees − Terac cost (cash + imputed value of credits) − other per-order delivery costs

For sustainable decisions, record two views:

Cash contribution during hackathon, where subsidized credits may reduce actual cash outlay.
Fully loaded contribution, where credits are valued at their normal replacement price and labor/support is considered.

A company can show real revenue and still have negative contribution. Report both honestly.

### 7. Sales plan

Prioritize in-person organic founder demos and direct, personal outreach during the hackathon. Avoid paid ads until product-market message and checkout are working. Do not use false urgency, fake scarcity, or guaranteed savings. A limited founding-pilot cap is acceptable only when it reflects real fulfillment capacity or a real sponsor-credit subsidy.

---

## 13. Sources and Verification Notes

*Source: SOURCES.md*

This file records sources used for the launch plan. Market prices and sponsor APIs can change; re-open official sources before implementation and before describing a price to a customer.

### Market and competitors

PickFu official pricing — surveys start at $1 per response; pay-as-you-go and subscription options. This indicates very cheap survey response collection already exists, so BeforeSpend should differentiate on end-to-end synthesis and evidence-mapped action rather than claiming lowest price. https://www.pickfu.com/pricing (accessed 2026-10-24 via web search).

Wynter official pricing — B2B research platform pricing includes $20,000/year Pro, $40,000/year Elite, and a $100,000/year managed research tier. Not directly equivalent to general-population testing; use only as evidence that specialist research can be a high-priced category. https://wynter.com/pricing (accessed 2026-10-24 via web search).

LaunchProof.ai — adjacent offering describes landing page creation, paid ads, and validation data over seven days. Competitive warning, not an independently audited performance claim. https://launchproof.ai/ (accessed 2026-10-24).

### Terac

Terac researcher getting started — organization, project, opportunity, recruitment, submission review, credit-based billing and pay-on-approved-work description. https://terac.com/docs/researchers/getting-started

Terac creating an opportunity — workflow to create and price/launch studies, select audience and participant tasks, view incentive, platform fee, and total. https://terac.com/docs/researchers/opportunities/creating-an-opportunity

Terac MCP install guide — MCP endpoint https://terac.com/api/mcp, API-key/OAuth authentication, connect and verify tools. https://terac.com/docs/researchers/mcp/install

Terac MCP overview — public description of human-labor/research workflows and example tool catalog. Confirm available tools in your authenticated connection; do not rely on examples as guaranteed current schema. https://terac.com/mcp

### Sponsor stack

Whop create plan API documentation — demonstrates hosted purchase URL from a plan. Use current official API and webhook docs to create one-time product/plan and verify payment events. https://docs.whop.com/api-reference/plans/create-plan

Lovable publish documentation — publish a web app to a shareable hosted URL and re-publish updates. https://docs.lovable.dev/features/publish

Solari docs — official docs describe browser sessions, Linux VMs, and sandboxes for agent automation; optional for the MVP. https://docs.getsolari.com/

Exa pricing/docs — public search endpoint pricing and free-credit terms can change; use sponsor coupon/credit from the event guide where applicable. https://exa.ai/pricing

### Important distinction

The event guide supplied by the user is authoritative for hackathon-specific rules, including required Terac MCP use, a general-population study, real human input producing a measurable before/after, Whop-only payments, and genuine organic revenue. This pack does not independently verify the user's event account, available credits, current participant quote, payment acceptance, or judge interpretation. Those must be checked in the actual connected accounts.

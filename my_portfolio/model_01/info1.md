# Portfolio Content Resource — Sumit Vikram
### Raw copy, structured content blocks, and assets checklist for portfolio build

---

## HERO SECTION

### Name
```
Sumit Vikram
```

### Tagline Options (pick one)
```
1. "Building intelligent systems. From data pipelines to full-stack apps."
2. "Data Scientist & Full-Stack Developer. I turn data into decisions and ideas into products."
3. "AI/ML Engineer & Web Developer. Where machine learning meets clean code."
4. "Final-Year IT Student. Real-world ML experience. Shipping things that work."
```

### Sub-tagline (one-liner below tagline)
```
B.Tech IT · WBUT · Open to Internship — July 2026
```

### CTA Buttons
```
Primary  → "View My Work"        (scrolls to Projects)
Secondary → "Download Resume"    (links to resume PDF)
Tertiary  → "Let's Connect"      (links to LinkedIn / mailto)
```

### Social Links
```
GitHub    → github.com/vikramsumit
LinkedIn  → linkedin.com/in/sumit-vikram  (or /vikramsumit)
Email     → (your email)
Phone     → +91 8986256596
```

---

## ABOUT SECTION

### Short Version (for hero/intro card — ~50 words)
```
I'm a final-year B.Tech IT student specializing in Data Science, AI/ML, and MERN 
Stack development. I've interned at Labmentix and completed an AICTE-recognized 
IBM SkillsBuild program. I love building end-to-end systems — from training ML 
models to shipping full-stack web apps.
```

### Full Version (for dedicated About page/section — ~120 words)
```
I'm Sumit Vikram, a final-year B.Tech Information Technology student at West Bengal 
University of Technology (WBUT), maintaining an 8.04 GPA.

My work sits at the intersection of machine learning, full-stack development, and 
applied AI. During my internship at Labmentix, I worked on a large-scale retail 
analytics project — processing 421,000+ sales records, engineering 15+ features, 
and deploying production-ready ML models with 95%+ R².

I also built a plant disease detection system using TensorFlow/Keras with ~97.7% 
confidence — a two-stage deep learning pipeline that reached the finals of the 
CICPS Hackathon organized by Jadavpur University, Calcutta University, and GCECT.

Outside of projects, I stay current with frontier AI through IBM SkillsBuild, 
Google, and Cisco certifications. I'm actively seeking internship opportunities 
starting July 2026 in Data Science, AI/ML, or Full-Stack Development.
```

---

## SKILLS SECTION

### Category Breakdown

#### 🧠 AI / ML / Data Science
```
- Machine Learning (Supervised, Ensemble Methods)
- Deep Learning (CNNs, TensorFlow, Keras)
- Feature Engineering & Hyperparameter Tuning
- ETL Pipelines & Data Preprocessing
- Model Evaluation & Deployment
- Generative AI & Prompt Engineering
- Agentic AI & LLM Workflows
- Data Visualization (Matplotlib, Seaborn)
- Libraries: Scikit-learn, Pandas, NumPy, PyTorch
```

#### 💻 Web & Full-Stack
```
- Frontend: React.js, Next.js, Tailwind CSS, Vite
- Backend: Node.js, Express.js, Flask
- Database: MongoDB, MySQL
- API: REST API Design, JWT Authentication
- Tools: Git, GitHub, Figma (basics), Canva, Google Colab
```

#### 🔤 Programming Languages
```
- Python     ████████████░░  (Primary — ML & scripting)
- JavaScript ██████████░░░░  (Full-stack web)
- Java       ████████░░░░░░  (DSA & competitive programming)
- C          ██████░░░░░░░░  (Systems & Cisco coursework)
```

#### 🔐 Cybersecurity & Networking (Foundational)
```
- Foundations of Cybersecurity (Google)
- Security Risk Management
- CCNA7: Switching, Routing & Wireless Essentials
- Introduction to IoT Cybersecurity
- IT Essentials
```

#### ⚙️ Tools & Platforms
```
Git · GitHub · Linux · Google Colab · VS Code · Postman
Figma (basics) · Canva · Jupyter Notebook · Docker (learning)
```

---

## PROJECTS SECTION

---

### Project 1 — Plant Disease Detection System

| Field | Value |
|---|---|
| **Type** | AI/ML + Full-Stack Web App |
| **Date** | November 2025 |
| **Status** | Completed · Hackathon Finalist |
| **Stack** | Python · TensorFlow · Keras · Express.js · React.js · Vite · Node.js |

#### Headline
```
AI-powered plant disease detection with ~97.7% confidence across 9 plant species.
```

#### Problem Statement
```
Manual identification of plant diseases is slow, expert-dependent, and unscalable for 
large farms. Crop diseases directly impact agricultural productivity and food security.
```

#### What I Built
```
A two-stage deep learning pipeline:
1. Plant Identifier — classifies which of 9 supported plants is in the image
2. Disease Classifier — detects the specific disease from the identified plant

Supported plants: Apple, Bell Pepper, Cherry, Corn (Maize), Grape, Peach, Potato, 
Strawberry, Tomato
```

#### Technical Details
```
Dataset:     PlantVillage (Kaggle) — ~150K images (~1M+ with augmentation)
Model:       Custom CNN — Conv2D + BatchNorm + MaxPool + GlobalAvgPool + Dropout
Optimizer:   Adam | Loss: SparseCategoricalCrossentropy
Augmentation: RandomRotation, RandomFlip, RandomZoom, Brightness/Contrast variation
Input size:  256×256 RGB
```

#### Performance
```
Training Accuracy:   95–98%
Validation Accuracy: 93–96%
Test Accuracy:       92–95%
Confidence (live):   ~97.7%
```

#### Interfaces Built
```
• CLI tool — batch prediction + CSV report export (Python)
• Web App  — React + Vite frontend + Express.js REST API backend
  - Camera capture or image upload
  - Real-time disease prediction
  - Treatment & prevention guide per disease
```

#### Achievement
```
🏆 Finalist — CICPS Hackathon
   Organized by: Jadavpur University × Calcutta University × GCECT
```

#### Tags (for portfolio filter)
```
#MachineLearning #DeepLearning #TensorFlow #React #FullStack #Python #CNN #WebApp
```

#### Asset Checklist
```
[ ] GitHub repo link
[ ] Live demo link (if deployed)
[ ] 2–3 screenshots (home page, capture page, results page)
[ ] Model accuracy graph image (training vs validation curve)
```

---

### Project 2 — Integrated Retail Analytics Dashboard

| Field | Value |
|---|---|
| **Type** | Data Science / ML · Analytics |
| **Date** | October 2025 |
| **Status** | Completed (Labmentix Internship) |
| **Stack** | Python · Pandas · Scikit-learn · Matplotlib · Seaborn · Jupyter |

#### Headline
```
End-to-end ML pipeline on 421,000+ retail sales records — 95%+ R² across 6 models.
```

#### Problem Statement
```
Retail chains operating across many stores and departments struggle to identify 
underperforming segments, forecast sales accurately, and understand the true 
impact of promotions and seasonal patterns on revenue.
```

#### What I Built
```
A complete retail analytics pipeline covering:
- Large-scale data ingestion and cleaning (50%+ missing promotional data handled)
- Feature engineering (15+ temporal and business features)
- Multi-model ML comparison and selection
- Interactive visualizations for business stakeholders
```

#### Scale
```
Sales records:  421,000+
Stores:         45
Departments:    99
Features built: 15+
Models compared: 6
```

#### Models Compared
```
1. Linear Regression
2. Ridge Regression
3. Lasso Regression
4. Random Forest        ← Best performer
5. Gradient Boosting
6. (Ensemble baseline)

Tuning: Grid Search CV | Best R²: 95%+
```

#### Key Findings
```
• Holiday effects drove 15%+ sales lift
• Seasonal patterns were the strongest sales predictor
• Promotional effectiveness varied significantly by store type
• Several departments showed consistent underperformance
```

#### Deliverables
```
• Production-ready trained model
• 15+ interactive visualizations (department gaps, store efficiency)
• Stakeholder-ready insights report
```

#### Tags
```
#DataScience #MachineLearning #Python #Pandas #ScikitLearn #EDA #FeatureEngineering #Analytics
```

#### Asset Checklist
```
[ ] GitHub repo or Kaggle notebook link
[ ] 2–3 visualization screenshots
[ ] Brief methodology diagram (optional)
```

---

### Project 3 — Web Projects (Group Card)

*Show these as a grid of smaller cards*

| Project | Stack | Link |
|---|---|---|
| Netflix Clone | React.js, Tailwind, TMDB API | GitHub |
| Spotify Clone | React.js, Tailwind | GitHub |
| Get Me Chai App | Next.js, Node.js, MongoDB, Razorpay | GitHub |
| TripMate App | React.js / Next.js | GitHub |

> For each: Add a brief 1-line description + screenshot + GitHub link

---

## EXPERIENCE SECTION

---

### Experience 1 — Labmentix Pvt. Ltd.

```
Role:     Data Science & AI/ML Intern
Duration: September 2025 – November 2025  (2 months)
Type:     Remote Internship
```

**What I did:**
```
• Processed and analyzed 421,000+ retail sales records across 45 stores and 99 departments
• Engineered 15+ temporal and business features from raw transaction data
• Handled 50%+ missing promotional data with appropriate imputation strategies
• Trained and benchmarked 6 ML models; achieved 95%+ R² via Grid Search CV
• Identified seasonal patterns, holiday effects, and promotional impact on revenue
• Built 15+ interactive visualizations for department and store performance analysis
• Deployed a production-ready predictive model
```

**Certificates:**
- Certificate of Internship (Sep 15 – Oct 15, 2025)
- Certificate of Internship (Oct 5 – Nov 5, 2025)

---

### Experience 2 — CSRBOX / IBM SkillsBuild (AICTE)

```
Role:     AI Strategy & Business Intelligence Intern
Duration: March 2, 2026 – April 12, 2026  (6 weeks)
Type:     Virtual · AICTE Recognized
ID:       2026AICSIB1509
```

**What I did:**
```
• Selected for the 6-week IBM SkillsBuild program via CSRBOX × AICTE
• Studied Generative AI, Agentic AI, and LLM-powered automation workflows
• Applied AI strategy frameworks to business intelligence use cases
```

---

## EDUCATION SECTION

| Degree | Institution | Year | Score |
|---|---|---|---|
| B.Tech — Information Technology | West Bengal University of Technology (WBUT) | 2024–2027 | 8.04 / 10 GPA |
| Diploma — Computer Science & Engineering | New Govt. Polytechnic, Patna | 2021–2024 | 8.15 / 10 GPA |
| CBSE Class X | Cambridge School, Nalanda | 2020 | 87.6% |

---

## CERTIFICATIONS SECTION

### IBM
| Certificate | Platform | Date | Verify |
|---|---|---|---|
| Introduction to Software Engineering | Coursera | May 22, 2026 | coursera.org/verify/DH9WY9GDPYRK |
| Artificial Intelligence Fundamentals | IBM SkillsBuild (Credly) | Dec 28, 2024 | credly.com/badges/8efd50b3-... |
| Generative AI in Action | IBM SkillsBuild (Credly) | Dec 31, 2024 | credly.com/badges/ec5572b7-... |
| AI Strategy & Business Intelligence | CSRBOX × AICTE × IBM SkillsBuild | Apr 2026 | ID: 2026AICSIB1509 |

### Google
| Certificate | Platform | Date | Verify |
|---|---|---|---|
| Foundations of Cybersecurity | Coursera | Mar 18, 2024 | coursera.org/verify/XNHVP8TPMBDT |
| Play It Safe: Manage Security Risks | Coursera | Mar 17, 2024 | coursera.org/verify/2R4M482V7EQU |

### Cisco NetAcad
| Certificate |
|---|
| CCNA7: Switching, Routing and Wireless Essentials |
| Introduction to IoT Cybersecurity |
| IoT Fundamentals: Connecting Things |
| IoT Fundamentals: Data and Analytics |
| IT Essentials |
| Python Programming Essentials |
| Programming Essentials in C |
| Advanced C Programming |
| Entrepreneurship |

> Add dates and Credly/NetAcad verify links for each Cisco cert from your NetAcad dashboard.

---

## ACHIEVEMENTS & RECOGNITION

```
🏆  Finalist — CICPS Hackathon 2025
    Organized by Jadavpur University × Calcutta University × GCECT
    Project: Plant Disease Detection System

📜  AICTE-Recognized Internship (IBM SkillsBuild via CSRBOX)
    Unique ID: 2026AICSIB1509

🎓  8.04 GPA — B.Tech IT, WBUT
🎓  8.15 GPA — Diploma CSE, New Govt. Polytechnic Patna
```

---

## CONTACT SECTION

```
Heading:  "Let's Build Something"
Sub:      "Open to internship opportunities from July 2026."

Items:
📧  Email   → (your email)
📱  Phone   → +91 8986256596
🔗  GitHub  → github.com/vikramsumit
💼  LinkedIn → linkedin.com/in/sumit-vikram
📄  Resume  → (downloadable PDF link)
```

---

## ASSET CHECKLIST (before you build)

### Must-haves
```
[ ] Professional headshot (400×400px minimum, plain background)
[ ] Resume PDF (latest version — download-ready)
[ ] GitHub profile polished (pinned repos: Plant Disease + Retail Analytics + web projects)
[ ] Plant Disease Detection — 3 screenshots (home, upload, results)
[ ] Plant Disease Detection — accuracy/loss curve graph (already in your report)
[ ] Retail Analytics — at least 2 visualization screenshots
[ ] All certificate PDFs (for a /certificates page or downloadable section)
```

### Nice-to-haves
```
[ ] Demo video (30–60 sec screen recording of Plant Disease app)
[ ] Retail Analytics — Kaggle notebook public link
[ ] Project thumbnails (1200×630px OG image per project for link previews)
[ ] Favicon (initials "SV" in your brand color)
```

---

## PORTFOLIO SECTIONS ORDER (Recommended)

```
1. Hero          — Name, tagline, CTA buttons, social links
2. About         — Short bio + photo
3. Skills        — Categorized grid (AI/ML · Web · Languages · Tools)
4. Projects      — Featured cards (Plant Disease + Retail Analytics) + Web projects grid
5. Experience    — Timeline (Labmentix → CSRBOX/IBM)
6. Education     — Cards or timeline
7. Certifications — Logo grid (IBM · Google · Cisco)
8. Achievements  — Hackathon finalist, GPA highlights
9. Contact       — Email form + social links + resume download
```

---

*Content resource for portfolio.  
Sumit Vikram | GitHub: vikramsumit | B.Tech IT, WBUT 2027*
# Speed, time, and distance — practice set from AR pool

**Data source:** [`math-study/src/data/arithmeticReasoningPracticeQuestions.json`](../math-study/src/data/arithmeticReasoningPracticeQuestions.json)  
**Tests represented:** `practice-1`, `practice-2`, `practice-3` (per file `meta.sources`).

**How this list was built**

- Every item tagged **`bucket: "rate-distance-time"`** is included (that is the app’s “distance / speed / time” category).
- A few **related** stems from other buckets are added where they still train motion, time rates, map distance, or speed conversion (noted under each).
- **Practice 1 and Practice 3** share the **same five** `rate-distance-time` word problems (duplicate stems; IDs differ: `ar-p1-*` vs `ar-p3-*`). They are listed **once** here; see [Duplicate IDs](#duplicate-ids-practice-1-vs-practice-3) if you want both copies.

**Round trip (Pattern 4)** and **wind/current (Pattern 5)** in the strict sense do **not** appear as dedicated items in this JSON pool. Notes are under those headings.

---

## Pattern quick reference

| Pattern | Situation | Key trick |
|--------|-----------|-----------|
| **1** | Basic motion | Use **\(d = r \times t\)** and rearrange: \(t = d/r\), \(r = d/t\). Same units. |
| **2** | Opposite directions | **Separation speed** = sum of speeds; distance apart = \((r_1 + r_2) \times t\). |
| **3** | Catch-up | **Head start** then **relative speed** = faster − slower; close the gap. |
| **4** | Round trip | **Average speed** = total distance ÷ total time (not average of the two speeds). |
| **5** | Wind / current | Ground speed = air/water speed ± current (with the current: add; against: subtract). |
| **6** | Fuel / efficiency | Multi-step: distance → gallons → cost (or any pipeline: rate × time → …). |

---

## Pattern 1 — Basic motion (multiply / divide)

**Key trick:** One of distance, rate, or time is unknown; set up \(d = r \times t\) (or equivalent with consistent units).

### 1.1 — Keith (time from distance and speed)

**ID:** `ar-p1-023` / `ar-p3-023` · **Practice:** 1 & 3 · **Bucket:** `rate-distance-time`

Keith is driving from Reno to Kansas City to meet his girlfriend. The distance between the two cities is 1,650 miles. If Keith can average 50 miles per hour, how many hours will it take him to complete his trip?

- **A)** 8 hours  
- **B)** 30 hours  
- **C)** 33 hours  
- **D)** 82 hours  

---

### 1.2 — Security guard (time from a walking rate)

**ID:** `ar-p1-013` / `ar-p3-013` · **Practice:** 1 & 3 · **Bucket:** `rate-distance-time`

A security guard walks the equivalent of six city blocks when he makes a circuit around the building. If he walks at a pace of eight city blocks every 30 minutes, how long will it take him to complete a circuit around the building, assuming he doesn't run into any thieves?

- **A)** 20.00 minutes  
- **B)** 3.75 minutes  
- **C)** 22.50 minutes  
- **D)** 7.5 minutes *(practice-1)* / **24.00 minutes** *(practice-3)*

---

### 1.3 — Architect scale (distance from map scale) — *related*

**ID:** `ar-p2-018` · **Practice:** 2 · **Bucket:** `ratios`  

Not a speed problem, but **distance from a scale** (same “multiply by the rate” idea as miles per inch on a map).

An architect's floor plan uses 1/2 inch to represent one mile. What is the actual distance represented by 4 1/2 inches?

- **A)** 9 miles  
- **B)** 8 miles  
- **C)** 7 miles  
- **D)** 6 miles  

---

## Pattern 2 — Opposite directions (add speeds)

**Key trick:** Trains (or people) moving **away** from the same point: use **sum of speeds** × time.

### 2.1 — Two trains

**ID:** `ar-p1-026` / `ar-p3-026` · **Practice:** 1 & 3 · **Bucket:** `rate-distance-time`

A train headed south for Wichita left the station at the same time a train headed north for Des Moines left the same station. The train headed for Wichita traveled at 55 miles per hour. The train headed for Des Moines traveled at 70 miles per hour. How many miles apart **are** the trains at the end of 3 hours? *(practice-3 wording: “were” the trains)*

- **A)** 210 miles  
- **B)** 165 miles  
- **C)** 125 miles  
- **D)** 375 miles  

---

## Pattern 3 — Catch-up (subtract speeds / head start)

**Key trick:** Late starter must **close a distance gap** built by the first mover; then use **relative speed** (faster − slower) or equal distances at catch-up time.

### 3.1 — Alice and Dave

**ID:** `ar-p1-010` / `ar-p3-010` · **Practice:** 1 & 3 · **Bucket:** `rate-distance-time`

Alice leaves her house, driving east at 45 miles per hour (mph). Thirty minutes later, her husband Dave notices she forgot her cell phone and sets off after her. How fast must Dave travel in order to catch up with Alice **3 hours after he leaves**?

- **A)** 49 mph  
- **B)** 50.5 mph  
- **C)** 52.5 mph  
- **D)** 54 mph  

---

## Pattern 4 — Round trip (total distance ÷ total time)

**Key trick:** Average speed for a trip with two (or more) legs = **total miles ÷ total hours**, not the average of the two speeds.

**Pool note:** None of the 90-question practice JSON items is a clean “go and return, find overall average speed” template. When you see one on the real test, use **total distance ÷ total time** every time.

---

## Pattern 5 — Wind / current (add or subtract current)

**Key trick:** Effective speed with wind or current: **plus** when helping you, **minus** when opposing.

**Pool note:** There is **no** classic airplane (airspeed vs ground speed) or boat (upstream/downstream) item in this file.

### 5.1 — Karl (speed unit conversion) — *closest cousin*

**ID:** `ar-p1-018` / `ar-p3-018` · **Practice:** 1 & 3 · **Bucket:** `unit-conversion`

Karl is driving in Austria, where the speed limit is posted in kilometers per hour. The car's speedometer shows that he's traveling at a rate of 75 kilometers per hour. Karl knows that a kilometer is about 5/8 of a mile. Approximately how many miles per hour is Karl traveling?

- **A)** 47  
- **B)** 120  
- **C)** 50  
- **D)** 53  

---

## Pattern 6 — Fuel / efficiency (multi-step pipeline)

**Key trick:** Chain steps: e.g. **hours × mph → miles → miles/gallon → gallons → $/gallon → dollars**.

### 6.1 — Gasoline cost for a trip

**ID:** `ar-p1-030` / `ar-p3-030` · **Practice:** 1 & 3 · **Bucket:** `rate-distance-time`

Your car uses gasoline at the rate of 21 miles per gallon. If gasoline costs $2.82 per gallon and you drive for 7 hours at a speed of 48 miles per hour, how much will you pay for gasoline for the trip?

- **A)** $38.18  
- **B)** $45.12  
- **C)** $47.73  
- **D)** $59.27 *(practice-3 option D omits the “$” in JSON — treat as dollars)*  

---

## Extra drills (time / travel context, other buckets)

### A — Email checks (fixed time interval)

**ID:** `ar-p2-008` · **Practice:** 2 · **Bucket:** `rate-multiply`  

While at work, Nina checks her email once every 80 minutes. In her 8-hour work shift, how many times does she check her email?

- **A)** 6 times  
- **B)** 7 times  
- **C)** 5 times  
- **D)** 4 times  

*Trains: total minutes in shift ÷ minutes per cycle (watch endpoints / rounding the test expects).*

---

### B — Recruiter travel time (fraction of workweek)

**ID:** `ar-p1-029` · **Practice:** 1 · **Bucket:** `fractions`  
**ID:** `ar-p3-029` · **Practice:** 3 · **Bucket:** `fractions` (same stem; practice-3 uses “2⁄5” and option B is “5½” instead of “5”.)

A recruiter travels 1,100 miles during a 40-hour workweek. If she spends 2/5 of her time traveling, how many hours does she spend traveling?

- **A)** 22  
- **B)** 5 *(p1)* / **5½** *(p3)*  
- **C)** 16  
- **D)** 8  

*The 1,100 miles is context; the asked quantity is **hours** from a **fraction of 40**.*

---

## Duplicate IDs (practice 1 vs practice 3)

Same stem and same official **`rate-distance-time`** items appear twice:

| Topic | Practice 1 ID | Practice 3 ID |
|--------|----------------|---------------|
| Alice / Dave | `ar-p1-010` | `ar-p3-010` |
| Security guard | `ar-p1-013` | `ar-p3-013` |
| Keith | `ar-p1-023` | `ar-p3-023` |
| Trains | `ar-p1-026` | `ar-p3-026` |
| Gas cost | `ar-p1-030` | `ar-p3-030` |

Karl (`ar-p1-018` / `ar-p3-018`) is duplicated the same way for **unit-conversion**.

---

## Answer key

| ID(s) | Answer |
|--------|--------|
| `ar-p1-023`, `ar-p3-023` | **C** — 33 hours |
| `ar-p1-013`, `ar-p3-013` | **C** — 22.50 minutes |
| `ar-p2-018` | **A** — 9 miles |
| `ar-p1-026`, `ar-p3-026` | **D** — 375 miles |
| `ar-p1-010`, `ar-p3-010` | **C** — 52.5 mph |
| `ar-p1-018`, `ar-p3-018` | **A** — 47 |
| `ar-p1-030`, `ar-p3-030` | **B** — $45.12 |
| `ar-p2-008` | **A** — 6 times |
| `ar-p1-029`, `ar-p3-029` | **C** — 16 |

---

*Generated from the in-repo Arithmetic Reasoning practice question pool. For worked explanations, use the in-app solutions on each topic or expand items in `arTestQuestionSolutions` where present.*

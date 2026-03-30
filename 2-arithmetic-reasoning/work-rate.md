# Work rate — master lesson & elite practice (ASVAB Arithmetic Reasoning)

**Data source (canonical in-repo pool):** [`math-study/src/data/arithmeticReasoningPracticeQuestions.json`](../math-study/src/data/arithmeticReasoningPracticeQuestions.json)

**How this document fits the pool**

- The 90-question practice export is tagged by **bucket** (for example `rate-distance-time`, `rate-multiply`). There is **no `work-rate` bucket** in that file today, so there are **no dedicated pipe/worker items to pull by ID** the same way as the [speed, time, and distance practice pool](./speed-time-distance-practice-pool.md).
- Everything below is **curriculum**: pattern reference, drills, tiered practice, and **synthetic elite** multiple-choice items written to match ASVAB style (rates, fractions, one “full job,” clear answer choices).

**Related in-repo lesson (motion analogy):** [speed-time-distance-practice-pool.md](./speed-time-distance-practice-pool.md) — same *rate × time = amount* structure; for work problems “amount” is **fraction of one job** (usually normalized to **1**).

---

## Test-style reminders (Arithmetic Reasoning)

On the real Arithmetic Reasoning section, stems are **full word problems**, not note-style fragments. Before you choose an answer:

- **Match the question:** “How many **more** hours?” is only the **extra** time after a change—not always the **total** time for the whole job.
- **One job:** unless the problem says otherwise, every worker or pipe is working toward **the same single** task (one order, one tank, one fence).
- **Opposing work:** filling **vs** draining (or progress **vs** undoing) means **subtract** the rate that works **against** the goal.
- **Phase changes:** when someone **joins** or **stops**, find how much of the job is **already done**, then use the **new** rate on what’s **left**.
- **Common trap:** do **not** “average” the times for people working together; use **1 ÷ time** for each, **add** those rates, then **flip** to get combined time.

---

## Bridge: same idea as distance / speed / time

| Motion (DST) | Work rate |
|--------------|-----------|
| **distance** = speed × time | **work done** = rate × time |
| speed = distance ÷ time | **rate** = (1 job) ÷ time to finish **alone** → **1/time** (job per hour) |
| time = distance ÷ speed | **time to finish** = (work left) ÷ **combined rate** |

**Mental flip:** do not stop at “how many hours?” — always find **jobs per hour** first when people or pipes work **together** or **against** each other.

---

## Pattern quick reference

| Pattern | Situation | Key trick |
|--------|-----------|-----------|
| **1** | Same job, helpers together | **Add** rates: \(\frac{1}{a} + \frac{1}{b} + \cdots\); time \(= 1 \div\) sum |
| **2** | Fill **and** drain (or help **and** hinder) | **Subtract** opposing rate: \(\frac{1}{\text{fill}} - \frac{1}{\text{empty}}\) (signs from the story) |
| **3** | Partial work / someone joins late | **Phase 1:** work done \(=\) rate × time; **Phase 2:** new combined rate on **remainder** |
| **4** | Together, then someone leaves | **Phase 1** combined rate × time; **Phase 2** one rate on remainder |
| **5** | Same-speed crew scaling / three pipes | **n** identical workers: \(n \times \frac{1}{T_\text{one}}\); three **different** times: add \(\frac{1}{t_1}+\frac{1}{t_2}+\frac{1}{t_3}\) |

**Pool note:** There is no work-rate row in the 90-question JSON yet; train here so pattern #6 on your AR pattern list still feels automatic on test day.

---

## Core algorithm (always)

1. Convert each entity to a rate **per hour** (per minute if the problem uses that unit): **rate = 1 ÷ time to do the whole job alone**.
2. **Add** rates that help the same outcome; **subtract** rates that oppose (emptying vs filling).
3. **Time** = (fraction of job left) ÷ (relevant combined rate). For one full job from empty: time \(= 1 \div\) combined rate.

---

## Pattern 1 — Together (add rates)

**Visual**

```
Worker A  ──rate 1/a ──►  1 job
Worker B  ──rate 1/b ──►  same job
Together: 1/a + 1/b jobs per hour →  full job in 1 ÷ (1/a + 1/b) hours
```

**Example.** Maria can paint a certain room in **4 hours** working alone. James can paint that **same** room in **6 hours** working alone. If they work together at those rates, how many hours will it take them to paint the room?

*Warning:* Averaging 4 and 6 is a trap—the setup needs **combined rates**, not an average of the times.

- \( \frac{1}{4} + \frac{1}{6} = \frac{5}{12} \) of the room per hour → time \(= \frac{12}{5} = 2.4\) hours.

<details>
<summary>Quick check (mental)</summary>

About \(25\% + 16.7\%\) of the job per hour ≈ \(41.7\%\) per hour → a bit over 2 hours for 100%.  

</details>

---

## Pattern 2 — Fill vs drain (subtract rates)

**Visual**

```
IN  +1/4  tank/hr  ──►
OUT  −1/8  tank/hr  ◄──
Net: 1/4 − 1/8 = 1/8 tank/hr toward full
```

**Example.** The water tank starts **empty**. An inlet can fill the whole tank in **4 hours**. A drain can empty a **full** tank in **8 hours**. If both are opened at the same time, how many hours until the tank is **full**?

*Warning:* Items on the Arithmetic Reasoning section use **ideal** steady rates—follow the numbers given, combine \(\frac{1}{\text{fill time}}\) and \(\frac{1}{\text{drain time}}\), then solve.

- Inlet: \(\frac{1}{4}\) tank per hour. Drain: \(\frac{1}{8}\) tank per hour **removed**.
- Net toward full: \(\frac{1}{4} - \frac{1}{8} = \frac{1}{8}\) tank per hour.
- From empty to full you need 1 whole tank: \(1 \div \frac{1}{8} =\) **8 hours**.

---

## Pattern 3 — Partial work / join late

**Example.** One mechanic can overhaul an engine in **12 hours** working alone. The mechanic works alone for **4 hours**, and then a second mechanic with the **same** working rate joins **without** changing anyone’s speed. How many **total hours** from the start will it take to finish the overhaul?

*Warning:* Don’t reset the clock—phase 1 already completes part of the job.

- First 4 hr: \(4 \times \frac{1}{12} = \frac{1}{3}\) done → **\(\frac{2}{3}\)** left.
- Two equal workers: \(2 \times \frac{1}{12} = \frac{1}{6}\) per hour.
- Time on remainder: \(\frac{2}{3} \div \frac{1}{6} = 4\) hr → **total 8 hours**.

---

## Pattern 4 — Together, then someone leaves

**Example.** **Technician K** can calibrate a piece of equipment in **5 hours** alone. Technician L can calibrate the **same** equipment in **10 hours** alone. They work **together** for **2 hours**, then **L** stops and **K** finishes alone. How many **additional** hours does **K** need after L stops?

*Warning:* The question asks for **more** hours for K, not total hours for the whole job.

- Combined rate: \(\frac{1}{5} + \frac{1}{10} = \frac{3}{10}\) → in 2 hr: \(\frac{6}{10} = \frac{3}{5}\) done → **\(\frac{2}{5}\)** left.
- A’s rate \(\frac{1}{5}\): time \(= \frac{2}{5} \div \frac{1}{5} = 2\) **more hours**.

---

## Pattern 5 — Crew scaling / three pipes

**Scaling (same skill).** A **crew of three** lab technicians, all working at the **same individual** speed, can finish a batch of tests in **6 hours**. If only **one** technician worked at that same rate, how many hours would the **same** batch take?

- Combined rate for three: \(\frac{1}{6}\) batch per hour → one person is one-third of that: **\(\frac{1}{18}\)** per hour → **18 hours** alone.

**Three different pipes.** An empty storage tank has **three inlet pipes**. Used alone, the first inlet could fill the tank in **6 hours**, the second in **12 hours**, and the third in **18 hours**. If **all three** are opened together, how many hours are needed to fill the tank?

- \(\frac{1}{6} + \frac{1}{12} + \frac{1}{18} = \frac{11}{36}\) → time \(= \frac{36}{11} \approx 3.27\) hours.

---

## Practice tiers (full word problems — work them without looking at the solution table first)

### Easy

**Q1.** A single soldier can dig a defensive trench in **8 hours** at a steady rate. If **two** soldiers dig at that **same** individual rate and work together, how many hours will they need to dig **one** trench?

**Q2.** Private Rowe can load a supply truck in **10 hours** working alone. Private Chen can load the **same** truck in **5 hours** working alone. If they work together at those rates, how long will it take to load the truck?

### Medium

**Q3.** A fire tank has two hydrant lines. Line **A**, used alone, can fill the tank in **3 hours**. Line **B**, used alone, can fill the **same** tank in **6 hours**. If **both** lines are used together from an **empty** start, how many hours will it take to fill the tank?

**Q4.** One clerk can process a stack of forms in **12 hours** alone. The clerk works alone for **4 hours**, then a second clerk with the **same** speed joins, and they finish together. How many hours does the job take **in total** from the beginning?

### Hard

**Q5.** A reservoir starts **empty**. Inlet valve **A**, by itself, can fill the reservoir in **4 hours**. Drain valve **B**, by itself, can empty a **full** reservoir in **8 hours**. If **both** valves are opened at the same time, how many hours will it take until the reservoir is **full**?

**Q6.** Three painters, all with the **same** individual speed, can paint a hangar bay in **6 hours** working together. How many hours would **one** of these painters need to paint the **same** bay alone?

### Elite (multi-step)

**Q7.** Specialist **P** can complete a maintenance checklist in **5 hours** alone. Specialist **Q** can complete the **same** checklist in **10 hours** alone. They work **together** for **2 hours**, then **Q** is reassigned and **P** finishes alone. How many **more** hours does **P** need after Q leaves?

**Q8.** Crew member **X** can strip and varnish a deck in **8 hours** alone. Crew member **Y** can do the **same** deck in **12 hours** alone. They start **together**. After how many hours of working **together** will **half** of the deck be done?

---

## Elite multiple choice (synthetic — not from pool IDs)

*These are written like typical Arithmetic Reasoning stems: one paragraph, clear question, four options.*

### EL-1

A water tank is **already half full**. An inlet pipe, used alone, could fill the tank from **empty** to **full** in **4 hours**. An outlet pipe, used alone, could empty a **full** tank in **8 hours**. If **both** the inlet and the outlet are opened at the same time, how many **hours** will it take for the water level to reach **full**?

- **A)** 2  
- **B)** 3  
- **C)** 4  
- **D)** 6  

### EL-2

**Sergeant Diaz** can complete an inventory count in **10 hours** working alone. **Corporal Evans** can complete the **same** inventory in **15 hours** working alone. Diaz works **alone** for **2 hours**, then Diaz and Evans work **together** until the inventory is finished. How many **total hours** does the job take from the start?

- **A)** 6.4  
- **B)** 6.8  
- **C)** 7.2  
- **D)** 8.0  

### EL-3

Three hoses can each fill a swimming pool when used **by itself**: the first would fill the pool in **6 hours**, the second in **12 hours**, and the third in **18 hours**. The pool is **empty**, and **all three** hoses are used together from the start. Rounded to the **nearest hundredth** of an hour, how long will it take to fill the pool?

- **A)** 3.00  
- **B)** 3.27  
- **C)** 3.67  
- **D)** 4.00  

### EL-4

Pipe **A**, by itself, can fill an empty fuel tank in **4 hours**. Pipe **B**, by itself, can fill the **same** tank in **6 hours**. The tank starts **empty**. **Both** pipes are opened for **exactly 1 hour**, then pipe **B** is shut off and only **A** continues. How many **more hours** must pipe **A** run alone before the tank is **full**?

- **A)** \(2\frac{1}{3}\) (or \(7/3\))  
- **B)** 2.5  
- **C)** 3  
- **D)** \(3\frac{1}{3}\)  

### EL-5

Technician Gordon can replace a radar module in **8 hours** working alone. Technician Hayes can replace the **same** module in **12 hours** working alone. They work **together** at those rates for **2 hours**, then Gordon leaves and Hayes completes the job alone. How many **more hours** must Hayes work **after** Gordon leaves?

- **A)** 5  
- **B)** 6  
- **C)** 7  
- **D)** 8  

---

## Solutions — short answer

| Item | Result |
|------|--------|
| Q1 | \(2 \times \frac{1}{8} = \frac{1}{4}\) → **4 hours** |
| Q2 | \(\frac{1}{10}+\frac{1}{5}=\frac{3}{10}\) → **\(10/3 \approx 3.33\)** hours |
| Q3 | \(\frac{1}{3}+\frac{1}{6}=\frac{1}{2}\) → **2 hours** |
| Q4 | Remaining \(\frac{2}{3}\) at \(\frac{1}{6}\)/hr → **8 hours** total |
| Q5 | \(\frac{1}{4}-\frac{1}{8}=\frac{1}{8}\) → **8 hours** |
| Q6 | One worker \(\frac{1}{18}\)/hr → **18 hours** |
| Q7 | **2 more hours** |
| Q8 | **\(12/5 = 2.4\)** hours |

<details>
<summary>Elite MC — worked checks</summary>

- **EL-1:** Need \(\frac{1}{2}\) tank at net \(\frac{1}{4}-\frac{1}{8}=\frac{1}{8}\)/hr → **4 hours**.  
- **EL-2:** A does \(\frac{2}{10}\); left \(\frac{4}{5}\); combined \(\frac{1}{6}\)/hr → \(\frac{24}{5}=4.8\) hr more; total **6.8**.  
- **EL-3:** \(\frac{1}{6}+\frac{1}{12}+\frac{1}{18}=\frac{11}{36}\) → \(\frac{36}{11} \approx 3.27\).  
- **EL-4:** In 1 hr: \(\frac{5}{12}\) filled; need \(\frac{7}{12}\) at \(\frac{1}{4}\)/hr → \(\frac{7}{3}=2\frac{1}{3}\) hr.  
- **EL-5:** In 2 hr: \(2\times\frac{5}{24}=\frac{5}{12}\) done; \(\frac{7}{12}\) left for B at \(\frac{1}{12}\)/hr → **7 hours**.

</details>

---

## Answer key (elite multiple choice)

| Item | Correct | Short reason |
|------|---------|----------------|
| EL-1 | **C** | Half tank at net \(\frac{1}{8}\) tank/hr → 4 hr |
| EL-2 | **B** | \(2 + 4.8 = 6.8\) hr total |
| EL-3 | **B** | \(\frac{36}{11} \approx 3.27\) hr |
| EL-4 | **A** | \(\frac{7}{12} \div \frac{1}{4} = \frac{7}{3}\) hr |
| EL-5 | **C** | \(\frac{7}{12}\) job at \(\frac{1}{12}\) job/hr → 7 hr |

---

## Pattern summary (memorize)

```
1. Convert each time → rate = jobs/hour = 1/time
2. Add helpful rates; subtract opposing rates
3. Time = (job left) ÷ (net rate)
```

For identical workers: **double crew → half the time** (same per-person rate).

---

*For motion problems using the same rate structure, see [speed-time-distance-practice-pool.md](./speed-time-distance-practice-pool.md).*
</think>
Fixing EL-5: recalculating and updating the markdown — prior numbers yielded 8.25 hours, which wasn't in the options.

<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace
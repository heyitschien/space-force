Chien — I’m going to redesign this **exactly how I would build it for maximum learning speed** while keeping it **compact, intuitive, and agent-implementable**.

The goal is:

**Recognize pattern → apply formula → solve fast**

Your page becomes a **pattern training system** instead of a text explanation.

---

# Redesigned Page Structure

```
Distance, Speed & Time — Arithmetic Reasoning
```

Small subtitle:

```
Master the 6 motion patterns used on the ASVAB
```

---

# SECTION 1 — Core Formula (Top Anchor)

At the very top show the **one formula everything comes from**.

d = vt

Then the memory triangle.

```
      D
     ---
     S  T
```

Cover the variable you want.

```
Distance = Speed × Time
Speed = Distance ÷ Time
Time = Distance ÷ Speed
```

Quick rule:

```
Distance problems = identify motion pattern
```

---

# SECTION 2 — Pattern Recognition Map

Before teaching anything, show the **6 patterns visually**.

```
Distance-Speed-Time Patterns
```

| Pattern | Situation           | Key Trick                   |
| ------- | ------------------- | --------------------------- |
| 1       | Basic Motion        | multiply                    |
| 2       | Opposite Directions | add speeds                  |
| 3       | Catch-Up            | subtract speeds             |
| 4       | Round Trip          | total distance ÷ total time |
| 5       | Wind / Current      | add or subtract current     |
| 6       | Fuel / Efficiency   | multi-step pipeline         |

This lets your brain **recognize patterns immediately**.

---

# SECTION 3 — Pattern 1: Basic Motion

### Visual

```
🚗 → → → → →
speed = 60 mph
time = 3 hours
```

### Formula

distance = speed × time

### Example

A car travels 60 mph for 3 hours.

```
distance = 60 × 3
distance = 180 miles
```

### Shortcut

Think repeated addition.

```
60 + 60 + 60
```

### Practice

A car drives **48 mph for 5 hours**

Distance = ?

---

# SECTION 4 — Pattern 2: Opposite Directions

### Visual

```
← 55 mph   START   70 mph →
```

### Rule

When objects move away from each other:

```
distance apart = (speed1 + speed2) × time
```

### Example

Two trains travel 55 mph and 70 mph for 3 hours.

Step 1

```
55 + 70 = 125
```

Step 2

```
125 × 3 = 375
```

Answer

```
375 miles apart
```

### Shortcut

Always **add speeds first**.

### Practice

Two cars leave a point at **40 mph and 50 mph**.

Distance after **2 hours**?

---

# SECTION 5 — Pattern 3: Catch-Up Problems

These are the **most difficult on the ASVAB**.

### Visual

```
Alice → → → → (45 mph)
Dave → → → → (?)
```

Alice leaves **30 minutes earlier**.

### Rule

Use **relative speed**.

```
relative speed = faster − slower
```

### Example

Alice travels **45 mph**.

Head start:

```
0.5 hr
```

Distance lead:

```
45 × 0.5 = 22.5 miles
```

Alice total travel:

```
45 × 3 = 135 miles
```

Dave travel time:

```
2.5 hours
```

Speed needed:

```
135 ÷ 2.5 = 52.5 mph
```

### Shortcut

```
lead distance ÷ catch-up time
```

### Practice

A runner travels **6 mph**.

Another leaves **10 minutes later at 8 mph**.

How long to catch up?

---

# SECTION 6 — Pattern 4: Round Trip / Average Speed

Common trick problem.

### Formula

```
average speed = total distance ÷ total time
```

### Example

Drive 60 mph going
Drive 40 mph returning

Distance each way = 120 miles.

Time going:

```
120 ÷ 60 = 2 hours
```

Time returning:

```
120 ÷ 40 = 3 hours
```

Total distance:

```
240
```

Total time:

```
5
```

Average speed:

```
240 ÷ 5 = 48 mph
```

### Key Warning

Average speed **is NOT the average of speeds**.

### Practice

Drive **70 mph** going
Drive **50 mph** returning

Distance = 140 miles each way.

Average speed = ?

---

# SECTION 7 — Pattern 5: Wind / Current

### Visual

```
Boat → current
Boat ← against current
```

### Formula

```
downstream = boat + current
upstream = boat − current
```

### Example

Boat speed = 20 mph
Current = 4 mph

Downstream

```
20 + 4 = 24 mph
```

Upstream

```
20 − 4 = 16 mph
```

### Practice

Boat speed = 18 mph
Current = 3 mph

Downstream = ?
Upstream = ?

---

# SECTION 8 — Pattern 6: Fuel Cost Problems

Multi-step calculation.

### Process

```
speed × time
↓
distance
↓
distance ÷ mpg
↓
gallons used
↓
gallons × price
↓
total cost
```

### Example

Speed

```
48 mph
```

Time

```
7 hours
```

Distance

```
48 × 7 = 336 miles
```

Fuel usage

```
336 ÷ 21 = 16 gallons
```

Cost

```
16 × 2.82 = $45.12
```

---

# SECTION 9 — Speed Drill

Rapid mental practice.

```
60 mph × 4 hr = ?
45 mph × 6 hr = ?
240 miles ÷ 60 mph = ?
70 mph × 3 hr = ?
```

These should take **under 5 seconds each**.

---

# SECTION 10 — From the Test (Keep Exactly)

Keep your section but add **expandable solution steps**.

---

# From the Test

Real questions from the 90-question pool. Click to reveal the correct answer.

---

### Problem 1

Alice leaves her house, driving east at 45 miles per hour (mph). Thirty minutes later, her husband Dave notices she forgot her cell phone and sets off after her. How fast must Dave travel in order to catch up with Alice 3 hours after he leaves?

Pattern

```
Catch-Up
```

Correct answer

```
52.5 mph
```

---

### Problem 2

A train headed south for Wichita left the station at the same time a train headed north for Des Moines left the same station. The train headed for Wichita traveled at 55 miles per hour. The train headed for Des Moines traveled at 70 miles per hour. How many miles apart are the trains at the end of 3 hours?

Pattern

```
Opposite Directions
```

Correct answer

```
375 miles
```

---

### Problem 3

Your car uses gasoline at the rate of 21 miles per gallon. If gasoline costs $2.82 per gallon and you drive for 7 hours at a speed of 48 miles per hour, how much will you pay for gasoline for the trip?

Pattern

```
Fuel Cost
```

Correct answer

```
$45.12
```

---

# Final Design Summary (for your agent)

Page layout:

```
1. Core Formula
2. Pattern Map
3. Pattern 1 — Basic Motion
4. Pattern 2 — Opposite Directions
5. Pattern 3 — Catch-Up
6. Pattern 4 — Round Trip
7. Pattern 5 — Wind / Current
8. Pattern 6 — Fuel Cost
9. Speed Drill
10. From the Test (existing)
```

Each pattern contains:

```
visual diagram
formula
example
shortcut
practice
```

---

Chien — if you want, I can also show you something **extremely powerful for your portal**:

**The 12 exact distance-speed-time question types that appear repeatedly on the ASVAB**, so your system can train students to recognize them instantly.

# Scoring Methodology

This document explains exactly how **Password Analyzer** evaluates a password and produces a score from 0–100, a strength classification, an estimated crack time, and an estimated compute cost.

---

## 1. Entropy Calculation

Entropy is the foundation of the score. It measures the theoretical size of the search space an attacker must exhaust to brute-force a password.

### Formula

```
Entropy (bits) = L × log₂(P)
```

| Variable | Meaning |
|----------|---------|
| `L` | Length of the password (number of characters) |
| `P` | Size of the character pool used |

### Character Pool Sizes

| Character Set | Pool Size |
|---------------|-----------|
| Lowercase letters (`a–z`) | +26 |
| Uppercase letters (`A–Z`) | +26 |
| Digits (`0–9`) | +10 |
| Special characters (`!@#$%^&*` etc.) | +32 |

**Example:** `Hello123!` uses lowercase, uppercase, digits, and a special character → pool = 94.  
Length = 9 → Entropy = 9 × log₂(94) ≈ **59.2 bits**

---

## 2. Base Score Mapping

The raw entropy is mapped to a 0–100 score using 80 bits as the "perfect" ceiling:

```
Base Score = (Entropy / 80) × 100
```

This is then clamped:
```
Base Score = min(100, max(0, Base Score))
```

| Entropy Range | Approximate Base Score |
|---------------|------------------------|
| 0–16 bits | 0–20 |
| 17–32 bits | 21–40 |
| 33–48 bits | 41–60 |
| 49–64 bits | 61–80 |
| 65–80+ bits | 81–100 |

---

## 3. Heuristic Penalties

Entropy alone is misleading. A password like `aaaaaaaa` has decent entropy mathematically, but an attacker will check repetitions before brute-forcing. The engine applies **score deductions** for known patterns:

### Rule 1 — Too Short

| Condition | Deduction |
|-----------|-----------|
| Password length < 8 characters | **−15** |

Short passwords are always weak, regardless of character variety.

### Rule 2 — Repeated Characters

| Condition | Deduction |
|-----------|-----------|
| A character repeated 3+ times in a row (e.g. `aaa`, `1111`) | **−(run length × 2)** per occurrence |

Example: `aaaa` → deduction of −8. `aaaaaa` → −12.

### Rule 3 — Sequential Characters

| Condition | Deduction |
|-----------|-----------|
| Three or more characters in ASCII sequence (e.g. `abc`, `123`, `xyz`) | **−10** (applied once) |

Attackers check common sequences before brute-forcing.

### Rule 4 — Keyboard Walks

| Pattern | Deduction |
|---------|-----------|
| `qwerty`, `asdfgh`, `zxcvbn`, `123456` found anywhere in the password | **−15** per match |

These are among the most commonly tried patterns in dictionary attacks.

---

## 4. Final Score

```
Final Score = clamp(Base Score − Total Penalties, 0, 100)
```

The result is rounded to the nearest integer.

---

## 5. Strength Classification

The final score and entropy together determine the classification label:

| Classification | Condition |
|----------------|-----------|
| **Very Strong** | Score > 80 **AND** Entropy > 60 bits **AND** zero penalties |
| **Strong** | Score > 60 |
| **Medium** | Score > 40 |
| **Weak** | Score ≤ 40 |

> Note: "Very Strong" requires *all three* conditions to prevent high-entropy passwords with common patterns from receiving the top label.

---

## 6. Crack Time Estimation

Based on a theoretical high-end cloud GPU cluster running at **100 GH/s (10¹¹ hashes/second)**:

```
Total Hashes = 2^Entropy
Seconds to Crack = Total Hashes / 100,000,000,000
```

| Seconds | Displayed As |
|---------|--------------|
| < 1 | Instant |
| < 60 | X seconds |
| < 3,600 | X minutes |
| < 86,400 | X hours |
| < 31,536,000 | X days |
| < 3,153,600,000 | X years |
| ≥ 3,153,600,000 | > 100 years |

---

## 7. Compute Cost Estimation

Assuming a GPU rental cost of **$2 per hour** at 100 GH/s:

```
Hours to Crack = Total Hashes / (100,000,000,000 × 3600)
Cost = Hours × $2
```

| Cost | Displayed As |
|------|--------------|
| < $0.01 | < $0.01 |
| > $1,000,000 | > $1M |
| Otherwise | $X.XX |

If the cost to crack your password is lower than the value of the data it protects, the password is fundamentally insecure.

---

## 8. Improvement Tips

The engine also generates actionable tips when the password does not meet the following criteria:

| Missing Characteristic | Tip Shown |
|------------------------|-----------|
| Length < 12 | Increase length to at least 12 characters |
| No uppercase letters | Add uppercase letters |
| No lowercase letters | Add lowercase letters |
| No digits | Include numbers |
| No special characters | Use special characters (e.g., !@#$%^&*) |
| All above met, but < Very Strong | Avoid common words and patterns |

---

## Summary

| Component | What It Measures |
|-----------|-----------------|
| **Entropy** | Raw mathematical search space |
| **Penalties** | Real-world exploitability (patterns, repeats, walks) |
| **Score** | Combined strength on a 0–100 scale |
| **Classification** | Human-readable label (Weak → Very Strong) |
| **Crack Time** | Time for a 100 GH/s GPU cluster |
| **Compute Cost** | Dollar cost to crack at $2/hr GPU rental |
| **Tips** | Specific, actionable improvement suggestions |

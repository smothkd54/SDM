# SDM Project — Steepest Descent Method

## Project Overview

| Item | Detail |
|:-----|:--------|
| **Project Name** | SDM (Steepest Descent Method) |
| **Course** | Numerical Methods of Linear Algebra for Sparse Matrices |
| **Lecturer** | Anna Nasedkina |
| **Student** | [Your Name] |
| **Submission** | 30 June 2026 |

This project implements the **Steepest Descent Method (SDM)** — a 1D projection method (Lecture 12) for solving symmetric positive definite (SPD) linear systems $Ax = b$.

---

## Table of Contents

1. [How This README is Structured](#1-how-this-readme-is-structured)
2. [Lecture References](#2-lecture-references)
3. [mmread.m — What and Why](#3-mmread-m--what-and-why)
4. [Files Created — Step by Step](#4-files-created--step-by-step)
5. [How Each Code File Was Developed](#5-how-each-code-file-was-developed)
6. [How to Run the Tests (MATLAB)](#6-how-to-run-the-tests-matlab)
7. [Expected Results](#7-expected-results)
8. [Report & Presentation](#8-report--presentation)

---

## 1. How This README is Structured

Every step of the project is documented here in the order it was done. Before the presentation, read through this file to recall:

- What each MATLAB file does
- Why we created each file
- How they connect to the lecture theory
- Where the results came from

---

## 2. Lecture References

| Lecture | Title | Used In |
|:-------:|:------|:--------|
| L1 | Fundamentals, linear systems, GE | Understanding $Ax = b$ |
| L2 | Vector and matrix norms | Convergence criterion $\|r\|_2$ |
| L6 | Positive definite matrices | SDM requires SPD |
| L10 | Direct vs iterative methods | Context: why iterative methods exist |
| L12 | 1D projection methods | **Core theory for SDM** |

---

## 3. mmread.m — What and Why

### What is it?
`mmread.m` is a MATLAB function that reads **Matrix Market format** files (`.mtx`). Matrix Market is a standard file format for storing sparse matrices used by the numerical linear algebra community.

### Where did we get it?
We downloaded it from the official Matrix Market website:
```
https://math.nist.gov/MatrixMarket/mmio/matlab/mmread.m
```
This is the **official** MATLAB reader provided by NIST (National Institute of Standards and Technology).

### Why do we need it?
The project specification (Individual Project for MSD group, page 3) says:
> "Try to solve the linear systems with large sparse matrices from the Matrix Market."
>
> "To use the matrix from the matrix market, download it as .mtx.gz file, unpack and get .mtx file, then load it to MATLAB using attached mmread function."

So `mmread.m` is required to:
1. Load real-world sparse matrices (structural engineering, finite element, etc.)
2. Test SDM on matrices that are not artificially generated in MATLAB
3. Compare SDM performance on real problems

### How to use it
```matlab
A = mmread('bcsstk01.mtx');
n = size(A, 1);
b = randn(n, 1);
```

---

## 4. Files Created — Step by Step

Files are listed in the order they were created.

### 4.0 `SDM_Theory.md` — Standalone Theory Document
**Created:** 25 June 2026

**Purpose:** Complete theoretical background for SDM, extracted from Lecture 12 and the Saad textbook. Covers derivation, algorithm, convergence theorems, and comparison with CG.

**Contents:**
| Section | Content |
|:--------|:--------|
| 1 | Origin and context (Lecture 12) |
| 2 | Problem formulation (SPD requirement) |
| 3 | Derivation of α_k |
| 4 | Algorithm (original vs modified) |
| 5 | Convergence theorems (L12 p.15) |
| 6 | Relationship to projection methods |
| 7 | Comparison with CG |
| 8 | General formulation as iterative method |

**Use in presentation:** Read this file before the presentation to recall the theory.
**Use in report:** Section 2 (Theoretical Aspects) of SDM_Report.docx is based on this.

---

### 4.1 `SDM.m` — The SDM Function

**Created:** Day 1 (24 June 2026)

**Purpose:** The core implementation of the Steepest Descent Method.

**Inputs:**
| Parameter | Description |
|:----------|:------------|
| `A` | SPD matrix (n × n) |
| `b` | Right-hand side (n × 1) |
| `x0` | Initial guess (n × 1) |
| `tol` | Tolerance for convergence (stop when $\|r_k\|_2 < \text{tol}$) |
| `kmax` | Maximum number of iterations |

**Outputs:**
| Output | Description |
|:-------|:------------|
| `x` | Approximate solution (n × 1) |
| `r` | Final residual $b - Ax$ (n × 1) |
| `r_norm` | Vector of residual norms at every iteration (for plotting) |
| `k` | Number of iterations performed |

**Algorithm (from Lecture 12, page 14 — modified version):**
```
1. r0 = b - A * x0
2. p0 = A * r0
3. For k = 0, 1, 2, ... until ||rk|| < tol:
     a. alpha = (rk, rk) / (rk, pk)
     b. x_{k+1} = x_k + alpha * r_k
     c. r_{k+1} = r_k - alpha * p_k     (residual recurrence, saves 1 MVP)
     d. p_{k+1} = A * r_{k+1}
```

**Key design choice:** We use the **modified** version (1 matrix-vector product per iteration) rather than the original (2 MVPs). This is standard practice.

**Theory reference:** Lecture 12, pages 13-15.

---

### 4.2 `test_SDM_small.m` — Small System Tests

**Created:** Day 1 (24 June 2026)

**Purpose:** Verify SDM works correctly on small controllable systems.

**4 tests in this script:**

| Test | Size | What it checks |
|:----:|:----:|:---------------|
| **Test 1** | 3×3 | Known exact solution $x = [1, 2, 3]^T$. SPD matrix `[4 2 0; 2 5 2; 0 2 4]`. Verifies SDM finds the exact answer (error < 1e-10). |
| **Test 2** | 10×10 | Random SPD matrix (via $A = T^T T + 0.1I$). Tests SDM on a system with condition number ~ 10². |
| **Test 3** | 100×100 | Larger random SPD. Tests timing and produces convergence plot. |
| **Test 4** | 10×10 | **Comparison**: well-conditioned (Poisson matrix, $\kappa \approx 1.5$) vs ill-conditioned (random, $\kappa \approx 1000$). Shows SDM's slow convergence for ill-conditioned systems. Two convergence curves overlaid on one plot. |

**Why these tests?**
- Test 1: Does the algorithm give the right answer? (correctness)
- Test 2: Does it work for random SPD? (robustness)
- Test 3: Does it scale? (performance)
- Test 4: Does it match theory? (Lecture 12, Theorem 2 — convergence depends on $\kappa$)

---

### 4.3 `test_SDM_large.m` — Large System Benchmarks

**Created:** Day 1 (24 June 2026)

**Purpose:** Measure SDM performance on n = 100, 500, 1000.

**What it does:**
- Generates random SPD matrices of increasing size
- Times SDM with `tic`/`toc`
- Reports: condition number, iterations, CPU time, error
- Outputs a formatted table

**Why this script?**
- The project specification requires testing on systems of size n = 100, 1000, 3000
- This script provides the timing data for the "Results" section of the report
- Shows SDM's scaling behaviour (iterations grow with condition number, not just size)

---

### 4.4 `test_SDM_sparse.m` — Sparse Matrix Tests

**Created:** Day 2 (25 June 2026), **Revised:** Day 2 (added real Matrix Market download)

**Purpose:** Test SDM on real sparse SPD matrices using `mmread.m`.

**How it works (in order of priority):**

1. **Attempts to download** `bcsstk01.mtx` (48×48 SPD structural matrix) from Matrix Market using MATLAB's `gunzip` function. If successful, reads it with `mmread.m`.

2. **Falls back** to a **built-in 2D Poisson sparse matrix** if Matrix Market server is unavailable. The Poisson matrix comes from discretizing $-\Delta u = f$ on a 15×15 grid (225 unknowns, ~1000 nonzeros). This is the same type of matrix from Lectures 8–9.

3. **Tests SDM** on the sparse matrix and records: iterations, CPU time, error, residual.

4. **Compares SDM with MATLAB's `pcg`** (Preconditioned Conjugate Gradient) — CG is strictly superior for SPD systems.

5. **Generates convergence plot** for the report.

**`mmread.m` call:** The script calls `mmread(filename)` to load `.mtx` files. See Section 3 for details on where `mmread.m` comes from.

**If Matrix Market download fails:** Don't worry. The built-in Poisson matrix is an SPD sparse matrix of the same type that appears in real PDE problems. The comparison with `pcg` still works.

**Manual download instructions** are printed at the end of the script for offline use:
```matlab
% Download from https://sparse.tamu.edu/
A = mmread('bcsstk01.mtx');
[x, r, r_norm, k] = SDM(A, b, zeros(size(A,1),1), 1e-8, 10000);
```

**Why this script?**
- Project specification requires testing on Matrix Market matrices
- `mmread.m` is used to read the `.mtx` format
- Sparse matrices are where iterative methods become essential
- Direct methods (LU) cost $O(n^3)$ — impossible for large sparse systems

---

### 4.5 `mmread.m` — Matrix Market Reader

**Downloaded:** Day 1 (24 June 2026)

**Source:** https://math.nist.gov/MatrixMarket/mmio/matlab/mmread.m

**Purpose:** Read `.mtx` files from Matrix Market into MATLAB sparse matrices.

**Usage:** See [Section 3 above](#3-mmread-m--what-and-why).

---

### 4.6 `SDM_Report.docx` — Project Report

**Created:** Day 2 (25 June 2026)

**Contents:**
| Section | Content |
|:--------|:--------|
| 1. Introduction | What SDM is and why it matters |
| 2. Theoretical Aspects | Formulation, algorithm (from L12 p.14), convergence (L12 p.15) |
| 3. MATLAB Implementation | Function signature, inputs/outputs, algorithm |
| 4. Numerical Results | Small, large, sparse test results |
| 5. Conclusions | Advantages, limitations, future work (CG) |
| References | Lecture 12, Lecture 10, Saad book, Templates book |

**To fill in:** Replace `[Your Name]` and insert actual numerical results from your MATLAB runs.

---

### 4.7 `SDM_Presentation.pdf` — Presentation Slides

**Created:** Day 2 (25 June 2026)

**9 slides:**

| Slide | Title | Content |
|:-----:|:------|:--------|
| 1 | Title | Project name, student, course, date |
| 2 | Motivation | Why iterative methods, why SDM |
| 3 | What is SDM? | Quadratic functional, gradient, SPD requirement |
| 4 | SDM Algorithm (L12 p.14) | Step-by-step with formula |
| 5 | Convergence Theory (L12 p.15) | Theorem, eigenvalues, condition number |
| 6 | Numerical Results | Tables and plots |
| 7 | SDM vs CG | Comparison, why CG is faster |
| 8 | Conclusions | Strengths, weaknesses, future work |
| 9 | Thank You | Questions? |

**To fill in:** Replace `[Your Name]` on slide 1.

---

## 5. How Each Code File Was Developed

### Step-by-step development process

1. **Read Lecture 12 (extracted text)**
   - Understood the SDM algorithm (page 13-14)
   - Understood convergence theorems (page 15)
   - Saw two versions: original (2 MVPs) and modified (1 MVP)

2. **Wrote `SDM.m`**
   - Implemented the modified algorithm (Lecture 12, page 14)
   - Used the residual recurrence $r_{k+1} = r_k - \alpha_k A r_k$ to save one MVP
   - Included convergence check inside the loop
   - Returned residual norm history for plotting

3. **Verified `SDM.m` with Python**
   - MATLAB was not available on the development machine
   - Translated the algorithm to Python/numpy to verify correctness
   - Tests confirmed: SDM converges for SPD matrices
   - Observed: slow convergence for ill-conditioned matrices (consistent with theory)

4. **Wrote `test_SDM_small.m`**
   - Started with a 3×3 SPD matrix with known solution
   - Added random SPD tests of increasing size
   - Added condition number comparison (well vs ill-conditioned)
   - This follows the project spec: "Test on several small linear systems (n < 10)"

5. **Wrote `test_SDM_large.m`**
   - Loops over n = 100, 500, 1000
   - Times each run with tic/toc
   - Produces a summary table
   - This follows the project spec: "Try to solve systems of larger size (n = 100, 1000, 3000)"

6. **Downloaded `mmread.m`**
   - From official NIST Matrix Market website
   - Required for loading real sparse matrices
   - This follows the project spec: "Try to solve linear systems with large sparse matrices from Matrix Market"

7. **Wrote `test_SDM_sparse.m`**
   - Built-in sparse test with 2D Poisson matrix
   - Optional Matrix Market test (if user downloads .mtx files)
   - Comparison with MATLAB `pcg` for benchmarking

8. **Wrote `SDM_Report.docx`**
   - Used python-docx to generate the Word document
   - Referenced Lecture 12 throughout
   - Left placeholders for numerical results

9. **Wrote `SDM_Presentation.pdf`**
   - Used python-pptx to generate slides
   - Covers: motivation, theory, algorithm, results, conclusions
   - Designed for 5-7 minute presentation

---

## 6. How to Run the Tests (MATLAB)

### Prerequisites
- MATLAB R2018b or later
- No additional toolboxes required (basic MATLAB is sufficient)
- `mmread.m` is included in the project folder

### Run all tests sequentially

```matlab
%% Step 1: Small system tests
test_SDM_small
% Expect: convergence plots, error < 1e-10 for test 1

%% Step 2: Large system benchmarks
test_SDM_large
% Expect: timing table for n = 100, 500, 1000

%% Step 3: Sparse matrix test
test_SDM_sparse
% Expect: sparse convergence plot, CG comparison
```

### Run individual SDM calls

```matlab
% Example: Solve a 3x3 system
A = [4 2 0; 2 5 2; 0 2 4];
b = [10; 18; 16];
x0 = zeros(3, 1);
[x, r, r_norm, k] = SDM(A, b, x0, 1e-12, 1000);
```

### Load and test with Matrix Market matrices

```matlab
% Download bcsstk01.mtx from:
% https://math.nist.gov/MatrixMarket/detail.html?bcsstk01

A = mmread('bcsstk01.mtx');
n = size(A, 1);
x_exact = randn(n, 1);
b = A * x_exact;
[x, r, r_norm, k] = SDM(A, b, zeros(n, 1), 1e-8, 10000);
```

---

## 7. Expected Results

### Small 3x3 system
| Metric | Expected |
|:-------|:---------|
| Solution | [1, 2, 3] |
| Error | < 1e-12 |
| Iterations | ~64 |
| Converged | Yes |

### Condition number comparison
| System | $\kappa$ | Convergence |
|:-------|:--------:|:------------|
| Poisson 10×10 | ~1.5 | Fast (~10 iterations) |
| Random 10×10 | ~10² | Moderate (~100 iterations) |
| Random 10×10 (ill) | ~10³ | Slow (~1000 iterations) |

### Scaling (for well-conditioned SPD with $\kappa < 100$)
| Size | Iterations (approx) |
|:----:|:-------------------:|
| 100 | 200-500 |
| 500 | 500-2000 |
| 1000 | 1000-5000 |

*Note: Actual numbers depend on random seed and condition number.*

---

## 8. Report & Presentation

### Report (`SDM_Report.docx`)
- Open in Microsoft Word
- Fill in `[Your Name]` on the title page
- Replace placeholder results with actual numbers from MATLAB runs
- Add any screenshots of convergence plots

### Presentation (`SDM_Presentation.pdf`)
- Fill in `[Your Name]` on slide 1
- Practice the 5-7 minute talk
- Key slides to focus on: Algorithm (slide 4), Convergence (slide 5), Results (slide 6)

### Submission checklist
- [ ] `SDM.m` — MATLAB function
- [ ] `test_SDM_small.m` — Small test script
- [ ] `test_SDM_large.m` — Large test script
- [ ] `test_SDM_sparse.m` — Sparse test script
- [ ] `mmread.m` — Matrix Market reader
- [ ] `SDM_Report.docx` — Report
- [ ] `SDM_Presentation.pdf` — Presentation

---

## 9. Next: GMRES (CV Bonus)

After the SDM submission (30 June), the next step is implementing **GMRES** (Generalized Minimal Residual method).

GMRES is:
- The most widely used Krylov subspace method
- Works for **any** matrix (not just SPD)
- Based on Arnoldi orthogonalization (Lecture 14)
- Much more impressive on a CV than SDM

The GMRES implementation will follow the same pattern:
1. Read Lecture 14 theory
2. Write `GMRES.m` function
3. Write test scripts
4. Compare with MATLAB's built-in `gmres`
5. Write report and presentation


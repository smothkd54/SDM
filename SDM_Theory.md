# SDM Theory — Steepest Descent Method

## 1. Origin and Context

**Lecture:** Lecture 12 — Projection methods for linear systems. 1D projection methods.
**Textbook:** Saad, Y. Iterative Methods for Sparse Linear Systems, 2nd Ed., Chapter 5.

SDM is a **1D projection method** where both the search subspace $K$ and the subspace of constraints $L$ are defined by a single vector — the residual $r_k$.

---

## 2. Problem Formulation

Solve $Ax = b$ where $A \in \mathbb{R}^{n \times n}$ is **symmetric positive definite (SPD)**.

**Why SPD?** SDM is derived from minimizing the quadratic functional:

$$f(x) = \frac{1}{2}(x, Ax) - (b, x)$$

The gradient is:
$$\nabla f(x) = Ax - b = -r$$

where $r = b - Ax$ is the **residual**. For SPD $A$, $f(x)$ is a convex quadratic with a unique minimum at $x^* = A^{-1}b$, where $\nabla f(x^*) = 0$.

**If $A$ is not SPD:** The functional has no minimum (saddle point) and SDM may diverge.

---

## 3. Derivation

At iteration $k$, we have current approximation $x_k$. We update:

$$x_{k+1} = x_k + \alpha_k r_k$$

where $\alpha_k$ is chosen to minimize $f(x_k + \alpha r_k)$ along the search direction $r_k$.

Set derivative to zero:

$$\frac{d}{d\alpha} f(x_k + \alpha r_k) = 0$$

$$(r_k, \nabla f(x_k + \alpha r_k)) = 0$$

$$(r_k, A(x_k + \alpha r_k) - b) = 0$$

$$(r_k, Ax_k - b + \alpha A r_k) = 0$$

$$(r_k, -r_k + \alpha A r_k) = 0$$

$$-(r_k, r_k) + \alpha (r_k, A r_k) = 0$$

$$\alpha_k = \frac{(r_k, r_k)}{(r_k, A r_k)}$$

This is the **exact step size** that minimizes $f$ along $r_k$.

---

## 4. Algorithm

### Original Version (2 matrix-vector products per iteration)

```
Given: A (SPD), b, x₀, tol, kmax

r₀ = b - A·x₀

for k = 0, 1, 2, ... until ||r_k|| < tol:
    1. Compute w_k = A·r_k                 (1st MVP)
    2. α_k = (r_k, r_k) / (r_k, w_k)
    3. x_{k+1} = x_k + α_k · r_k
    4. Compute r_{k+1} = b - A·x_{k+1}     (2nd MVP)
```

### Modified Version (1 matrix-vector product per iteration)

```
Given: A (SPD), b, x₀, tol, kmax

r₀ = b - A·x₀
p₀ = A·r₀

for k = 0, 1, 2, ... until ||r_k|| < tol:
    1. α_k = (r_k, r_k) / (r_k, p_k)
    2. x_{k+1} = x_k + α_k · r_k
    3. r_{k+1} = r_k - α_k · p_k           (recurrence, no MVP needed)
    4. p_{k+1} = A·r_{k+1}                (1 MVP per iteration)
```

**Key improvement:** The residual recurrence $r_{k+1} = r_k - \alpha_k A r_k$ eliminates the need to compute $A x_{k+1}$ separately.

---

## 5. Convergence Theory

### Theorem 1 (Lecture 12, p.15)
The functional $f(x) = \frac{1}{2}(x, Ax) - (b, x)$ is minimized at every iteration in the direction of $r_k$, and $\alpha_k$ gives the minimum to $f(x)$ along that direction.

### Theorem 2 — Convergence (Lecture 12, p.15)
If $A$ is symmetric positive definite, SDM converges for any initial guess $x_0$:

$$\|x^{(k+1)} - x^*\|_A \leq \frac{\lambda_{\max} - \lambda_{\min}}{\lambda_{\max} + \lambda_{\min}} \|x^{(k)} - x^*\|_A$$

where:
- $\|x\|_A = \sqrt{(x, Ax)}$ is the **A-norm** (energy norm)
- $\lambda_{\max}, \lambda_{\min}$ are the extreme eigenvalues of $A$
- $\kappa = \lambda_{\max} / \lambda_{\min}$ is the **condition number**

### Interpretation

| Condition number $\kappa$ | Convergence factor $(\kappa-1)/(\kappa+1)$ | Speed |
|:-------------------------:|:------------------------------------------:|:-----:|
| 1.0 | 0 | Instant |
| 1.5 | 0.2 | Fast |
| 10 | 0.82 | Moderate |
| 100 | 0.98 | Slow |
| 1000 | 0.998 | Very slow |

### Why the zigzag?

SDM always moves perpendicular to the contour lines of $f(x)$. For ill-conditioned systems ($\kappa \gg 1$), the contours are elongated ellipses — SDM bounces between the steep sides rather than heading directly toward the minimum.

---

## 6. Relationship to Projection Methods (Lecture 12)

SDM is a **1D projection method** with:

| Component | Value |
|:----------|:------|
| Search subspace $K$ | $\text{span}\{r_k\}$ |
| Constraint subspace $L$ | $\text{span}\{r_k\}$ |
| Basis in $K$ | $V = [r_k]$ |
| Basis in $L$ | $W = [r_k]$ |
| Correction $\delta$ | $\delta = \alpha_k r_k$ |
| Matrix equation | $W^T A V y = W^T r_0$ → $r_k^T A r_k \cdot \alpha_k = r_k^T r_k$ |

This is why SDM belongs to the class of **1D projection methods** (Lecture 12, Section 3).

---

## 7. Comparison with Conjugate Gradient (CG)

| Property | SDM | CG |
|:---------|:---:|:--:|
| Search direction | Residual $r_k$ | Conjugate direction $p_k$ |
| A-orthogonal? | No | Yes ($p_i^T A p_j = 0$) |
| Convergence rate | $(\kappa - 1)/(\kappa + 1)$ | $(\sqrt{\kappa} - 1)/(\sqrt{\kappa} + 1)$ |
| Min iterations | $O(\kappa)$ | $O(\sqrt{\kappa})$ |
| Requires SPD? | Yes | Yes |
| MVP per iteration | 1 | 1 |
| Storage | $O(n)$ | $O(n)$ |

CG is strictly superior to SDM for SPD systems. SDM is mainly of pedagogical interest.

---

## 8. General Formulation as an Iterative Method (Lecture 10)

From Lecture 10, any stationary iterative method can be written as:

$$x^{(k+1)} = G x^{(k)} + g$$

where $G$ is the **iteration matrix** and $g$ is the **iteration vector**.

For SDM, this is not a stationary method (the iteration matrix changes at each step), but it fits the projection method framework from Lecture 12.

**Convergence criterion:** $\rho(G) < 1$ for stationary methods. For SDM, convergence is guaranteed for SPD $A$ per Theorem 2.

---

## References

[1] Nasedkina, A. Lecture 12: Projection methods for linear systems. 1D projection methods. Southern Federal University, 2026.

[2] Nasedkina, A. Lecture 10: Overview of FEM. Direct and iterative methods. General formulation. Southern Federal University, 2026.

[3] Saad, Y. Iterative Methods for Sparse Linear Systems, 2nd Ed. SIAM, 2003. Chapter 5.

[4] Barrett, R. et al. Templates for the Solution of Linear Systems. SIAM, 1994.

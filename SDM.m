function [x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax)
%
% [x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax)
%
% Steepest Descent Method (SDM) for solving Ax = b.
% A must be symmetric positive definite (SPD).
%
% SDM is the 1D projection method with search subspace K = span{r_k} and
% subspace of constraints L = span{r_k} (see Lecture 12 / Saad, Ch. 5).
% Since A is SPD this is an orthogonal projection that minimises the
% A-norm of the error along the residual direction at each step.
%
% Input:
%   A    - SPD coefficient matrix (n x n), full or sparse
%   b    - right-hand side vector (n x 1)
%   x0   - initial guess (n x 1)
%   tol  - tolerance on the RELATIVE residual ||r||_2 / ||b||_2
%   kmax - maximum number of iterations
%
% Output:
%   x          - approximate solution (n x 1)
%   r          - final residual r = b - A*x (n x 1)
%   rnorm      - final residual norm ||r||_2
%   relres     - final relative residual norm ||r||_2 / ||b||_2
%   k          - number of iterations performed
%   rnorm_hist - history of residual norms ||r_k||_2 (for convergence plots)
%
% Convergence criterion (checked inside the function):
%   stop when  ||r_k||_2 / ||b||_2 < tol   or   k = kmax.
%

  x = x0;
  r = b - A * x;
  p = A * r;                 % p_k = A*r_k  (one MVP per iteration)

  nb = norm(b, 2);
  if nb == 0
    nb = 1;                  % guard against division by zero (b = 0)
  end

  rnorm_hist = zeros(kmax + 1, 1);
  rnorm = norm(r, 2);        % Euclidean norm ||r||_2 = sqrt((r,r))
  rnorm_hist(1) = rnorm;

  for k = 0:kmax
    % --- convergence check on the relative residual ---
    if rnorm / nb < tol || k == kmax
      break
    end

    % --- modified SDM step (1 matrix-vector product) ---
    Ar    = p;                 % = A*r_k, already computed
    alpha = (r' * r) / (r' * Ar);
    x     = x + alpha * r;     % x_{k+1} = x_k + alpha*r_k
    r     = r - alpha * Ar;    % r_{k+1} = r_k - alpha*A*r_k  (recurrence)
    p     = A * r;             % p_{k+1} = A*r_{k+1}

    rnorm = norm(r, 2);
    rnorm_hist(k + 2) = rnorm;
  end

  rnorm_hist = rnorm_hist(1:k + 1);
  relres = rnorm / nb;

end

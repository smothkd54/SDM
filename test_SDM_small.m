%% TEST 1: Small 3x3 system with known solution
% Verify SDM gives correct answer
clear; clc;
fprintf('=== TEST 1: Small 3x3 system ===\n');

A = [4 2 0; 2 5 2; 0 2 4];
x_exact = [1; 2; 3];
b = A * x_exact;

x0 = zeros(3, 1);
tol = 1e-12;
kmax = 1000;

[x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax);

abs_err = norm(x - x_exact, 2);
rel_err = abs_err / norm(x_exact, 2);
e = x - x_exact;
err_A = sqrt(e' * A * e);          % A-norm (energy norm) - the norm SDM minimizes

fprintf('Exact solution:   [%f, %f, %f]\n', x_exact);
fprintf('SDM solution:     [%f, %f, %f]\n', x);
fprintf('Absolute error (2-norm):   %e\n', abs_err);
fprintf('Relative error (2-norm):   %e\n', rel_err);
fprintf('Error in A-norm ||x-x*||_A: %e\n', err_A);
fprintf('Residual norm ||r||_2:     %e\n', rnorm);
fprintf('Relative residual ||r||_2/||b||_2: %e\n', relres);
fprintf('Iterations:       %d\n', k);
fprintf('converged:        %d\n\n', abs_err < 1e-10);

% --- Try a different initial guess (spec: "Try different initial guess") ---
fprintf('--- Test 1b: same system, different initial guess x0 = [5;-3;10] ---\n');
x0b = [5; -3; 10];
[xb, rb, rnormb, relresb, kb] = SDM(A, b, x0b, tol, kmax);
fprintf('SDM solution:     [%f, %f, %f]\n', xb);
fprintf('Relative error:   %e\n', norm(xb - x_exact, 2) / norm(x_exact, 2));
fprintf('Iterations:       %d (converges to the same solution)\n\n', kb);

%% TEST 2: Random SPD system (n = 10)
fprintf('=== TEST 2: Random 10x10 SPD system ===\n');

n = 10;
rng(42);
T = randn(n, n);
A = T' * T + eye(n) * 0.1;
x_exact = randn(n, 1);
b = A * x_exact;

x0 = zeros(n, 1);
tol = 1e-8;
kmax = 10000;

[x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax);

abs_err = norm(x - x_exact, 2);

fprintf('Condition number: %e\n', cond(A));
fprintf('Absolute error:   %e\n', abs_err);
fprintf('Relative error:   %e\n', abs_err / norm(x_exact, 2));
fprintf('Residual norm:    %e\n', rnorm);
fprintf('Relative resid:   %e\n', relres);
fprintf('Iterations:       %d\n', k);
fprintf('Converged (relres < tol): %d\n', relres < tol);
% Note: error ~ cond(A)*relres, so the error can exceed the residual
% tolerance for ill-conditioned systems even when the method has converged.
fprintf('\n');

%% TEST 3: Larger system (n = 100)
fprintf('=== TEST 3: 100x100 SPD system ===\n');

n = 100;
rng(42);
T = randn(n, n);
A = T' * T + eye(n) * 0.5;
x_exact = randn(n, 1);
b = A * x_exact;

x0 = zeros(n, 1);
tol = 1e-6;
kmax = 10000;

tic;
[x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax);
cpu = toc;

abs_err = norm(x - x_exact, 2);

fprintf('Condition number: %e\n', cond(A));
fprintf('Absolute error:   %e\n', abs_err);
fprintf('Relative error:   %e\n', abs_err / norm(x_exact, 2));
fprintf('Residual norm:    %e\n', rnorm);
fprintf('Relative resid:   %e\n', relres);
fprintf('Iterations:       %d\n', k);
fprintf('CPU time:         %f sec\n', cpu);
fprintf('Converged (relres < tol): %d\n', relres < tol);

% Convergence plot
figure(1);
semilogy(rnorm_hist, 'b-o', 'LineWidth', 1.5, 'MarkerSize', 3);
xlabel('Iteration k');
ylabel('||r_k||_2');
title(sprintf('SDM Convergence (n=%d, \\kappa(\\itA\\rm)=%.2e)', n, cond(A)));
grid on;
print(figure(1), 'fig_sdm_convergence_n100.png', '-dpng', '-r200');

%% TEST 4: Well-conditioned vs ill-conditioned comparison
fprintf('\n=== TEST 4: Condition number comparison ===\n');

labels = {'Well-conditioned', 'Ill-conditioned'};

figure(2); clf;
colors = {[0 0.447 0.741], [0.85 0.325 0.098]};   % blue = well, orange = ill

for t = 1:2
    n = 10;
    rng(t);
    if t == 1
        % Well-conditioned SPD: diagonally-dominant tridiagonal (kappa ~ 3)
        e = ones(n, 1);
        A = full(spdiags([-e 4*e -e], [-1 0 1], n, n));
    else
        % Ill-conditioned SPD: A = T'*T with a tiny shift (kappa >> 1)
        T = randn(n, n);
        A = T' * T + eye(n) * 1e-4;
    end
    x_exact = randn(n, 1);
    b = A * x_exact;

    x0 = zeros(n, 1);
    tol = 1e-6;
    kmax = 20000;

    [x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax);

    loglog(1:numel(rnorm_hist), rnorm_hist, 'LineWidth', 1.8, 'Color', colors{t});
    hold on;
    fprintf('%s: cond(A)=%e, iters=%d, residual=%e\n', ...
        labels{t}, cond(A), k, rnorm);
end

hold off;
set(gca, 'XScale', 'log', 'YScale', 'log');   % force log-log (robust against figure reuse)
xlabel('Iteration k');
ylabel('||r_k||_2');
title('SDM: Well-conditioned vs Ill-conditioned');
legend(labels, 'Location', 'northeast');
grid on;
print(figure(2), 'fig_sdm_well_vs_ill.png', '-dpng', '-r200');

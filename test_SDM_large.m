%% TEST: SDM on large SPD systems
% Measure CPU time and iterations for n = 100, 1000, 3000 (project spec).
%
% The SPD matrices are built as A = T'*T + n*I so that the condition number
% stays moderate and SDM converges for every size. This isolates the effect
% of PROBLEM SIZE on CPU time (the effect of CONDITIONING is shown separately
% in test_SDM_small.m, Test 4).
clear; clc;
fprintf('=== SDM Performance on Large Systems ===\n\n');
fprintf('(Note: n = 3000 forms a dense 3000x3000 matrix and may take ~1 min.)\n\n');

sizes = [100, 1000, 3000];
tol = 1e-6;
kmax = 20000;

results = [];

for idx = 1:length(sizes)
    n = sizes(idx);
    fprintf('Testing n = %d...\n', n);

    rng(idx);
    T = randn(n, n);
    A = T' * T + n * eye(n);     % SPD, moderate condition number
    x_exact = randn(n, 1);
    b = A * x_exact;

    x0 = zeros(n, 1);

    tic;
    [x, r, rnorm, relres, k] = SDM(A, b, x0, tol, kmax);
    cpu = toc;

    abs_err = norm(x - x_exact, 2);
    rel_err = abs_err / norm(x_exact, 2);
    conv = abs_err < 1e-4;

    results = [results; n, cond(A), k, cpu, rel_err, relres, conv];

    fprintf('  cond(A) = %.2e, iters = %d, CPU = %.4f sec, rel.err = %.2e, converged = %d\n', ...
        cond(A), k, cpu, rel_err, conv);
end

% Summary table
fprintf('\n=== Summary ===\n');
fprintf('%-8s %-12s %-8s %-12s %-12s %-12s %-10s\n', ...
    'Size', 'cond(A)', 'Iters', 'CPU (sec)', 'Rel.error', 'Rel.resid', 'Converged');
fprintf('%-8s %-12s %-8s %-12s %-12s %-12s %-10s\n', ...
    '--------', '------------', '--------', '------------', '------------', '------------', '----------');
for i = 1:size(results, 1)
    fprintf('%-8d %-12.2e %-8d %-12.4f %-12.2e %-12.2e %-10d\n', ...
        results(i,1), results(i,2), results(i,3), results(i,4), results(i,5), results(i,6), results(i,7));
end

fprintf('\nNote: SDM iteration count depends on the condition number, not size.\n');
fprintf('CPU time grows with n because each iteration costs one MVP (O(n^2) dense).\n');
fprintf('For ill-conditioned systems, consider CG method instead.\n');

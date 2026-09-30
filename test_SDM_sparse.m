%% TEST: SDM on real sparse SPD matrices from the Matrix Market
%
% Loads real sparse symmetric-positive-definite matrices from the Matrix
% Market using the attached mmread.m function, runs the Steepest Descent
% Method on them, and compares with MATLAB's built-in Conjugate Gradient
% solver (pcg).
%
% The .mtx files are included in the project folder. If a file is missing,
% the script tries to download it; only if that also fails does it fall back
% to a built-in 2D Poisson matrix.
%
% Matrices used (both symmetric positive definite):
%   gr_30_30.mtx  - 900 x 900, 9-point Laplacian on a 30x30 grid (well-cond.)
%   bcsstk01.mtx  -  48 x  48, structural engineering stiffness matrix (ill-cond.)

clear; clc;
fprintf('=== SDM on Real Sparse SPD Matrices (Matrix Market) ===\n\n');

mm_files = {'gr_30_30.mtx', 'bcsstk01.mtx'};
mm_urls  = {'https://math.nist.gov/pub/MatrixMarket2/Harwell-Boeing/laplace/gr_30_30.mtx.gz', ...
            'https://math.nist.gov/pub/MatrixMarket2/Harwell-Boeing/bcsstruc1/bcsstk01.mtx.gz'};

matrices = {};  names = {};

%% Part 1: Load the real Matrix Market matrices
for i = 1:numel(mm_files)
    fn = mm_files{i};  A = [];
    if exist(fn, 'file') == 2
        A = mmread(fn);
        fprintf('Loaded %s from local file (%d x %d).\n', fn, size(A,1), size(A,2));
    else
        gz = [fn '.gz'];
        try
            fprintf('Downloading %s ...\n', mm_urls{i});
            websave(gz, mm_urls{i});
            gunzip(gz);
            A = mmread(fn);
            fprintf('Downloaded and loaded %s.\n', fn);
        catch ME
            fprintf('Could not obtain %s: %s\n', fn, ME.message);
        end
    end
    if ~isempty(A)
        matrices{end+1} = A;  names{end+1} = fn;  %#ok<SAGROW>
    end
end

% Last-resort fallback: built-in 2D Poisson matrix
if isempty(matrices)
    fprintf('No Matrix Market file available; using built-in 2D Poisson matrix.\n');
    ng = 15;  e = ones(ng,1);
    T  = spdiags([e -2*e e], [-1 0 1], ng, ng);
    I  = speye(ng);
    A  = -(kron(I,T) + kron(T,I)) + 4*speye(ng^2);
    matrices{1} = A;  names{1} = '2D Poisson (built-in)';
end

fprintf('\n%d matrix/matrices loaded. Testing each with SDM and pcg (CG).\n', numel(matrices));

%% Part 2-4: For each matrix, check properties, run SDM, compare with CG
summary = {};   % {name, n, nnz, kappa, sdm_iters, sdm_relres, cg_iters, cg_relres}

for m = 1:numel(matrices)
    A = matrices{m};  nm = names{m};
    base = erase(nm, '.mtx');
    n = size(A,1);

    fprintf('\n=====================================================\n');
    fprintf('Matrix %d: %s\n', m, nm);
    fprintf('=====================================================\n');

    % --- Properties (checked the way the lectures require) ---
    % Symmetry: measure closeness of A and A' with a matrix norm (Lecture 2),
    % NOT exact equality via isequal, which is biased by round-off.
    sym_defect  = norm(A - A', 1);
    is_symmetric = sym_defect < 1e-10 * max(norm(A,1), 1);
    % Positive definiteness via Cholesky (Lecture 6, p.5): p == 0 iff SPD.
    [~, p_chol] = chol(A);
    fprintf('  Size:                        %d x %d\n', n, n);
    fprintf('  Nonzeros (nnz):              %d\n', nnz(A));
    fprintf('  Sparsity:                    %.2f%%\n', 100*(1 - nnz(A)/n^2));
    fprintf('  Symmetry defect ||A-A''||_1:  %.2e\n', sym_defect);
    fprintf('  Symmetric?                   %d\n', is_symmetric);
    fprintf('  Positive definite (chol p=0)?%d\n', p_chol == 0);
    fprintf('  Condition number (condest):  %.2e\n', condest(A));

    % --- Sparse pattern ---
    figure;
    spy(A);
    title(sprintf('Sparse pattern: %s (n=%d, nnz=%d)', nm, n, nnz(A)), 'Interpreter','none');
    print(gcf, ['fig_sdm_' base '_pattern.png'], '-dpng', '-r200');

    % --- Right-hand side with known exact solution ---
    rng(42);  x_exact = randn(n, 1);  b = A * x_exact;
    x0 = zeros(n, 1);  tol = 1e-6;  kmax = 20000;

    % --- SDM ---
    tic;
    [x, r, rnorm, relres, k, rnorm_hist] = SDM(A, b, x0, tol, kmax);
    cpu_sdm = toc;
    err_sdm = norm(x - x_exact, 2);
    fprintf('\n  SDM:\n');
    fprintf('    Iterations:        %d\n', k);
    fprintf('    CPU time:          %.4f sec\n', cpu_sdm);
    fprintf('    Rel. residual:     %.2e\n', relres);
    fprintf('    Rel. error:        %.2e\n', err_sdm / norm(x_exact, 2));
    fprintf('    Converged:         %d\n', relres < tol);

    % --- CG (MATLAB pcg) ---
    tic;
    [x_cg, flag, relres_cg, iter_cg] = pcg(A, b, tol, 5000);
    cpu_cg = toc;
    err_cg = norm(x_cg - x_exact, 2);
    fprintf('  CG (pcg):\n');
    fprintf('    Iterations:        %d\n', iter_cg);
    fprintf('    CPU time:          %.4f sec\n', cpu_cg);
    fprintf('    Rel. residual:     %.2e\n', relres_cg);
    fprintf('    Rel. error:        %.2e\n', err_cg / norm(x_exact, 2));
    fprintf('    Converged:         %d\n', flag == 0);

    % --- Convergence plot ---
    figure;
    semilogy(0:numel(rnorm_hist)-1, rnorm_hist, 'b-', 'LineWidth', 1.5);
    xlabel('Iteration k');  ylabel('||r_k||_2');
    title(sprintf('SDM convergence: %s (\\kappa=%.1e)', nm, condest(A)), 'Interpreter','none');
    grid on;
    print(gcf, ['fig_sdm_' base '_convergence.png'], '-dpng', '-r200');

    summary(end+1,:) = {nm, n, nnz(A), condest(A), k, relres, iter_cg, relres_cg}; %#ok<SAGROW>
end

%% Part 5: Combined summary
fprintf('\n\n=== Summary: SDM vs CG on real Matrix Market matrices ===\n');
fprintf('%-14s %-7s %-8s %-10s %-9s %-11s %-8s %-11s\n', ...
    'Matrix','n','nnz','kappa','SDM iters','SDM relres','CG iters','CG relres');
fprintf('%s\n', repmat('-',1,86));
for m = 1:size(summary,1)
    fprintf('%-14s %-7d %-8d %-10.2e %-9d %-11.2e %-8d %-11.2e\n', summary{m,:});
end
fprintf('\nSDM converges quickly on well-conditioned matrices (gr_30_30) but stalls on\n');
fprintf('ill-conditioned ones (bcsstk01), where CG remains effective. CG uses A-orthogonal\n');
fprintf('search directions, so its advantage over SDM grows with the condition number.\n');

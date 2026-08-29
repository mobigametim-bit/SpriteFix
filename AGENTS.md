# AGENTS.md — SpriteFix

## Product
SpriteFix is a client-side HTML5 / TypeScript tool for repairing uneven and AI-generated sprite sheets.

Primary workflow: upload broken sheet → configure/detect grid → inspect → repair → preview → validate → export.

## Branch policy
- `main` contains only user-approved, tested code.
- `develop` is the integration branch.
- Each feature is implemented in `feature/fXX-short-name` from `develop`.
- Do not implement unrelated features in the same feature branch.
- After user approval, merge the feature branch into `develop`.
- Promote to `main` only at an explicitly approved release/integration point.

## Mandatory feature lifecycle
1. Set matching GitHub issue and Notion feature page to **In Development**.
2. Implement only that feature's approved scope.
3. Run all applicable local checks.
4. Produce a user-testable build/preview.
5. Set GitHub + Notion status to **Ready for User Test**.
6. Report what changed, what to test, known limitations, and next steps.
7. Wait for explicit user test result.
8. If corrections are requested, keep the same feature open and iterate.
9. Only after explicit approval mark the feature **Approved/Done** and merge according to branch policy.

## Build gate
A feature is not complete until the user receives a testable build.

Every feature report must include:
- feature ID and name;
- branch / commit / PR when applicable;
- local validation performed;
- how to launch/open the test build;
- exact user test checklist;
- known limitations;
- next steps.

## GitHub Actions — prohibited
Do **not** create, enable, use, or depend on GitHub Actions for this project.

Specifically:
- no `.github/workflows/*` files;
- no Actions-based build/test/deploy pipeline;
- no Actions artifacts as the user-test build.

Validation must be performed locally or through explicitly approved non-GitHub-Actions infrastructure.

## Local quality checks
As the project gains these scripts, run the applicable commands before submitting a feature for user test:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Do not claim a command passed unless it was actually executed in the environment available for the task.

## Architecture principles
- Prefer Vite + TypeScript + browser Canvas APIs.
- Core sprite processing must remain independent from UI code.
- Keep primary image processing client-side unless a later approved feature explicitly requires a backend.
- User images must not be uploaded by default.
- Avoid unnecessary dependencies.
- Manual grid configuration is always a fallback even when auto-detection exists.
- Never allow repaired sprites to clip outside their output cells.

## GitHub ↔ Notion synchronization
Canonical feature IDs are `F01` through `F10`.

For every feature:
- one GitHub issue;
- one Notion subpage;
- both contain links to each other;
- both represent the same scope and acceptance criteria;
- status changes are mirrored in both places during active development;
- significant scope changes must be reflected in both places before implementation continues.

The current mapping lives in `docs/PROJECT_SYNC.md`.

## MVP feature order
1. F01 Foundation
2. F02 Slicing & Frames
3. F03 Object & Background Detection
4. F04 Repair & Alignment
5. F05 Preview & Diagnostics
6. F06 Export
7. F07 Validation & Quality Score
8. F08 Productization
9. F09 QA & Regression
10. F10 Release

Do not skip forward if doing so would make the current feature impossible to test independently, unless the user explicitly changes the order.

## Definition of MVP success
The final MVP must let a user upload a broken sprite sheet, configure or detect a grid, remove a simple solid background, detect sprite bounds, normalize scale, bottom-center align frames, preview animation, validate the result, export a repaired PNG and individual frame ZIP, and do so locally in the browser without registration or a required backend.

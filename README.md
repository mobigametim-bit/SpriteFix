# SpriteFix

AI Sprite Sheet Repair & Normalizer.

SpriteFix is a client-side HTML5 tool for repairing uneven or AI-generated sprite sheets: grid correction, background cleanup, object detection, scale normalization, alignment, preview, validation, and export.

## Project links

- Notion project hub: https://app.notion.com/p/3cb8c73f2252814facc4ea207a077aca?pvs=204
- GitHub ↔ Notion sync map: [`docs/PROJECT_SYNC.md`](docs/PROJECT_SYNC.md)
- Development rules: [`AGENTS.md`](AGENTS.md)

## Project workflow

- `main` — approved, user-tested code only.
- `develop` — integration branch for completed feature work before approval.
- `feature/*` — one feature per branch.
- No GitHub Actions. Validation is performed locally/manual tooling before a feature is submitted for user testing.
- After every completed feature, a testable build must be provided to the user before merge/approval.
- GitHub issues and Notion feature pages are kept cross-linked and status-synchronized.

## MVP feature sequence

1. F01 Foundation — Vite/TypeScript shell, upload, Canvas rendering, grid overlay.
2. F02 Slicing — rows/columns, cell slicing, frames preview.
3. F03 Detection — alpha/background detection, bounding boxes, empty-frame detection.
4. F04 Repair — normalization, padding, center and bottom-center alignment.
5. F05 Preview — Original/Fixed/Compare, animation preview, FPS, issue indicators.
6. F06 Export — repaired PNG, individual frames, ZIP.
7. F07 Validation — clipping, scale/alignment deviation, result report/score.
8. F08 Productization — landing, examples, privacy, SEO metadata, analytics, responsive polish.
9. F09 QA — golden assets, regression tests, browser verification.
10. F10 Release — production deployment and release checklist.

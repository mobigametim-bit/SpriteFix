# SpriteFix — GitHub ↔ Notion Sync Map

Notion project hub: https://app.notion.com/p/3cb8c73f2252814facc4ea207a077aca?pvs=204

GitHub repository: https://github.com/mobigametim-bit/SpriteFix

## Rules

- GitHub Actions are prohibited for this project.
- `main` = approved/tested code only.
- `develop` = integration branch.
- `feature/*` = one feature per branch.
- A feature cannot be marked Approved/Done until the user has tested the provided build.
- Status/scope changes must be mirrored between the GitHub issue and Notion feature page.

## Feature mapping

| ID | Feature | GitHub | Notion | Initial status |
| --- | --- | --- | --- | --- |
| F01 | Foundation | https://github.com/mobigametim-bit/SpriteFix/issues/1 | https://app.notion.com/p/3cb8c73f225281d58adcf169198b7b48?pvs=204 | Planned |
| F02 | Slicing & Frames | https://github.com/mobigametim-bit/SpriteFix/issues/2 | https://app.notion.com/p/3cb8c73f225281d3b1a4cb1ee7b2f462?pvs=204 | Planned |
| F03 | Object & Background Detection | https://github.com/mobigametim-bit/SpriteFix/issues/3 | https://app.notion.com/p/3cb8c73f2252816e810ae7a4480e99a1?pvs=204 | Planned |
| F04 | Repair & Alignment | https://github.com/mobigametim-bit/SpriteFix/issues/4 | https://app.notion.com/p/3cb8c73f22528142907dff1cbfcccfb4?pvs=204 | Planned |
| F05 | Preview & Diagnostics | https://github.com/mobigametim-bit/SpriteFix/issues/5 | https://app.notion.com/p/3cb8c73f225281219da4e0c36670ec50?pvs=204 | Planned |
| F06 | Export | https://github.com/mobigametim-bit/SpriteFix/issues/6 | https://app.notion.com/p/3cb8c73f2252812abf4eea784d49b333?pvs=204 | Planned |
| F07 | Validation & Quality Score | https://github.com/mobigametim-bit/SpriteFix/issues/7 | https://app.notion.com/p/3cb8c73f225281bc8ec6f792aeb4cf9f?pvs=204 | Planned |
| F08 | Productization | https://github.com/mobigametim-bit/SpriteFix/issues/8 | https://app.notion.com/p/3cb8c73f2252813985e4ff398b353af7?pvs=204 | Planned |
| F09 | QA & Regression | https://github.com/mobigametim-bit/SpriteFix/issues/9 | https://app.notion.com/p/3cb8c73f225281fdb267ea93468d4052?pvs=204 | Planned |
| F10 | Release | https://github.com/mobigametim-bit/SpriteFix/issues/10 | https://app.notion.com/p/3cb8c73f22528159a700ce1dff63b402?pvs=204 | Planned |

## Status lifecycle

`Planned → In Development → Ready for User Test → Approved → Done`

If the user requests corrections after testing, keep the feature in development/test state and do not close the GitHub issue.

## Required synchronization when developing a feature

1. Update Notion page status section and GitHub issue body/comment to In Development.
2. Create `feature/fXX-short-name` from current `develop`.
3. Implement and locally validate.
4. Produce the testable build/preview.
5. Update both sides to Ready for User Test and record the tested commit.
6. After explicit approval, record approval on both sides and perform the approved merge.
7. Keep this map current if issue/page URLs or scope change.

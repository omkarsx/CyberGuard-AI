# AttendX presentation source

This project generates an 11-slide, 16:9 PowerPoint presentation for the AttendX project demonstration.

## Deliverables

- `output/AttendX_Final_Presentation.pptx` — final presentation.
- `src/presentation.mjs` — editable slide authoring source using `@oai/artifact-tool`.
- `src/add_transitions.py` — adds a consistent PowerPoint fade transition to each slide.
- `src/finalize.mjs` — runs the presentation package, slide-count, layout, and import checks and writes the final PPTX.
- `src/render_final.mjs` — imports the finalized deck and exports slide previews for visual review.
- `assets/images/` — original generated illustrative classroom visuals.
- `assets/animations/qr-scan.gif` — embedded animated scan-line effect.

## Regenerate

The authoring scripts use the bundled Codex presentation runtime and its `@oai/artifact-tool` package. From the workspace root, run:

```powershell
python AttendX-Presentation/src/create_scan_gif.py
node AttendX-Presentation/src/presentation.mjs
python AttendX-Presentation/src/add_transitions.py AttendX-Presentation/.build/AttendX-draft.pptx
node AttendX-Presentation/src/finalize.mjs
```

The finalizer does not overwrite an existing deck. For another build, change the output filename in `src/finalize.mjs` first.

If the bundled runtime moves, update the runtime and skill paths at the top of `src/finalize.mjs` and make the bundled Node packages available to the authoring script.

## Editing notes

Most labels, diagrams, relationship maps, and interface mockups are native editable PowerPoint objects. The classroom photographs and QR scan effect are embedded media. Interface panels are clearly labelled illustrative: the public production deployment exposes the sign-in page, while role-specific pages require an authorized account. The generated QR-style grids are decorative and do not contain a usable attendance token.

The fade transitions and animated GIF scan line play from the embedded presentation package without an internet connection. Slides 4, 6, and 7 include repository source links in speaker notes for technical claims.

## Accuracy notes

- The repository confirms Next.js 16.3, React 19, TypeScript, Prisma, PostgreSQL, Google OAuth, `qrcode`, and `html5-qrcode`.
- The database host is shown only as PostgreSQL because the public repository source inspected for this deck did not establish a specific hosting provider.
- No fixed QR expiration duration is claimed. The implementation uses the attendance session's expiry value.
- The QR workflow includes authenticated student identity, signed-token and expiry checks, session status, stored token-hash comparison, division and optional batch checks, and transaction-backed duplicate prevention.
- QR expiry and server checks reduce misuse but do not prevent screenshot sharing in every case.
- The future-scope column is explicitly separated from current capabilities.

No team member names or PRNs are included.

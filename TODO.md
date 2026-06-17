# TODO - Fix main.jsx 404 error

- [ ] Diagnose the 404 Not Found that references `main.jsx:1` (client console error). Likely caused by wrong entry script path or base URL handling.
- [ ] Inspect `index.html`, `vite.config.js`, and `src/main.jsx` usage to ensure the script points to the correct bundled entry.
- [ ] Implement minimal fix (no unrelated changes) to prevent 404 for `main.jsx` in the served environment.
- [ ] Build and run locally to confirm no missing entry resource.
- [ ] (If needed) Update Vite config or HTML script tag to use correct base.


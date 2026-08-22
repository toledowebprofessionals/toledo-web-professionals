# Toledo Web Professionals

The source for [twpmeetup.com](https://twpmeetup.com), built with Astro and Tailwind CSS. The site is statically generated and deployed to GitHub Pages through GitHub Actions.

## Local development

Install a current Node.js LTS release, then install dependencies and start Astro:

```sh
npm install
npm run dev
```

Astro will print the local development URL in the terminal.

## Commands

| Command           | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the local development server.                   |
| `npm run check`   | Run Astro and TypeScript diagnostics.                 |
| `npm run build`   | Validate and generate the production site in `dist/`. |
| `npm run preview` | Preview the generated production site locally.        |
| `npm run format`  | Format Astro, CSS, and TypeScript source files.       |

Run `npm run build` before opening a pull request or deploying a change.

## Project structure

```text
src/
├── assets/       Images, fonts, and SVG artwork processed by Astro
├── components/   Shared page sections and interface components
├── layouts/      Shared document layout, metadata, header, and footer
├── pages/        File-based site routes
├── scripts/      Browser-side behavior
├── styles/       Global styles and Tailwind configuration
└── utils/        Shared build-time utilities
```

Images that appear in site content belong in `src/assets/` so Astro can resize and optimize them. Avoid adding a new `public/assets/` tree unless a file must be served unchanged at a fixed URL.

## Site conventions

- Prefer Tailwind utility classes for layout, spacing, typography, and responsive behavior.
- Keep global CSS limited to shared foundations, reusable patterns, fonts, and behavior that is impractical to express as utilities.
- Use components for repeated interface patterns.
- Use Astro's image tooling for raster photography and provide meaningful alternative text.
- Keep internal URLs trailing-slash compatible for GitHub Pages.
- Icons are rendered locally through `src/components/Icon.astro`; do not add a browser-loaded Font Awesome kit.
- Years of service are calculated from October 1, 2011. Use the existing service-year component or utility rather than hard-coding a number.

The legacy `/become-a-sponsor/` route must continue directing visitors to `/sponsor-a-talk/`. The `/intro-slides/` presentation is intentionally excluded from the sitemap and blocked in `robots.txt`.

## Analytics

Google Tag Manager container `GTM-W5Q54QZL` is loaded by the shared site layout and the standalone intro-slides page. Tracking changes should be made in the GTM container whenever possible instead of adding additional analytics scripts directly to page templates.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The production domain is `twpmeetup.com`, with HTTPS managed by GitHub Pages.

Before deploying:

1. Run `npm run build`.
2. Review the affected pages at mobile and desktop widths.
3. Confirm new internal links and external calls to action.
4. Commit the generated source changes; do not commit `dist/`.

## Copyright

Except where otherwise noted, this repository is licensed under the Creative
Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
See [LICENSE](LICENSE) for the terms and applicable exceptions.

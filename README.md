# Pomona Consulting Group Website

This is a static GitHub Pages-ready site for Pomona Consulting Group, combining PCG content with a polished, warm, people-centered visual direction.

## Edit Content

- Homepage copy: `index.html`
- Student page: `students.html`
- Client page: `clients.html`
- Leadership page: `leadership.html`
- Styling and layout: `styles.css`
- Animations and interactions: `script.js`
- Videos/images you want to host directly: place them in `assets/`
- Client and partner logos: place them in `assets/logos/`

## Hero Video

The hero uses `assets/pomona-hero.mp4`, a short self-hosted clip trimmed from the Pomona campus video, with `assets/pomona-hero-poster.jpg` as the poster image.

## Forms

The student interest form lives on `students.html`, and the client interest form lives on `clients.html`. Both currently create pre-filled email drafts to `pomonaconsulting@gmail.com`. To collect responses in a database or spreadsheet, replace the `data-mailto` setup with a backend such as Google Forms, Formspree, Netlify Forms, or a custom endpoint.

## Publish On GitHub Pages

1. Create a GitHub repository.
2. Upload these files to the repository root.
3. Go to repository `Settings` > `Pages`.
4. Set the source to deploy from the `main` branch root.
5. Your site will publish at `https://your-username.github.io/repository-name/`.

## Suggested Next Tweaks

- Replace placeholder leadership profiles with real headshots, names, emails, majors, years, and role descriptions.
- Connect the forms to Google Forms or a proper backend.
- Replace Instagram and LinkedIn footer links with PCG's real profile URLs.

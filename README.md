# Pomona Consulting Group Website

This is a static GitHub Pages-ready site for Pomona Consulting Group, combining PCG content with a polished, warm, people-centered visual direction.

## Edit Content

- Homepage copy: `index.html`
- Student page: `students.html`
- Recruiting timeline page: `recruiting.html`
- Upcoming events page: `events.html`
- Client page: `clients.html`
- Leadership page: `leadership.html`
- Styling and layout: `styles.css`
- Animations and interactions: `script.js`
- Videos/images you want to host directly: place them in `assets/`
- Client and partner logos: place them in `assets/logos/`
- PCG/team photos: place them in `assets/photos/`

## Hero Video

The hero uses `assets/pomona-hero.mp4`, a short self-hosted clip trimmed from the Pomona campus video, with `assets/pomona-hero-poster.jpg` as the poster image.

## Forms

The student interest form lives on `students.html` and is wired in `script.js` to submit to a public Google Form `formResponse` endpoint. Add the Google Form action URL and `entry.xxxxx` IDs to `GOOGLE_FORM_ACTION` and `GOOGLE_FORM_FIELDS` in `script.js`.

The client interest form lives on `clients.html` and currently creates a pre-filled email draft to `pomonaconsulting@gmail.com`.

## Publish On GitHub Pages

1. Create a GitHub repository.
2. Upload these files to the repository root.
3. Go to repository `Settings` > `Pages`.
4. Set the source to deploy from the `main` branch root.
5. Your site will publish at `https://your-username.github.io/repository-name/`.

## Suggested Next Tweaks

- Replace placeholder leadership profiles with real headshots, names, emails, majors, years, and role descriptions.
- Add the live Google Form action URL and field IDs for the student interest form.
- Replace Instagram and LinkedIn footer links with PCG's real profile URLs.

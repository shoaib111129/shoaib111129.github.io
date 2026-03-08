# A-sk Electrical and Computer Services Website

Static business website for A-sk Electrical and Computer Services.

## Live Domain

- https://askelectricalservice.me/

## Pages

- `index.html` - main marketing and contact page
- `login.html` - login UI
- `signup.html` - signup UI

## Tech Stack

- HTML
- CSS (`Styles.css`)
- Vanilla JavaScript (`script.js`)

## Contact Form

- Contact form posts to FormSubmit: `https://formsubmit.co/contact.askelectrical@gmail.com`
- If FormSubmit fails, users still see fallback contact details (phone and email).

## SEO Files

- `robots.txt`
- `sitemap.xml`

## Update Workflow

1. Edit content in `index.html`.
2. Edit styles in `Styles.css`.
3. Edit behavior in `script.js`.
4. If a new page is added, include it in `sitemap.xml`.
5. Commit and push to `main`.

## Deployment

This repository is configured for GitHub Pages custom domain deployment.

- `CNAME` contains: `askelectricalservice.me`
- Pushes to `main` are published via GitHub Pages.

## Assets

- Images are inside `images/` with `.avif`, `.webp`, and `.jpg` variants.
- Keep filenames lowercase and hyphenated for consistency.
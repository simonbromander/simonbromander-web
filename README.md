# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/dc5991af-d716-4be3-934f-525679973b76

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/dc5991af-d716-4be3-934f-525679973b76) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js 22 & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm ci

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/dc5991af-d716-4be3-934f-525679973b76) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Dependency maintenance

npm and `package-lock.json` are the authoritative dependency setup. Run `npm ci`, `npm audit`, and `npm run build` before merging dependency updates. The obsolete Bun lockfile has been removed.

Tailwind 4 replaces Tailwind 3 to remove the unpatched `braces` dependency; class names were migrated with the official upgrader. This requires modern browsers (Safari 16.4+, Chrome 111+, Firefox 128+). The Lovable development tagger was removed because it reintroduced Tailwind 3.

Security overrides pin patched transitive dependencies. `gray-matter` uses an explicit `js-yaml` 4 engine in the blog scripts because its default engine calls the removed `safeLoad` API. Keep that engine when adding frontmatter parsing.

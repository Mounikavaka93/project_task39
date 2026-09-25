# StaySight — Attrition Analytics Dashboard

A modern, fully responsive HR dashboard for monitoring employees, analyzing attrition trends, and exploring exit-risk insights. Built as a frontend assignment with React, Vite, Tailwind CSS, Recharts, and Framer Motion.

## Features

- **Login** — email/password validation, Remember Me, Forgot Password modal, demo credentials
- **HR Dashboard** — total / active / left employees, attrition rate, average salary, department stats, activity feed
- **Employee management** — search, department/role/status filters, sortable columns, pagination, details modal
- **Employee profile** — personal, job, salary, performance, satisfaction, risk gauge, activity timeline
- **Attrition analytics** — department, age, job role, salary, experience, and satisfaction charts
- **Risk predictor** — form-driven mock model returning Low / Medium / High risk with a percentage gauge
- **UI/UX** — dark/light mode, toasts, skeletons, empty states, responsive sidebar, advanced motion

## Tech stack

React 19 · Vite · Tailwind CSS · Recharts · Framer Motion · React Router · Lucide icons

## Demo login

```
Email:    hr@staysight.com
Password: Admin@123
```

## Local setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deploy

SPA rewrites are already configured.

**Vercel**

```bash
npm i -g vercel
vercel
```

**Netlify**

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect the GitHub repository in the Vercel / Netlify dashboard. Build command: `npm run build`. Publish directory: `dist`.

## Project structure

```
src/
  components/   layout, employees, reusable UI
  context/      auth, theme, toasts
  data/         mock workforce + analytics helpers
  pages/        login, dashboard, employees, analytics, prediction, profile
  utils/        formatting, motion, mock risk model
```


## Getting Started

  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, install the project dependencies:
```
npm install
```
Then, run on development server: 
```bash
npm  run  dev
# or
yarn  dev
# or
pnpm  dev
# or
bun  dev
```
Open [http://localhost:3000](http://localhost:3000) n your browser to view the application.
To start editing the project, modify:
```
src/app/page.tsx
```
The page will automatically update as you make changes.

This project uses `[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)` to automatically optimise and load the [Geist](https://vercel.com/font) font family.

## Git Workflow
This project uses a Git Flow branching structure with  `main`,  `develop`, and  `feature/*`  branches.
### Branch Structure
```
main
  ↑
develop
  ↑
feature/*
```
-   `main`  — stable and production-ready code.
-   `develop`  — integration branch where completed features are merged and tested.
-   `feature/*`  — individual development branches created from  `develop`.
    
### Development Workflow
1.  Pull the latest  `develop`  branch.
```bash
git checkout develop
git pull origin develop
```
2.  Create a new feature branch from  `develop`.
```bash
git checkout -b feature/{feature-name}
```
Example:
```bash
git checkout -b feature/frontend-prototype
```
3.  Make the required changes.
4.  Stage and commit the changes using Conventional Commits.   
```bash
git add .
git commit -m "feat: add frontend prototype"
```
5.  Push the feature branch to GitHub.    
```bash
git push -u origin feature/{feature-name}
```
6.  Create a Pull Request from the feature branch into  `develop`.    
```
feature/* → develop
```
7.  Test and validate the changes in  `develop`.    
8.  When  `develop`  is stable and ready for release, create a Pull Request into  `main`.    
```
develop → main
```
Direct pushes to  `main`  should be avoided. Development work should be completed through feature branches and reviewed through Pull Requests.
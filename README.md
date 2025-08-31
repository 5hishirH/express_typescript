## Setting Up a Robust Express & TypeScript Project 🚀

This guide walks you through creating a clean, scalable, and type-safe backend project using Express.js and TypeScript. We'll start by looking at the final project structure and the scripts that power your development workflow.

### Project Structure and Workflow Overview

By the end of this guide, your project will have a clean and logical structure that separates source code from compiled output.

#### Final Folder Structure

```
my-express-app/
├── dist/                # Compiled JavaScript output (auto-generated)
├── node_modules/        # Project dependencies (auto-generated)
├── src/                 # Your TypeScript source code
│   ├── app.ts           # Express app configuration (middleware, routes)
│   └── index.ts         # Server entry point (starts the server)
├── .gitignore           # Specifies files for Git to ignore
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Records exact dependency versions
└── tsconfig.json        # TypeScript compiler options
```

#### Understanding the `package.json` Scripts

The scripts in your **`package.json`** are the command center for your project. They automate common tasks like running, building, and cleaning.

- `"dev": "tsx watch src/index.ts"`
  - Starts a **development server** using `tsx`. The `watch` flag enables hot-reloading, so your server automatically restarts whenever you save a file.
- `"build": "npm run clean && tsc && tsc-alias"`
  - Creates a **production-ready build**. It first runs the `clean` script, then compiles your TypeScript code into JavaScript using `tsc`, and finally resolves any path aliases (like `@/*`) with `tsc-alias`.
- `"start": "node dist/index.js"`
  - **Runs the compiled application** from the `dist` folder. This is how you'd typically run your server in production.
- `"clean": "rimraf dist"`
  - A utility script that **deletes the `dist` folder**, ensuring a fresh build every time.

Now, let's build this project from scratch.

---

### Step 1: Initialize Your Node.js Project

First, create a new directory for your project and initialize it with npm. This creates a **`package.json`** file.

```sh
mkdir my-express-app
cd my-express-app
npm init -y
```

---

### Step 2: Install Dependencies 📦

We need to install packages for runtime (**dependencies**) and for development (**devDependencies**).

**1. Install Runtime Dependencies:**

```sh
npm i express
```

**2. Install Development Dependencies:**

- **`typescript`**: The TypeScript compiler.
- **`@types/express` & `@types/node`**: Type definition files for Express and Node.js.
- **`tsx`**: A fast TypeScript runner for development.
- **`rimraf`**: A cross-platform tool for deleting directories (for the `clean` script).
- **`tsc-alias`**: Resolves path aliases in the final compiled JavaScript.

<!-- end list -->

```sh
npm i -D typescript @types/express @types/node tsx rimraf tsc-alias
```

---

### Step 3: Configure TypeScript (`tsconfig.json`) ⚙️

Initialize a **`tsconfig.json`** file, which contains the settings for the TypeScript compiler.

```sh
npx tsc --init
```

Now, replace the generated content with the configuration below. This config is set up for a modern, strict, and scalable project.

```json
{
  "compilerOptions": {
    /* Core Settings */
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    /* Strictness */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    /* Output & File Structure */
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,

    /* Source Maps & Declarations */
    "sourceMap": true,
    "declaration": true,

    /* Path Aliases */
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key settings to note:**

- `"outDir": "./dist"` and `"rootDir": "./src"` keep your source code and compiled JavaScript neatly separated.
- `"strict": true` enables all strict type-checking options for more robust code.
- `"baseUrl"` and `"paths"` allow for clean, absolute-style imports (e.g., `import app from '@/app'`).

---

### Step 4: Configure `package.json` Scripts and Entry Point

Update your **`package.json`** to define the main entry point for your compiled app and to add the scripts we discussed earlier.

**1. Set the Main Entry Point:**
Modify the `main` property to point to the compiled output file:

```json
"main": "dist/index.js",
```

**2. Add Scripts:**
Add the following `scripts` block:

```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "clean": "rimraf dist",
  "build": "npm run clean && tsc && tsc-alias",
  "start": "node dist/index.js"
}
```

---

### Step 5: Create the Application Code

It's a best practice to separate the Express app configuration from the server startup logic. This makes testing and maintenance easier.

**1. Create the Express App (`src/app.ts`)**
Create a `src` directory, and inside it, create an `app.ts` file.

```ts
import express from "express";

const app: Application = express();

// A simple health check route
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default app;
```

**2. Create the Server Entry Point (`src/index.ts`)**
In the same `src` directory, create `index.ts`. This file will import the app and start the server. Notice the clean import using our path alias\!

```ts
import app from "@/app";

const PORT = process.env.PORT || 8000;

// Start the server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `📊 Health check available at http://localhost:${PORT}/health`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
```

---

### Step 6: Run Your Server\! 🎉

You're all set\! Run the development server using the script you created.

```sh
npm run dev
```

You should see the following output in your terminal:

```
🚀 Server running on http://localhost:8000
📊 Health check available at http://localhost:8000/health
```

To verify it's working, open your browser or use a tool like cURL to access the health check endpoint: **`http://localhost:8000/health`**. You should get a JSON response confirming the server is running.

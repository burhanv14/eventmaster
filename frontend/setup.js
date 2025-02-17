const { execSync } = require("child_process")
const fs = require("fs")

console.log("Setting up EventMaster project...")

// Install dependencies
console.log("Installing dependencies...")
execSync("npm install --force", { stdio: "inherit" })

// Check if .env.local exists, if not create it
if (!fs.existsSync(".env.local")) {
  console.log("Creating .env.local file...")
  fs.copyFileSync(".env.local.example", ".env.local")
  console.log("Please fill in the values in .env.local")
}

// Generate database schema
console.log("Generating database schema...")
execSync("npm run generate", { stdio: "inherit" })

// Run database migrations
console.log("Running database migrations...")
execSync("npm run migrate", { stdio: "inherit" })

console.log("Setup complete! You can now run the development server with:")
console.log("npm run dev")


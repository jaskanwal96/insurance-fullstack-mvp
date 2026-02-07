# Agent Rules for This Repository

You are working on a React frontend built with **Vite**.
This project is deployed using an **Azure DevOps YAML pipeline** to **Azure Blob Storage Static Website ($web)**.

## Primary Rule
Do NOT generate large amounts of code by default.

Before writing any code:
- Ask clarifying questions if requirements are unclear
- Confirm assumptions
- Propose a short plan first
- Wait for confirmation

## Scope of This App
This is a business application with:
- Login functionality
- Policy details screens
- Customer details screens
- Agent details screens

Do NOT invent new features, pages, or architecture unless explicitly asked.

## Tech Stack
- React (Vite)
- No backend code here
- API layer already exists
- Azure Pipeline handles deployment
- Static site hosted on Azure Blob Storage ($web)

## Code Guidelines
When asked to write code:
- Write the minimum code required
- Do not introduce new libraries unless asked
- Reuse existing patterns in the repo
- Keep components small and readable
- Avoid over-engineering
- Only use .ts and .tsx files, do not create js files
- Types should be stored in a shared location for easy retireval

## When Unsure
If anything is ambiguous:
- Ask questions instead of guessing
- Do not scaffold full flows
- Do not assume API contracts

## Output Style
Prefer:
- Small snippets
- Targeted edits
- Explanations before implementation

Avoid:
- Full project structures
- Boilerplate setup
- Unrequested refactors

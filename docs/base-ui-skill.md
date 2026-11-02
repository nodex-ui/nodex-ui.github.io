# Skill for AI

Nodex UI skill teaches an AI coding agent how to build apps and components with NodexUI: scaffolding a PWA, emitting real components and icons, and packaging as Electron or Capacitor apps. It bundles verified syntax references, so the agent uses real NodexUI props and markup instead of guessing.

It is a plain folder of Markdown and scripts, so it is not tied to one tool. It works with Claude Code, OpenAI Codex, Gemini CLI, and any other agent that can read instruction files.

## Download

[Download base-ui-skill.zip](https://raw.githubusercontent.com/nodex-ui/nodex-ui.github.io/refs/heads/main/docs/base-ui-skill.zip)

The archive contains one `base-ui/` folder: `SKILL.md`, `references/` and `scripts/`.

## Install

Extract the archive into the skills folder of your agent, either per user or inside one project:

| Agent | Per user | Per project |
| --- | --- | --- |
| Claude Code | `~/.claude/skills` | `.claude/skills` |
| Codex | `~/.codex/skills` | `.codex/skills` |
| Gemini CLI | `~/.gemini/skills` | `.gemini/skills` |

```bash
mkdir -p ~/.claude/skills
unzip base-ui-skill.zip -d ~/.claude/skills
```

Replace `~/.claude/skills` with the folder for your agent, then restart it. Skill folder locations can change between agent versions, so check your agent's documentation if the skill is not picked up.

### Other agents

For an agent without a skills folder (Cursor, Copilot, Windsurf, and others), extract the archive anywhere in your project and point the agent at it from its instruction file, such as `AGENTS.md`, `GEMINI.md` or `.cursor/rules`:

```md
For any NodexUI work, read and follow `base-ui/SKILL.md` first.
```

## Use

Ask in plain language. The skill triggers on these phrases:

| Say | Result |
| --- | --- |
| `create app` | Scaffolds a new NodexUI PWA |
| `use <component>` / `make <component>` | Emits a real NodexUI component |
| `use <icon>` / `make <icon>` | Emits a real Lucide icon |
| `create electron app` | PWA scaffold plus an Electron shell |
| `create capacitor app` | PWA scaffold plus a Capacitor shell |

If your agent does not trigger skills automatically, mention `base-ui` in the prompt, for example "use the base-ui skill to create app".

## Update

The archive is rebuilt from `scripts/base-ui` on every landing deploy. Download it again and extract over the old folder to update.

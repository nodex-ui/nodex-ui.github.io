.PHONY: help dev run

# Exported so the recipe sees it on any shell (sh, cmd.exe or PowerShell); no `VAR=value cmd` prefix needed.
export PORT ?= 5173

help:
	@echo nodex-ui.github.io make targets:
	@echo   make dev    Serve the site locally at http://127.0.0.1:$(PORT)/ - make dev PORT=xxxx to change
	@echo   make run    Alias for make dev

dev:
	node scripts/serve.mjs

run: dev

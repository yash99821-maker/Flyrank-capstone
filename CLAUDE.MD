# [CLAUDE.md](http://CLAUDE.md)

## Project Overview

This is my capstone project for the Fly Rank AI-assisted development internship track.

## Stack

- To be decided as project progresses (will update as I build)

## Conventions

- Commit messages follow Conventional Commits format (feat, fix, docs, chore, etc.)

- Code should be clean and commented where logic isn't obvious

- README should stay up to date with project progress

## AI Assistant Notes

When helping with this project, please:

- Explain changes briefly before making them

- Follow the conventions above

- Keep suggestions beginner-friendly since I'm learning as I go




## Rules learned from prompting drill (FE-05)

- Forms use react-hook-form + zod for validation — never plain useState with manual validation logic.
- When a prompt asks for a field that changes app behavior (e.g. a theme selector), explicitly state that the behavior must be visibly applied, not just saved to storage — otherwise the AI may implement the data layer only and skip the effect.
- Every form submission or reset action must show a visible confirmation/feedback message (e.g. via role="status") — don't let this get dropped silently between iterations.
- Precise prompts (file references, constraints, example behavior, and a "write tests then run them" verification step) take longer to write but cost less total time than a vague prompt, because the AI catches its own logic errors before I do.
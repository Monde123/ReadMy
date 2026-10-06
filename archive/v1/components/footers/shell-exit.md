# Terminal Shell Exit Footer

A command-line terminal exit card closing a terminal-style README with return code `0`, session uptime, and an invitation command.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: shell-exit -->
---

```bash
[session closed: pts/2]
$ echo $?
0

$ ping -c 1 mailto:engineer@domain.org
64 bytes from mail.domain.org: icmp_seq=1 ttl=56 time=12.4 ms
--- 0% packet loss: inbox is open for engineering dialogue ---

$ exit 0
Connection to alex-chen closed.
```
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Fits naturally at the bottom of CLI/terminal themed profiles (like `009-terminal-creative` or `014-neon-command-center`).
- Replaces standard bulleted contact links with a thematic terminal simulation.

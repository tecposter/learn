# tmux/session

**bind-key**

- `s`   list session
- `$`   name session


**new session**:

- `prefix + :new -s <SessionName>`
- `$tmux new -s <SessionName>`


**kill session**:

- `prefix + :kill-session -t <SessionName>`
- `$tmux kill-session -t <SessionName>`


**list session**:

- `prefix + s`
- `$tmux ls`


**rename session**

- `prefix + $`


**attach session**:

- `$tmux a -t <SessionName>`


**detach session**

- `prefix + d`

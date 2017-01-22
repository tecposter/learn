install tmux plugin: tmux-resurrect
https://github.com/tmux-plugins/tmux-resurrect

## key buildings

prefix + Ctrl-s - save
prefix + Ctrl-r - restore

## example


prefix + Ctrl-s

prefix + :kill-server

restart server

tmux

prefix + Ctrl-r


## Restoring vim and neovim sessions

in .tmux.conf

```
# for vim
set -g @resurrect-strategy-vim 'session'
# for neovim
set -g @resurrect-strategy-nvim 'session'
```

install vim plugin [vim-obsession](https://github.com/tpope/vim-obsession)


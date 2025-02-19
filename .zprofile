# ------------------------------------------------------------------------------
# ~/.zprofile (run once for login shells)
# ------------------------------------------------------------------------------

export PATH="/Applications/Postgres.app/Contents/MacOS/bin:$PATH"
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
export PATH="/Users/t0nylombardi/go/bin:$PATH"
export PATH="$PATH:/opt/X11/bin"
export PATH="$PATH:/opt/metasploit-framework/bin/"
export PATH="/usr/local/opt/llvm/bin:$PATH"
export PATH="/usr/local/opt/rustup/bin:$PATH"
export PATH="/etc/paths.d/postgressapp:$PATH"

export ARCHFLAGS="-arch $(uname -m)"
export PNPM_HOME="/Users/t0nylombardi/Library/pnpm"
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
fpath=(${ASDF_DATA_DIR:-$HOME/.asdf}/completions $fpath)

if command -v pyenv &>/dev/null; then
  export PIPENV_VENV_IN_PROJECT=1

  eval "$(pyenv init --path)"
fi

[[ -n $SSH_CONNECTION ]] && export EDITOR='code'

[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/shims:$PATH"

export LANG=en_US.UTF-8

export SPOTIFY_CLIENT_ID=e952b67ba0624be5b25ab675fbbe5100
export SPOTIFY_CLIENT_SECRET=083b0d4fd0af431eb7b840a0fe65fdb0

eval "$(/usr/local/bin/brew shellenv)" eval export HOMEBREW_PREFIX="/usr/local";
export HOMEBREW_CELLAR="/usr/local/Cellar";
export HOMEBREW_REPOSITORY="/usr/local/Homebrew";
fpath[1,0]="/usr/local/share/zsh/site-functions";

[ -z "${MANPATH-}" ] || export MANPATH=":${MANPATH#:}";
export INFOPATH="/usr/local/share/info:${INFOPATH:-}";

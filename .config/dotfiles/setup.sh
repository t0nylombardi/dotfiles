#!/bin/bash

echo "🚀 Setting up dotfiles repository..."

DOTFILES_DIR="$HOME/.config/dotfiles"
BARE_REPO="$HOME/.cfg"
GIT_REPO="git@github.com:t0nylombardi/dotfiles.git"  # ❗ Change this to your actual repo

# Step 1: Ensure dependencies
if ! command -v git &>/dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Step 2: Create dotfiles directory if it doesn’t exist
mkdir -p "$DOTFILES_DIR"

# Step 3: Move existing dotfiles to the dotfiles directory (but only if they’re not already symlinks)
echo "📦 Moving existing dotfiles to $DOTFILES_DIR..."
for file in ".zshrc" ".zprofile" ".gitconfig" ".tmux.conf" ".config/nvim" ".oh-my-zsh/custom" ".config/zsh"; do
  if [[ -L "$HOME/$file" ]]; then
      echo "🔄 Skipping $file (already a symlink)"
  elif [[ -e "$HOME/$file" ]]; then
      mv "$HOME/$file" "$DOTFILES_DIR/"
  fi
done

# Step 4: Create Symlinks (only if they don’t already exist)
echo "🔗 Creating symlinks..."
for file in ".zshrc" ".zprofile" ".gitconfig" ".tmux.conf" ".config/nvim" ".oh-my-zsh/custom" ".config/zsh"; do
  if [[ ! -L "$HOME/$file" ]]; then
      ln -s "$DOTFILES_DIR/$(basename $file)" "$HOME/$file"
  fi
done

# Step 5: Initialize Bare Git Repository for Dotfiles
echo "🛠 Initializing bare Git repository..."
git init --bare "$BARE_REPO"

# Step 6: Define the config alias (fixes "config: command not found" issue)
echo "🔗 Setting up config alias..."
function config {
   /usr/bin/git --git-dir=$BARE_REPO --work-tree=$HOME "$@"
}
echo "alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'" >> ~/.zshrc
source ~/.zshrc  # Load alias immediately

# Step 7: Configure Git to Ignore Untracked Files
config config --local status.showUntrackedFiles no

# Step 8: Add and Commit Dotfiles
echo "📂 Adding dotfiles to repository..."
config add ~/.zshrc ~/.zprofile ~/.gitconfig ~/.tmux.conf ~/.config/nvim ~/.oh-my-zsh/custom ~/.config/zsh
config commit -m "Initial commit of my dotfiles"
config remote add origin "$GIT_REPO"
config push -u origin main

echo "✅ Dotfiles repository setup complete!"

# ServerNuker

ServerNuker is a Discord bot designed to perform a series of destructive actions on a Discord server. **WARNING: This bot is highly destructive and should be used responsibly and with permission from the server owner.**

## Features

- Bans all members (except the server owner and allowed users)
- Changes the server name and icon
- Deletes all channels, roles, and emojis
- Sends a completion message before leaving the server

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/quehole/ServerNuker.git
    cd ServerNuker
    ```

2. Install dependencies:
    ```sh
    npm install discord.js
    ```

## Usage

1. Replace `YOUR_BOT_TOKEN` in `index.js` with your bot token.

2. Run the bot:
    ```sh
    node index.js
    ```

3. Use the `-blud` command in any channel the bot has access to. Only users with IDs specified in the `allowedUsers` array can execute the command.

## Disclaimer

This bot is intended for educational purposes only. The creator is not responsible for any misuse of this bot. Use it responsibly and only with the explicit permission of the server owner.

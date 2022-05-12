import { Command } from './Commands';
import { CacheType, Client, CommandInteraction, Intents, Interaction, OAuth2Guild } from 'discord.js';

type CommandCallbackMethod = (interaction: CommandInteraction) => void;

interface CommandEntry {
    command: Command,
    callback: CommandCallbackMethod,
}

class DiscordBot {
    // Object attributes
    private _token: string;
    private _client: Client;
    private _commands: Command[];
    private _clut: {[key: string]: CommandEntry};

    // Constructor
    constructor(intents: (Intents | number)[], token: string) {
        this._token = token;
        this._client = new Client({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS
        ] });
        this._commands = [];
        this._clut = {};
    }

    // Public methods
    public start() {
        this._client.login(this._token).then(() => {
            this.registerGuildCommands();
            this.client.on('interactionCreate', interaction => {
                if (interaction.isCommand()) {
                    this.commandHandler(interaction);
                } else {
                    console.log("IDK");
                }
            });
        });
    }

    public stop() {

    }

    get client(): Client {
        return this._client;
    }

    public addCommand(command: Command, callback: CommandCallbackMethod) {
        this._commands.push(command);
        this._clut[command.name] = {
            command: command,
            callback: callback
        };
    }

    // Internal methods
    private async registerGuildCommands() {
        console.log("Prebuilding commands...");
        let pdd = this._commands.map(command => command.build());
        let x = await this._client.guilds.fetch();
        x.forEach((d: OAuth2Guild) => {
            d.fetch().then(guild => {
                if (guild === undefined) return;
                console.log(`Registering in server "${guild?.id}"...`);
                guild?.commands.set(pdd);
            })
        });
        console.log("All commands registered!");
    }

    private async commandHandler(interaction: Interaction<CacheType>) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        this._clut[commandName]?.callback(interaction);
    }
};

export default DiscordBot;
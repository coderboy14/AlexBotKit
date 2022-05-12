import {GenericOption,
    NumberOption,
    MentionableOption,
    RoleOption,
    ChannelOption,
    UserOption,
    BooleanOption,
    IntegerOption,
    StringOption,
    SubCommandGroupOption,
    SubCommandOption,
    Command
} from '../Commands'

console.log("Running test 1!");

let command = new Command("poke", "Poke somebody");
command.addOption(new UserOption("target", true, "Who to poke"));
command.addOption(new StringOption("message", false, "What to say"));

console.log("Printing output data!")
console.log("----------")
console.log(JSON.stringify(command.build()));
console.log("----------")
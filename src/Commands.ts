export type CommandOption = 
    NumberOption | 
    MentionableOption | 
    RoleOption | 
    ChannelOption | 
    UserOption | 
    BooleanOption | 
    IntegerOption | 
    StringOption | 
    SubCommandOption | 
    SubCommandGroupOption;

abstract class GenericOption<T> {
    protected _name?: string;
    protected _description?: string;
    protected _required: boolean;
    protected _value: T | undefined;
    protected _choices: {[key: string]: T};

    public constructor(name?: string, required?: boolean, description?: string) {
        this._name = name;
        this._required = required ?? false;
        this._description = description;
        this._choices = {};
    }

    addChoice(key: string, value: T) {
        this._choices[key] = value;
    }

    get name(): string | undefined {
        return this._name;
    }
    
    get description(): string | undefined {
        return this._description;
    }

    get required(): boolean {
        return this._required;
    }

    get value(): (T | undefined) {
        return this._value;
    }

    protected set value(value: T | undefined) {
        this._value = value;
    }

    abstract build(): any;

    protected buildChoiceList(): any {
        var data: {}[] = [];
        var keys = Object.keys(this._choices);
        keys.forEach(key => data.push({name: key, value: this._choices[key]}));
        return data;
    }
}

class NumberOption extends GenericOption<number> {    
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 10, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class MentionableOption extends GenericOption<any> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 9, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class RoleOption extends GenericOption<any> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 8, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class ChannelOption extends GenericOption<any> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 7, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class UserOption extends GenericOption<any> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 6, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class BooleanOption extends GenericOption<Boolean> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 5, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class IntegerOption extends GenericOption<number> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 4, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class StringOption extends GenericOption<string> {
    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
    }

    public build(): any {
        return {
            type: 3, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: this.buildChoiceList()
        };
    }
};

class SubCommandGroupOption extends GenericOption<void> {
    protected _options: SubCommandOption[];

    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
        this._options = [];
    }

    public addSubcommand(target: SubCommandOption) {
        this._options.push(target);
    }

    public build(): any {
        var child_data: any[] = [];
        this._options.forEach(child => child_data.push(child.build()))
        return {
            type: 1, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: child_data
        };
    }
};

class SubCommandOption extends GenericOption<void> {
    protected _options: CommandOption[];

    public constructor(name: string, required: boolean, description?: string) {
        super(name, required, description);
        this._options = [];
    }

    public addOption(target: CommandOption) {
        this._options.push(target);
    }

    public build(): any {
        var child_data: any[] = [];
        this._options.forEach(child => child_data.push(child.build()))
        return {
            type: 1, 
            name: this._name, 
            description: this._description, 
            required: this._required,
            options: child_data
        };
    }
};

class Command {
    protected _name: string;
    protected _description?: string;
    protected _options: CommandOption[];

    public constructor(name: string, description?: string) {
        this._name = name;
        this._description = description;
        this._options = [];
    }

    get name(): string {
        return this._name;
    }
    
    get description(): string | undefined {
        return this._description;
    }

    public addOption(target: CommandOption) {
        this._options.push(target);
    }

    public build(): any {
        var child_data: any[] = [];
        this._options.forEach(child => child_data.push(child.build()))
        return {
            name: this._name, 
            description: this._description, 
            options: child_data
        };
    }
};

function CommandEncoder(command: Command) {
    return command.build();
}

export {
    GenericOption,
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
};
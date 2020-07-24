import {Command, flags} from '@oclif/command'
export default class Deletestack extends Command {
    static description: string;

    static examples: string[];

    static flags: {
        help: import('@oclif/parser/lib/flags').IBooleanFlag<void>;
        stack: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
    };

    static args: never[];

    run(): Promise<void>;
}

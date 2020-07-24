import {Command, flags} from '@oclif/command'
export default class Newapp extends Command {
    static description: string;

    static flags: {
        help: import('@oclif/parser/lib/flags').IBooleanFlag<void>;
        appDir: flags.IOptionFlag<string | undefined>;
        baseApp: flags.IOptionFlag<string | undefined>;
    };

    static examples: string[];

    run(): Promise<void>;
}

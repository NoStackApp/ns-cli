import { Command, flags } from '@oclif/command';
export default class Create extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        level: flags.IOptionFlag<string | undefined>;
        stack: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
        parent: flags.IOptionFlag<string | undefined>;
        value: flags.IOptionFlag<string | undefined>;
    };
    static args: never[];
    run(): Promise<void>;
}

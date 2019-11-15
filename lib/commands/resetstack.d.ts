import { Command, flags } from '@oclif/command';
export default class Resetstack extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        stack: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}

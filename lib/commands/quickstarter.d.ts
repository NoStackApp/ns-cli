import { Command, flags } from '@oclif/command';
export default class Quickstarter extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        appDir: flags.IOptionFlag<string | undefined>;
        stack: flags.IOptionFlag<string | undefined>;
        template: flags.IOptionFlag<string | undefined>;
        licenseId: flags.IOptionFlag<string | undefined>;
        user: flags.IOptionFlag<string | undefined>;
        email: flags.IOptionFlag<string | undefined>;
        password: flags.IOptionFlag<string | undefined>;
        userClass: flags.IOptionFlag<string | undefined>;
        jsonPath: flags.IOptionFlag<string | undefined>;
        baseApp: flags.IOptionFlag<string | undefined>;
    };
    static args: never[];
    run(): Promise<void>;
}

import { Command, flags } from '@oclif/command';
export declare const noNameError: any;
export default class Makecode extends Command {
    static description: string;
    static flags: {
        userClass: flags.IOptionFlag<string | undefined>;
        appName: flags.IOptionFlag<string | undefined>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: never[];
    run(): Promise<void>;
}

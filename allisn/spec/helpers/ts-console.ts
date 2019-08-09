// tslint:disable-next-line: no-var-requires
const TSConsoleReporter = require("jasmine-ts-console-reporter");

jasmine.getEnv().clearReporters(); // Clear default console reporter: might need to come back to this.
jasmine.getEnv().addReporter(new TSConsoleReporter());

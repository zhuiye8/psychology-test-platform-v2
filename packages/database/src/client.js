"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../generated/client");
const clientConfig = {
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'info', emit: 'event' },
    ],
    errorFormat: 'pretty',
};
exports.prisma = globalThis.prisma ?? new client_1.PrismaClient(clientConfig);
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = exports.prisma;
}
async function gracefulShutdown() {
    await exports.prisma.$disconnect();
    process.exit(0);
}
process.on('beforeExit', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
exports.default = exports.prisma;
//# sourceMappingURL=client.js.map
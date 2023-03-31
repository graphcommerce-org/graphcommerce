"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
// eslint-disable-next-line @typescript-eslint/require-await
exports.headers = [
    {
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, no-cache, no-store, max-age=0, must-revalidate',
            },
        ],
        source: '/:path*',
    },
];

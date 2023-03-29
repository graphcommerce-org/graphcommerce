"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
// eslint-disable-next-line @typescript-eslint/require-await
exports.headers = [
    {
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=0, must-revalidate',
            },
            {
                key: 'CDN-Cache-Control',
                value: 'public, max-age=31536000, stale-while-revalidate',
            },
        ],
        source: '/:path*',
    },
    {
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
            },
            {
                key: 'CDN-Cache-Control',
                value: 'public, max-age=31536000, stale-while-revalidate',
            },
        ],
        source: '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|js|css|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
    },
];

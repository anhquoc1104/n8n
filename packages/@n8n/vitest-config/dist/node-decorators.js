import swc from 'unplugin-swc';
import { mergeConfig } from 'vitest/config';
import { createVitestConfig } from './node.js';
const swcPlugin = swc.vite({
    jsc: {
        parser: {
            syntax: 'typescript',
            decorators: true,
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2022',
    },
    exclude: [],
});
export const createVitestConfigWithDecorators = (options = {}) => {
    const baseConfig = createVitestConfig(options);
    return mergeConfig(baseConfig, {
        plugins: [swcPlugin],
        esbuild: false,
        server: {
            deps: {
                inline: [/.*/],
            },
        },
    });
};
export const vitestConfigWithDecorators = createVitestConfigWithDecorators();
//# sourceMappingURL=node-decorators.js.map
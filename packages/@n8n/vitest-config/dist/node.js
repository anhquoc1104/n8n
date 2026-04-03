import { defineConfig } from 'vitest/config';
export const createVitestConfig = (options = {}) => {
    const vitestConfig = defineConfig({
        test: {
            silent: true,
            globals: true,
            environment: 'node',
            reporters: process.env.CI === 'true' ? ['default', 'junit'] : ['default'],
            outputFile: { junit: './junit.xml' },
            ...(process.env.COVERAGE_ENABLED === 'true'
                ? {
                    coverage: {
                        enabled: true,
                        provider: 'v8',
                        reporter: process.env.CI === 'true' ? 'cobertura' : 'text-summary',
                        all: true,
                    },
                }
                : {}),
            ...options,
        },
    });
    return vitestConfig;
};
export const vitestConfig = createVitestConfig();
//# sourceMappingURL=node.js.map
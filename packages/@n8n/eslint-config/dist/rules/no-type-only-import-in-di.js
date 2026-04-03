import { ESLintUtils } from '@typescript-eslint/utils';
export const NoTypeOnlyImportInDiRule = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow type-only imports for constructor parameters in @Service() classes.',
        },
        fixable: 'code',
        messages: {
            noTypeOnlyImportInDi: 'Constructor parameter "{{ paramName }}" uses type-only imported "{{ typeName }}" which is erased at runtime. Remove the `type` keyword to fix dependency injection.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.getSourceCode();
        const typeOnlyImports = new Map();
        return {
            ImportDeclaration(node) {
                if (node.importKind === 'type') {
                    for (const specifier of node.specifiers) {
                        if (specifier.type === 'ImportSpecifier' ||
                            specifier.type === 'ImportDefaultSpecifier') {
                            typeOnlyImports.set(specifier.local.name, { isTypeOnly: true, node });
                        }
                    }
                    return;
                }
                for (const specifier of node.specifiers) {
                    if (specifier.type === 'ImportSpecifier') {
                        const isSpecifierTypeOnly = specifier.importKind === 'type';
                        typeOnlyImports.set(specifier.local.name, {
                            isTypeOnly: isSpecifierTypeOnly,
                            node: specifier,
                        });
                    }
                }
            },
            ClassDeclaration(node) {
                const hasServiceDecorator = node.decorators?.some((d) => d.expression.type === 'CallExpression' &&
                    d.expression.callee.type === 'Identifier' &&
                    d.expression.callee.name === 'Service');
                if (!hasServiceDecorator)
                    return;
                const constructor = node.body.body.find((m) => m.type === 'MethodDefinition' && m.kind === 'constructor');
                if (!constructor || constructor.value.type !== 'FunctionExpression')
                    return;
                for (const param of constructor.value.params) {
                    const actualParam = param.type === 'TSParameterProperty' ? param.parameter : param;
                    if (actualParam.type !== 'Identifier' || !actualParam.typeAnnotation)
                        continue;
                    const typeNode = actualParam.typeAnnotation.typeAnnotation;
                    if (typeNode.type === 'TSTypeReference' && typeNode.typeName.type === 'Identifier') {
                        const typeName = typeNode.typeName.name;
                        const importInfo = typeOnlyImports.get(typeName);
                        if (importInfo?.isTypeOnly) {
                            context.report({
                                node: actualParam,
                                messageId: 'noTypeOnlyImportInDi',
                                data: { paramName: actualParam.name, typeName },
                                fix(fixer) {
                                    const targetNode = importInfo.node;
                                    if (targetNode.type === 'ImportDeclaration') {
                                        const fixes = [];
                                        const typeToken = sourceCode.getFirstToken(targetNode, (t) => t.value === 'type');
                                        if (!typeToken)
                                            return null;
                                        const nextToken = sourceCode.getTokenAfter(typeToken);
                                        if (!nextToken)
                                            return null;
                                        fixes.push(fixer.removeRange([typeToken.range[0], nextToken.range[0]]));
                                        for (const specifier of targetNode.specifiers) {
                                            if (specifier.type === 'ImportSpecifier' &&
                                                specifier.local.name !== typeName) {
                                                fixes.push(fixer.insertTextBefore(specifier, 'type '));
                                            }
                                        }
                                        return fixes;
                                    }
                                    if (targetNode.type === 'ImportSpecifier') {
                                        const typeToken = sourceCode.getFirstToken(targetNode, (t) => t.value === 'type');
                                        if (!typeToken)
                                            return null;
                                        const nextToken = sourceCode.getTokenAfter(typeToken);
                                        if (!nextToken)
                                            return null;
                                        return fixer.removeRange([typeToken.range[0], nextToken.range[0]]);
                                    }
                                    return null;
                                },
                            });
                        }
                    }
                }
            },
        };
    },
});
//# sourceMappingURL=no-type-only-import-in-di.js.map
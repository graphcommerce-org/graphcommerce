#!/bin/bash
# todo(paales): Move the generated packages a separate repository or commit them back to Magento.

echo "Generating @magento/peregrine + @magento/venia-ui TypeScript declarations from source.."
rm -r node_modules/@types/magento__peregrine
rm -r node_modules/@types/magento__venia-ui

find node_modules/@magento -name '*.js' -not -path "*/__*" | xargs $(yarn bin)/tsc --declaration --allowJs --emitDeclarationOnly --esModuleInterop -module esnext --moduleResolution node --outDir __types__
# yarn eslint --fix __types__/**/*.d.ts
yarn prettier --write --loglevel silent __types__/**/*.d.ts

echo "export * from './lib/index'" > __types__/peregrine/index.d.ts
echo "export * from './lib/index'" > __types__/venia-ui/index.d.ts

mv __types__/peregrine node_modules/@types/magento__peregrine
mv __types__/venia-ui node_modules/@types/magento__venia-ui
rm -r __types__

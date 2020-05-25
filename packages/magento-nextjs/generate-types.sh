#!/bin/bash

rm -rf $PWD/node_modules/@types/magento__peregrine
rm -rf $PWD/node_modules/@types/magento__venia-ui

find node_modules/@magento -name '*.js' -not -path "*/__tests__/*" -not -path "*/___tests__/*" -not -path "*/__stories__/*" -not -path "*/__mocks__/*"  -not -path "*/__fixtures__/*" | xargs $(yarn bin)/tsc --declaration --allowJs --emitDeclarationOnly --esModuleInterop -module esnext --moduleResolution node --outDir __types__
# yarn eslint --fix generated/__types__/**/*.d.ts
# yarn prettier --write generated/__types__/**/*.d.ts
mv $PWD/__types__/peregrine $PWD/node_modules/@types/magento__peregrine
mv $PWD/__types__/venia-ui $PWD/node_modules/@types/magento__venia-ui
rm -rf $PWD/__types__

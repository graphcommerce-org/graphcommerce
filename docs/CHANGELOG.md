# Change Log

## 4.10.0

### Minor Changes

- [#1690](https://github.com/graphcommerce-org/graphcommerce/pull/1690) [`649bc284d`](https://github.com/graphcommerce-org/graphcommerce/commit/649bc284d9a6b60c8aa02ddc9c7f91880dda4e10) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update docs

## 4.9.2

### Patch Changes

- [#1684](https://github.com/graphcommerce-org/graphcommerce/pull/1684) [`f90933627`](https://github.com/graphcommerce-org/graphcommerce/commit/f909336273ff4b6e14b29acce4acfae178ccb6fa) Thanks [@paales](https://github.com/paales)! - Add instruction to ignore whitespace when creating diff patch

## 4.9.1

### Patch Changes

- [#1656](https://github.com/graphcommerce-org/graphcommerce/pull/1656) [`4ad159784`](https://github.com/graphcommerce-org/graphcommerce/commit/4ad15978407f46574bf6ec561a2f50d6e39138cd) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - Added yarn codegen step to docs

## 4.9.0

### Minor Changes

- [#1636](https://github.com/graphcommerce-org/graphcommerce/pull/1636) [`3829a80b3`](https://github.com/graphcommerce-org/graphcommerce/commit/3829a80b3b51feef43a4408338cec3acd9ccd1ed) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update docs

## 4.8.0

### Minor Changes

- [#1603](https://github.com/graphcommerce-org/graphcommerce/pull/1603) [`26221795d`](https://github.com/graphcommerce-org/graphcommerce/commit/26221795d5ab7d4d66adae756fc02273b1500a53) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - changed icon docs

## 4.7.0

### Minor Changes

- [#1594](https://github.com/graphcommerce-org/graphcommerce/pull/1594) [`f00f3c27f`](https://github.com/graphcommerce-org/graphcommerce/commit/f00f3c27f6631da39127727da0ae1e991b687bed) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update roadmap

## 4.6.6

### Patch Changes

- [#1587](https://github.com/graphcommerce-org/graphcommerce/pull/1587) [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6) Thanks [@paales](https://github.com/paales)! - fixed typo from grapql to graphql

## 4.6.5

### Patch Changes

- [#1584](https://github.com/graphcommerce-org/graphcommerce/pull/1584) [`f424f3da1`](https://github.com/graphcommerce-org/graphcommerce/commit/f424f3da125d2ec961ae60ebec7a65825710f72c) Thanks [@paales](https://github.com/paales)! - fixed typo from grapql to graphql

## 4.6.4

### Patch Changes

- [#1443](https://github.com/graphcommerce-org/graphcommerce/pull/1443) [`c4c86df1e`](https://github.com/graphcommerce-org/graphcommerce/commit/c4c86df1e8c74956b2ae76ab1a88c496fced4790) Thanks [@timhofman](https://github.com/timhofman)! - Missing or outdated resolutions results in build errors

* [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { Trans, t } from '@lingui/macro'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    )
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { Trans } from '@lingui/react'
  import { i18n } from '@lingui/core'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key='My Translation {foo}' values={{ foo }}></Trans>
      </div>
    )
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

## 4.6.3

### Patch Changes

- [#1417](https://github.com/graphcommerce-org/graphcommerce/pull/1417) [`d57e4b782`](https://github.com/graphcommerce-org/graphcommerce/commit/d57e4b7828e9fed2cf6ac8164203b26a4427ef80) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update installation instructions

## 4.6.2

### Patch Changes

- [#1404](https://github.com/graphcommerce-org/graphcommerce/pull/1404) [`58e2251f5`](https://github.com/graphcommerce-org/graphcommerce/commit/58e2251f586a276cdb5971c8511ada50fa00994c) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - order

## 4.6.1

### Patch Changes

- [#1402](https://github.com/graphcommerce-org/graphcommerce/pull/1402) [`79032e8cd`](https://github.com/graphcommerce-org/graphcommerce/commit/79032e8cd6580a505df108a56052dd71a79e254c) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - metaUrls

## 4.6.0

### Minor Changes

- [#1400](https://github.com/graphcommerce-org/graphcommerce/pull/1400) [`153cc079a`](https://github.com/graphcommerce-org/graphcommerce/commit/153cc079a69514297ef565b8190e230f184ec551) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Add feature list

* [#1390](https://github.com/graphcommerce-org/graphcommerce/pull/1390) [`30d069a6a`](https://github.com/graphcommerce-org/graphcommerce/commit/30d069a6a50189ed2c1b8edcfa22657a3036c914) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update roadmap

### Patch Changes

- [#1401](https://github.com/graphcommerce-org/graphcommerce/pull/1401) [`52f795098`](https://github.com/graphcommerce-org/graphcommerce/commit/52f795098675827c788b04cbcc81470612ee0211) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Roadmap

## 4.5.5

### Patch Changes

- [#1374](https://github.com/graphcommerce-org/graphcommerce/pull/1374) [`180cc0f43`](https://github.com/graphcommerce-org/graphcommerce/commit/180cc0f43bd22ac140cb50c015f7eecc85f7e911) Thanks [@timhofman](https://github.com/timhofman)! - header styling doc steps breaks page due to missing import

* [#1375](https://github.com/graphcommerce-org/graphcommerce/pull/1375) [`451ece476`](https://github.com/graphcommerce-org/graphcommerce/commit/451ece476b6413206ca1afdf39bedb59f72d6547) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Specify PSP's so its easier to check when upgrade what one should remove

## 4.5.4

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 4.5.3

### Patch Changes

- [#1373](https://github.com/graphcommerce-org/graphcommerce/pull/1373) [`48cb78229`](https://github.com/graphcommerce-org/graphcommerce/commit/48cb782299a9efecffbe338e2954af03293e27c8) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update docs, translations

## 4.5.2

### Patch Changes

- [#1354](https://github.com/graphcommerce-org/graphcommerce/pull/1354) [`90fa8d8b9`](https://github.com/graphcommerce-org/graphcommerce/commit/90fa8d8b90e2a3b33cdbb178a87094888c7befdd) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Small fixes to docs

## 4.5.1

### Patch Changes

- [#1347](https://github.com/graphcommerce-org/graphcommerce/pull/1347) [`31f463d5c`](https://github.com/graphcommerce-org/graphcommerce/commit/31f463d5c2edff45911b63b1d89e5857244c1754) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upgrading

## 4.5.0

### Minor Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`a06c86706`](https://github.com/graphcommerce-org/graphcommerce/commit/a06c86706c8b76ce91cfa1e526fe16aa20c53991) Thanks [@paales](https://github.com/paales)! - Added upgrade instructions

### Patch Changes

- [#1338](https://github.com/graphcommerce-org/graphcommerce/pull/1338) [`a8886ce4c`](https://github.com/graphcommerce-org/graphcommerce/commit/a8886ce4c059e85b83158b4bc1d8e2f04626d49f) Thanks [@paales](https://github.com/paales)! - Docs improvements

## 4.4.3

### Patch Changes

- [#1334](https://github.com/graphcommerce-org/graphcommerce/pull/1334) [`d1a06dd8e`](https://github.com/graphcommerce-org/graphcommerce/commit/d1a06dd8e060986a4d652c9d5e46d9d1a161a7d1) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - fix installation video

## 4.4.2

### Patch Changes

- [#1332](https://github.com/graphcommerce-org/graphcommerce/pull/1332) [`8c65a1499`](https://github.com/graphcommerce-org/graphcommerce/commit/8c65a1499200476e962112177060b7e74ae5d500) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - add installation video, update license

## 4.4.1

### Patch Changes

- [#1324](https://github.com/graphcommerce-org/graphcommerce/pull/1324) [`73d07c6bb`](https://github.com/graphcommerce-org/graphcommerce/commit/73d07c6bbf630a92e44a2b2baf14200eb6900db5) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Update docs, add new graphcms media url

## 4.4.0

### Minor Changes

- [#1320](https://github.com/graphcommerce-org/graphcommerce/pull/1320) [`2ecac6e06`](https://github.com/graphcommerce-org/graphcommerce/commit/2ecac6e06ad19257acfd18e9042c5f81f66b476e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Sort order, add link to create feature request

## 4.3.0

### Minor Changes

- [#1311](https://github.com/graphcommerce-org/graphcommerce/pull/1311) [`af7c45d65`](https://github.com/graphcommerce-org/graphcommerce/commit/af7c45d650c4e1472933ab5393bb370195f3e708) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Add contributing

## 4.2.1

### Patch Changes

- [#1316](https://github.com/graphcommerce-org/graphcommerce/pull/1316) [`6a8c84fb9`](https://github.com/graphcommerce-org/graphcommerce/commit/6a8c84fb910b9e23cdb08825b87c238510484f4a) Thanks [@paales](https://github.com/paales)! - Renamed all repository references to the [new repository](https://github.com/graphcommerce-org/graphcommerce).

## 4.2.0

### Minor Changes

- [`2eaf3f7c7`](https://github.com/ho-nl/m2-pwa/commit/2eaf3f7c77b20da78a167b9fdb641cdd26a17e21) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Upload images to github

## 4.1.0

### Minor Changes

- [`ef499815c`](https://github.com/ho-nl/m2-pwa/commit/ef499815cb1d1e040408ae697f8f3156b5478020) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix build breaking spacing

### Patch Changes

- [`12fc8166f`](https://github.com/ho-nl/m2-pwa/commit/12fc8166fd255db87862a08504a5a88552e41e08) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Fix build breaking spaces

## 4.0.1

### Patch Changes

- [`2db82d114`](https://github.com/ho-nl/m2-pwa/commit/2db82d114ffd4b4860e5a31ce0f2cd170732bda6) Thanks [@paales](https://github.com/paales)! - Docs improvements: add alt attribute to docs images, markup external links, images as markdown, play video inline

## 4.0.0

### Major Changes

- [#1302](https://github.com/ho-nl/m2-pwa/pull/1302) [`22ea2a0af`](https://github.com/ho-nl/m2-pwa/commit/22ea2a0af373dbd427e85f6ac82a074b1928a289) Thanks [@paales](https://github.com/paales)! - Moved all rendering of docs to https://www.graphcommerce.org/docs and use this only as a content package.

## 3.1.4

### Patch Changes

- [`29c967b09`](https://github.com/ho-nl/m2-pwa/commit/29c967b096ebc2e02049c0edc8614cc432c66187) Thanks [@paales](https://github.com/paales)! - publish docs privately on npm so it can be used for the docs website

## 3.1.3

### Patch Changes

- [#1296](https://github.com/ho-nl/m2-pwa/pull/1296) [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea) Thanks [@paales](https://github.com/paales)! - implement handling for canonical URLs based on NEXT_PUBLIC_SITE_URL

- Updated dependencies [[`a9cff2ce6`](https://github.com/ho-nl/m2-pwa/commit/a9cff2ce63fce5b86e9fd6bf63c10c782326d50e), [`8473123fa`](https://github.com/ho-nl/m2-pwa/commit/8473123fa7d3f3eb1d282d9b4205c803a88010ea), [`50e205c51`](https://github.com/ho-nl/m2-pwa/commit/50e205c51f4d0d67d41d22fd70e8ed9a0996489e)]:
  - @graphcommerce/next-ui@4.2.2

## 3.1.2

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

* [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee) Thanks [@paales](https://github.com/paales)! - added responsive size to the Fab component

* Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/next-ui@4.2.0

## 3.1.1

### Patch Changes

- [#1285](https://github.com/ho-nl/m2-pwa/pull/1285) [`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017) Thanks [@paales](https://github.com/paales)! - upgraded dependencies

- Updated dependencies [[`c85294ba6`](https://github.com/ho-nl/m2-pwa/commit/c85294ba6d742ce78c074559a1e95409b25a5017)]:
  - @graphcommerce/next-ui@4.1.3

## 3.1.0

### Minor Changes

- [#1281](https://github.com/ho-nl/m2-pwa/pull/1281) [`756ac889a`](https://github.com/ho-nl/m2-pwa/commit/756ac889a711b0c46a9e6948555f87c8fcaf4c5f) Thanks [@paales](https://github.com/paales)! - New mobile menu using a separate route, allows us to use the LayoutOverlay which gives all sorts of nice customization options.

* [#1278](https://github.com/ho-nl/m2-pwa/pull/1278) [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Written documentation for GraphCommerce! 👩‍🏫🧑‍🏫📚📖

- [#1284](https://github.com/ho-nl/m2-pwa/pull/1284) [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14) Thanks [@paales](https://github.com/paales)! - SvgIcon is now more extenable and flexible:

  - It will automatically calculate the stroke-width of the SVG based on the rendered size, allowing for a more flexible use for icons.

  - Make SvgIcon themable in your own Theme.

  - Create overrides for components that will be used throughout the app.

* [#1283](https://github.com/ho-nl/m2-pwa/pull/1283) [`cc7f9e9ed`](https://github.com/ho-nl/m2-pwa/commit/cc7f9e9eddd90f619a5041890b4e714a2314db2b) Thanks [@paales](https://github.com/paales)! - Added a new search function to the docs

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`4bb963d75`](https://github.com/ho-nl/m2-pwa/commit/4bb963d7595b5ce6e3a4924cc2e3e8b0210cdcd6), [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/framer-next-pages@3.1.0
  - @graphcommerce/image@3.1.0
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3
  - @graphcommerce/next-config@3.0.3

## 3.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/framer-next-pages@3.0.2
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/next-config@3.0.2

## 3.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/framer-next-pages@3.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/next-config@3.0.1

## 3.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/framer-next-pages@3.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/next-config@3.0.0

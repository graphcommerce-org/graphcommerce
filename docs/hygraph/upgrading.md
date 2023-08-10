---
menu: Upgrading your Hygraph Schema
---

## Upgrading your Hygraph schema

In version 6.2 and onwards it is possible to upgrade your Hygraph schema using
the Graphcommerce Hygraph CLI. This is a tool that automatically modifes your
Hygraph schema without the need of adding models/components/enumarations
manually.

🟠 There is no rollback functionality in the Hygraph CLI (yet). This means once
you run a migration, you can't undo these schema changes with the CLI. You will
be required to remove the added fields within the standard Hygraph UI.

🟠 It is adviced to test the migration on a copy of the current Hygraph Schema.

### Steps

The following steps are needed to utilize this tool:

1. Install the @graphcommerce/hygraph-cli package

2. Create a Hygraph migration token

   1. Open your Hygraph project. Go to: Project settings > Permanent auth tokens

   2. Click 'Add token' and give it a name, something like 'GraphCommerce Write
      Access Token' and keep stage on 'Published'.

   3. Under 'Management API', click 'Yes, Initialize defaults'

   4. Click 'Edit Permissions' and enable: 'Update' and 'Delete' permissions for
      'models', 'enumerations', 'fields', 'components' and 'sources':

      - Update existing models

      - Delete existing models

      - Update existing fields

      - Delete existing fields

      - Update existing enumerations

      - Delete existing enumerations

      - Update existing components

      - Delete existing components

      - Update remote sources

      - Delete remote sources

      - Read existing environments

      - Read public content views

      - Create public content views

      - Update public content views

      - Delete public content views

      - Can see schema view

   5. Add this new token to your env file like this:
      `GC_HYGRAPH_WRITE_ACCESS_ENDPOINT=””`

3. Add the Content API key to your env file like this:
   `GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/.../master"`
4. Add your projectID to your env file like this: `GC_HYGRAPH_PROJECT_ID=””`
5. Run `yarn graphcommerce hygraph-migrate`
6. Select the migration you want to run and press enter.
7. The migrations should now be upgraded, check your Hygraph Schema if changes
   are made.

---
menu: Hygraph cli
---

# Hygraph migrate cli

It is possible to upgrade your Hygraph schema using the Graphcommerce Hygraph
CLI: `yarn graphcommerce hygraph-migrate`

This is a tool that automatically modifies your Hygraph schema without having to
add models, components field and enumerations manually.

Please note that:

- All migrations are backwards compatible with previous versions of
  GraphCommerce. This means that after running a migration, older versions of
  GraphCommerce will still work (unless specified otherwise)

- There is no rollback functionality in the Hygraph migrate cli. Please create a
  copy of the project to test te migration on first. Once you run a migration,
  you can't undo these schema changes with the CLI. You will be required
  rollback the from the UI yourself.

### Steps

The following steps are needed to utilize this tool:

1. Create a Hygraph migration token
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
   5. Add this new token to your env file:
      `GC_HYGRAPH_WRITE_ACCESS_TOKEN="{YOUR_WRITE_ACCESS_TOKEN}"`
2. Run `yarn graphcommerce hygraph-migrate`
3. Select the migration you want to run and press enter.
4. The migrations should now be applied, check your Hygraph Schema if changes
   are made.

### Addtional config

These configurations should not be necessary and can be deduced from the
hygraphEndpoint URL. This allows you to override them in case something goes
wrong.

Before adding these make sure you've configure the 'High Performance Content
API' als your hygraphEndpoint.

- Add your hygraphProjectId to your env file like this:
  1.  Settings > Project > Id
  2.  Add the project ID to your env file:
      `GC_HYGRAPH_PROJECT_ID="{YOUR_PROJECT_ID}"`
- Add your hygraphManagementApi to your env file like this:
  1.  Copy the Management API URL and add to your env file:
      `GC_HYGRAPH_MANAGEMENT_API="{YOUR_MANAGEMENT_API}"`

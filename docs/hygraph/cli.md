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
2. Add the Content API key to your env file like this:
   1. Open your Hygraph project. Go to: Project settings -> API Access
   2. Copy the Content API URL and add to your env file:
      `GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="{YOUR_WRITE_ACCESS_ENDPOINT}"`
3. Add your hygraphProjectId to your env file like this:
   1. Copy the project ID from the URL when logged in
      `https://app.hygraph.com/PROJECT_ID_IS_HERE/master`
   2. Add the project ID to your env file:
      `GC_HYGRAPH_PROJECT_ID=”{YOUR_PROJECT_ID}”`
4. Add your hygraphManagementApi to your env file like this:
   `GC_HYGRAPH_MANAGEMENT_API="{YOUR_MANAGEMENT_API}"`
5. Run `yarn graphcommerce hygraph-migrate`
6. Select the migration you want to run and press enter.
7. The migrations should now be applied, check your Hygraph Schema if changes
   are made.

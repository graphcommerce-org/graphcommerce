# Address fields nl

Implementation of the Dutch address fields, add an autocomplete field for the
street name and city based of the customers postcode + street number + addition.

When a dutch country is selected it will automatically switch the address fields
to give a postcode + housenumber + addition field first and street + city
second.

## Installation

1. Find current version of your `@graphcommerce/next-ui` in your package.json.
2. `yarn add @graphcommerce/address-fields-nl@1.2.3` (replace 1.2.3 with the
   version of the step above)
3. Copy `@graphcommerce/address-fields-nl/lib/natationaalgeoregister` to
   `lib/nationaalgeoregister` in your project.
4. Copy the contents of `lib/nationaalgeoregister/.meshrc.yml` in `.meshrc.yml`
5. Make sure you installed `@graphql-mesh/json-schema`

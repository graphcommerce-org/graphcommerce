#
# Helper script to generate a master Typescript definition file.
#
INPUT_FILES=lib/@magento/*/lib/index.js
OUTPUT_FILE=shop/types.d.ts
regex='src/components/([A-Za-z]+)/index.js'

# Initialize the output file with a header
cat > $OUTPUT_FILE <<- EOM
// Type definitions for <my project>
// Project: <my project>
// Definitions by:

/// <reference types="my-project" />

EOM

# Loop through all input files and run react2dts on them,
# concatenating the output to our single output file
for file in $INPUT_FILES; do
  [[ $file =~ $regex ]]
  comp_name=${BASH_REMATCH[1]}
  $(npm bin)/react2dts --file "$file" --name $comp_name >> $OUTPUT_FILE
done

#!/bin/bash

# get current version from package.json
VERSION=$(node -pe "require('./package.json').version")

# increment version
NEW_VERSION=$(echo $VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')

# update package.json with new version
npm version $NEW_VERSION

# commit package.json with message "Bump version to <new_version>"
git add package.json
git commit -m "Bump version to $NEW_VERSION"

# create a new tag for the new version
git tag -a v$NEW_VERSION -m "Version $NEW_VERSION"

# push changes and new tag to remote repository
git push --tags
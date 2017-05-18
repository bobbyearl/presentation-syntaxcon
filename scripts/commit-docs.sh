# Fail the build if this step fails
set -e

if [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then

  # Setup git and clone our repo
  git config --global user.email "bobby@simplyearl.com"
  git config --global user.name "Bobby Earl"
  git clone --quiet --branch=$TRAVIS_BRANCH https://${GH_TOKEN}@github.com/bobbyearl/presentation-syntaxcon.git syntaxcon > /dev/null

  # Copy our "built" files into our clone and add them
  cp -rf docs/ syntaxcon/
  cd syntaxcon
  git add docs/

  # Make sure there are any changes.
  # git commit will fail if there are no changes
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit\n."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to $TRAVIS_BRANCH [ci skip]"
    git push -fq origin $TRAVIS_BRANCH > /dev/null
    echo -e "Ssuccessfully updated.\n"
  fi
fi
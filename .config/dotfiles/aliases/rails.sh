alias rbe='bundle exec'

prepare_spec() {
  # Log the start of the process
  echo "Starting CI setup and tests..."

  # Run the command, but ensure it only proceeds if db:prepare is successful
  CI=true bundle exec rails db:prepare spec
  if [ $? -eq 0 ]; then
    echo "Database prepared successfully, running tests..."
    bundle exec rspec
  else
    echo "Error: Database preparation failed. Aborting tests."
    return 1
  fi
}

rtest() {
  CI=true bundle exec rspec
}

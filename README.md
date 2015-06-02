Reaction Time Trainer
=====================

*Note: this is currently a work in progress.*

This is an app for training reaction time. The backend consists of a test-driven
Rails app (see the spec folder) with a few RESTful endpoints. The frontend uses
React and the Flux architecture through Marty. It also uses React Router for
navigation. The frontend was not test-driven as I was still learning the ins and
outs of the technologies. However, I plan to add full test coverage.

The backend and frontend are clearly demarcated such that the frontend is a
fully single-page app that makes requests to the backend for data and to update
data. This is also true for the authentication scheme. For instance, the
frontend will send a user's credentials (username and password) to the `session`
endpoint to request a `session_token`. The frontend then takes this token, sets
it as a cookie, and uses it in every subsequent request by putting it into a
header. The backend then uses this header to verify users.

To set up the app, you will need to do a `bundle install` to get the gem
dependencies and an `npm install` to get the npm packages for the frontend. You
will also need to run `npm run build` to build `bundle.js`. Migrate the
database, start the Rails server, and you'll be good to go.

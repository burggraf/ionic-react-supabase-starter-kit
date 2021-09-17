# ionic-react-supabase-starter-kit
Starter kit for building mobile, desktop, and web applications using Supabase with Ionic Framework and React JS

## Contents

### Auth
- sign in with email
- sign up with email
- reset password flow
- sign in with magic link
- sign in with provider
  - google
  - facebook
  - twitter
  - apple
  - twitch
  - discord
  - github
  - bitbucket
  - gitlab
  
### Services
- auth service (in Login folder)
  - allows subscribing to current user object
  - loads current user automatically on app startup
  - handles all auth methods for login/logout flow and password reset
- keys service (for storing public Supabase keys)
- startup service (to manage the startup and default routes)
- data service (providing database access)
  
### Menu
- login button (if not logged in)
- logout button (if logged in)
- display email of logged-in user
- subscribes to user object (using BehaviorSubject)

### Database

### Storage
TODO

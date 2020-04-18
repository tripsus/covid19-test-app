# Setting up SENDGRID_API_KEY
For mailing to work we have to set the enviornment variable **SENDGRID_API_KEY**. This cannot be committed to code so we have to set it as enviornment variable.
If we are deploying this in Heroku follow below steps to add **SENDGRID_API_KEY** to enviornment variables so that it is accesible to code when deployed.

1. Go to herkou apps dashboard. The url is generally in this "https://dashboard.heroku.com/apps/[app-name]" format.
2. Navigate to Settings.
3. Click on Reveal Config vars.
4. In the empty box of key value pairs add **SENDGRID_API_KEY** in the key field and your sendgrid api key which you created from sendgrid console to value.

# Setting up Postgres credentials.
- If your heroku app already has a attached postgres instance to it then you can directly use **DATABASE_URL** environment variable in your code.
- If your heroku app doesn't have a attached postgres instance then **DATABASE_URL** will not be set for you. In that case go to your app and add the postgres instance which you want to connect to in your app.

   1. To add a postgres instance go to app dashboard of the app which has a postgres instance.
   2. Navigate to **Resources** section and you will have Postgres listed there.
   3. Click on **Attached as database** and then **Manage Attachemnts**.
   4. In the side window click **Attach another app** type your new app name and your are good to deploy your app.

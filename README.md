# sanity-plugin-dashboard-widget-amplify

This is a simple widget that allows you to trigger a build on Amplify.  

The widget does NOT setup any type of observer or monitoring of the build and report back when it completes or if it is successful or not.  

## Installing

### Install the dashboard plugin
To get dashboard support in Sanity Studio in general:

```text
sanity install @sanity/dashboard
```


### Install the Amplify widget plugin

```text
sanity install dashboard-widget-amplify
```

## Configuring

### 1. Get the build hook id and token for your Amplify site
- Open the Amplify Console,  and select your site
- Navigate to the `Build settings` area 
- Look at the `Incoming webhooks` section.  
- If there is not already a webhook created for the right branch, click `Create webhook` button, then name the webhook; point it at the branch you want to build, and click `Save`
- Copy the `URL` for you webhook and save it for the configuration step later

### 2. If you don't already have a dashboardConfig setup, in your `sanity.json` file, append the following line to the `parts` array:

  ```json
  {
    "implements": "part:@sanity/dashboard/config",
    "path": "src/dashboardConfig.js"
  }
  ```
### 3.Create or update the `src/dashboardConfig.js` file using the webhook URL for your site:  (I suggest using layout width medium but you can adjust to your needs)

```javascript
export default {
  widgets: [
   {
      name: 'amplify',
      options: {
        title: 'Amplify Deploy',
        buttonText: 'Deploy to Amplify',
        webhookUrl: 'https://webhooks.amplify.us-east-1.amazonaws.com/prod/webhooks?id=xyxyxyxy-xyxy-xyxy-xyxy-xyxyxyxyxyxy&token=dfhjksfdh7dsfkjdsfsdfhkj098',
      },
      layout: {width: 'medium'}  
    }
  ]
}
```

### 4. Add AWS webhooks endpoint to CORS 
If you are having problems with Amplify not getting your build triggers you may need to add CORS entry

From your Sanity Studio directory:
  '''text
    sanity cors add 'webhooks.amplify.us-east-1.amazonaws.com/*'
  '''
Allow credentials to be sent from this origin? Please read the warning above?  Answer No (default answer)

## Options


### `title` (optional)

Overrides the widgets default title 
Defaults to `Deploy to Amplify`


### `buttonText` (optional)

Overrides the default text on the Button (Optional). 
Defaults to `Deploy`

### `webhookUrl` (required) 
The Amplify webhook URL for your site 
(see Configuration section above for where to get this value)

## Local development

1. Fork/clone this repo
2. Install dependencies (`yarn` or `npm install`)
3. Link for local development (`yarn link` or `npm link`)
4. Run build to compile your changes (`yarn build` or `npm run build`)
5. Link in a local studio folder (`yarn link "sanity-plugin-dashboard-widget-amplify"` or `npm link sanity-plugin-dashboard-widget-amplify`)
6. Add `dashboard-widget-amplify` to the plugin array in `sanity.json`
7. Add widget config to your `dashboardConfig.js`

## To Do
Want to implement several of the things that the Netlify plugin does.
- Support multiple sites in array
- Change to use observable pattern and display progress of build 
- Use nice image to display progress
- Make Layout Width Medium the default


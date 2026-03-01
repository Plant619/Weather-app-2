# Weather App
Allows users to choose locations and check the current weather there. 

## Setup 
1. Install required dependencies
Type ```npm install``` into terminal

2. Create your own API key 
Go to _____ and create an api key
Go to _____ and create an api key

3. Make ```.env``` file
In the .env type

```
CSC_API_KEY=your_csc_api_key_here
OW_API_KEY=your_ow_api_key_here
```

4. Start the server
Type ```node server.js``` into terminal

5. Run app 
In a new terminal, type ```npm run start``` 

## How app works

User chooses a country from the list. 
Based on the country chosen, options for cities/states are provided for the user to choose from
The weather is then displayed based on the city/state chosen
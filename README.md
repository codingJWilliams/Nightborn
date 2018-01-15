# Nightborn Bot
[![Build Status](https://travis-ci.org/codingJWilliams/Nightborn.svg?branch=master)](https://travis-ci.org/codingJWilliams/Nightborn)  
A general purpose bot for Nightborn Estate

# Prequisites
## MongoDB
You should have a MongoDB instance set up with a database called `nightborn`
The collections in the production database are:   
 - <note - add later>  
  
Some of these will be created automagically whereas some of these will need to be created and populated by hand  
## MCJsonAPI
The bot utilises a custom connector, in `helpers/minecraft.js` and `helpers/minecraft_raw.js` to connect to a spigot server running the [MCJsonAPI](http://mcjsonapi.com), and the PermissionsEx plugin.
You can disable the usage of this by moving the `commands/minecraft` folder out of the commands folder

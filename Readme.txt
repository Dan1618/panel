FIREING UP THE APP:
0. you have to install mongodb v 3.2.0
1. bower install in client folder
2. npm install in server folder
3. run server.js as following: (with inspector and nodemon globally installed)
node-inspector --web-port=5959 & nodemon --debug server.js
(flag --web-port=5959 changes default node-inspector port, sometimes yo have to run this command with --harmony flag if you get strict mode error)


TODOS:
# better gulp workflow - perfectly to be just one command which starts node-inspector, nodemon, and some gulp tasks to automate the flow
# DataService is redundant
# While editing people list you can pass only _id to backend with query



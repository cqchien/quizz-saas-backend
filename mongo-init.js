db = db.getSiblingDB('admin');
// move to the admin db - always created in Mongo
db.auth("knowled", "knowled");
// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB('knowled');
// create and move to your new database
db.createUser({
'user': "knowled",
'pwd': "knowled",
'roles': [{
    'role': 'dbOwner',
    'db': 'knowled'}]});
// user created
db.createCollection('knowled');
// add new collection 
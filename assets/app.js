// Initialize firebase
  var config = {
    apiKey: "AIzaSyBfGxS7Pu7O5xM9XsP8Np-UT_yXG1ygJ9Q",
    authDomain: "train-scheduler-ca39e.firebaseapp.com",
    databaseURL: "https://train-scheduler-ca39e.firebaseio.com",
    projectId: "train-scheduler-ca39e",
    storageBucket: "train-scheduler-ca39e.appspot.com",
    messagingSenderId: "916722169798"
  };
  firebase.initializeApp(config);

  //Get a reference to the database service
var database = firebase.database();


var trainName="";
var Destination="";
var Frequency="";
var nextArrival="";
var minutesAway="";



//On submit click, grab the values from the fields.

$("#add-train").on("click", function(event) {

    event.preventDefault();

trainName = $("#Train-Name").val().trim();
Destination = $("#Destination").val().trim();
Frequency = $("#Frequency").val().trim();
nextArrival = $("#Next-Arrival").val().trim();
minutesAway = $("#Minutes-Away").val().trim();



var newObject = {
    trainName: Train-Name,
    Destination: Destination,
    Frequency: Frequency,
    nextArrival: Next-Arrival,
    minutesAway: Minutes-Away,
}

database.ref().push(
    newObject
);
});
console.log(newobject);











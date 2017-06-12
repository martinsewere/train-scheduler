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


var name="";
var destination="";
var frequency="";
var nextArrival="";
var minutesAway="";
var inputTrain="";



//On click button, grab the values from the input fields.

$("#add-train").on("click", function(event) {
  console.log(event);

    event.preventDefault();

// Takes information from the html form and stores them into variables
name = $("#name").val().trim();
destination = $("#destination").val().trim();
frequency = $("#frequency").val().trim();
nextArrival = $("#nextArrival").val().trim();
minutesAway = $("#minutesAway").val().trim();

convertedTime = moment(nextArrival, "hh:mm").subtract(1, "years");
console.log("Converted Time " + convertedTime);
timeDiff = moment().diff(moment(convertedTime), "minutes");
console.log("Difference in Time " + timeDiff);
tRemainder = timeDiff % frequency;
console.log("Modulus " + tRemainder);
minRemain = frequency - tRemainder;
nextArrival = moment().add(minRemain, "minutes").format("hh:mm");
console.log(nextArrival);


// Stores data in firebase database
var inputTrain= {
    name: name,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway,
}

database.ref().push(inputTrain);

$("#name").val("");
$("#destination").val("");
$("#frequency").val("");
$("#nextArrival").val("");

});
console.log(inputTrain);

database.ref().on("child_added", function(childSnapshot) {

  name = childSnapshot.val().name;
  destination = childSnapshot.val().destination;
  frequency = childSnapshot.val().frequency;
  nextArrival = childSnapshot.val().nextArrival;
  minutesAway = childSnapshot.val().minutesAway;

  $(".table").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>")

})











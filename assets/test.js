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


function clearForm() {
  	$("#Train-Name").val('');
  	$("#Destination").val('');
  	$("Next-Arrival").val('');
  	$("#Frequency").val('');
  }

  // Submit button for train info
  $("button").on('click', function(){
  	var trainName = $("#Train-Name").val();
  	var Destination = $("#Destination").val();
  	var nextArrival = $("#Next-Arrival").val();
  	var Frequency = $("#Frequency").val();


  var trainSchedule = {
  	trainName: trainName,
  	Destination: Destination,
  	nextArrival: nextArrival,
  	Frequency: Frequency,
  	minutesAway: minutesAway,
  	// nextTrain: moment(nextTrain).format("hh:mm"),
  	// dateAdded: firebase.database.ServerValue.TIMESTAMP

  };



  database.push(trainSchedule);

  
clearForm();
  // console.log(trainSchedule.name);
  // console.log(trainSchedule.trainDestination);
  // console.log(trainSchedule.time);
  // console.log(trainSchedule.trainFrequency);
  return false;
});

  database.on('child_added', function (snapshot){
  	var recentTrain = snapshot.val();
  	var row = $('<tr>');

  	 console.log(recentTrain);

  	var td = $('<td>').text(recentTrain.name);
  	row.append(td);

  	td = $('<td>').text(recentTrain.trainDestination);
  	row.append(td);


  	var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
  	console.log(firstTimeConverted);
  	
  	var currentTime = moment();
  	console.log('CURRENT TIME:' + moment(currentTime).format("hh:mm"));
  	td = $('<td>').text(recentTrain.trainTime)
  	row.append(td);
  	
  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  	console.log('DIFFERENCE IN TIME:' + diffTime);
  	td = $('<td>').text(recentTrain.trainTime)
  	row.append(td);

  	var timeRemaining = diffTime % recentTrain.trainFrequency;
  	console.log(timeRemaining)
  	td = $('<td>').text(recentTrain.trainFrequency);
  	row.append(td);
  	console.log(frequency)

  	var minutesAway = recentTrain.trainFrequency - timeRemaining;
  	console.log ("MINUTES TILL NEXT ARRIVAL: " + minutesAway);
  	td = $('<td>').text(recentTrain.minutesAway);
  	row.append(td);

  	var nextTrain = moment().add(minutesAway, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	td = $('<td>').text(recentTrain.nextTrain);
  	row.append(td);

	console.log(row);

  	$('tbody').append(row);
  })
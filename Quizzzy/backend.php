<?php 
// authors: Kamil Donda, Remigiusz Drobinski
header("Content-Type: application/json");

// Receive input from client
$input = json_decode(file_get_contents('php://input'));

// Set data from local JSON file here
$localJSON = [];

// Name of file
$fileName = "data.json";

// Read data from file if it is not null
if(file_get_contents($fileName) != null)
    $localJSON = json_decode(file_get_contents($fileName));
else
    file_put_contents($fileName, json_encode($localJSON));

if($input != null) {
    // Add received input into array
    array_push($localJSON, $input);

    // Save array into file
    file_put_contents($fileName, json_encode($localJSON));
}

$size = count($localJSON);

$output = [];

// Add ID to every object in array
for($i = 0; $i < $size; $i++){
    $obj = $localJSON[$i];
    $obj->id = $i + 1;
    array_push($output, $obj);
}

echo json_encode($output);
?>
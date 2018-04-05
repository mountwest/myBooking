<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    }
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
    }

require('db_info.php');

$query = 'SELECT * FROM rooms';
$table = mysqli_query($connection, $query) 
    or die(mysqli_error($connection));

while($tableArray[] = $table->fetch_assoc()){
}

if(empty($tableArray[count($tableArray)-1])) {
    unset($tableArray[count($tableArray)-1]);
}



$json_string = json_encode($tableArray, JSON_PRETTY_PRINT);

echo $json_string;

?>
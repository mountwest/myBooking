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
    
inlcude('db_info.php');

$response = file_get_contents ("php://input");

echo $response

$query = "INSERT INTO `bookingdb` (`room`, `guests`, `startdate`, `enddate`, `firstname`, `lastname`, `email`, `phone`) VALUES 
        ('"$response.id"', '"$response.guests"', '"$response.startdate"', '"$response.enddate"', '"$response.firstname"', '"$response.lastname"', '"$response.email"', '"$response.phone"')";

$submit_query = mysqli_query($connection, $query)
or die(mysqli_error($connection));


?>
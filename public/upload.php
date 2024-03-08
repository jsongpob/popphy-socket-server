<?php

$dbhost = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "arts";

$connection = new mysqli($dbhost, $dbUsername, $dbPassword, $dbName);
if ($connection->connect_error) {
    die('Database connection failed: ' . $connection -> connect_error);
}

if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
    $insert = $connection -> query("INSERT INTO popphy(photo, accept) VALUES ('".$fileName."','true')");
    if ($insert) {
        $statusMsg = "The file . $filename . has been uploaded sucessfully.";
    } else {
        $statusMsg = "File upload failed....";
    }
} else {
    $statusMsg = "Error the upload file.";
    echo $statusMsg;
}

?>
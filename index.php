<?php
$con = mysqli_connect('localhost', 'root', '', 'hc'); //db connection
if (!$con) {
    die('Unable to conenct');
}

// for CORS 
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");



$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    $result = mysqli_query($con, "SELECT * FROM test ORDER BY id DESC");
    $data = []; // declare as container of the result

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row; //array
    }
    echo json_encode($data); // array -> json format
}


if ($method == "POST") {
    $input = json_decode(file_get_contents("php://input"), true); //decode of data from angular
    $name = $input['name'];
    $email = $input['email'];

    mysqli_query(
        $con,
        "INSERT INTO test (name, email) VALUES ('$name', '$email')"
    );
    echo json_encode(["message" => "User added hehe 4G"]);
}

if ($method == "DELETE") {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'];
    mysqli_query($con, "DELETE FROM test WHERE id=$id");
    echo json_encode(["message" => "User deleted"]);
}


if ($method == "PUT") {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'];
    $name = $input['name'];
    $email = $input['email'];
    mysqli_query($con, "UPDATE test SET name='$name', email='$email' WHERE id=$id");
    echo json_encode(["message" => "User updated"]);
}

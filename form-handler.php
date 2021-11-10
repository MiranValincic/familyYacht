<?php
header('Content-Type: application/json;charset=utf-8');
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL & ~E_NOTICE);
$_POST = json_decode(file_get_contents('php://input'), true);

$errors = [];
if(empty($_POST['firstName']) || empty($_POST['lastName']) || empty($_POST['message']) || empty($_POST['email'])){
  $errors[] = "All fields are required.";
}

$firstName = $_POST['firstName']; 
$lastName = $_POST['lastName']; 
$email = $_POST['email']; 
$message = $_POST['message'];
 
if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email)){
  $errors[] = "Invalid email address";
}
if(!count($errors)){	 
  $subject = "eMail subject";
  $email_body = "Imate novu poruku sa stranice: http://mediawelt-pirna.de/. \n Ime: $firstName $lastName \n E-mail: $email \n\n Poruka \n $message";
  $headers = "From: $email\n";
  $headers .= "Reply-To: $email";
  $to = "miran.valincic@gmail.com";
  mail($to,$subject,$email_body,$headers);
  echo json_encode(["success" => true]);
  return;
}
echo json_encode(["success" => false, "error" => json_encode($errors)]);
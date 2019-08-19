<?php
function OpenCon()
 {
 $dbhost = "sql9.freesqldatabase.com";
 $dbuser = "sql9302125";
 $dbpass = "zriBQtNF5Q";
 $db = "sql9302125";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
    $conn -> close();
 }
   
?>
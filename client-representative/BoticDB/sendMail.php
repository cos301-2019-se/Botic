<?php
   // the message
   include 'db_connection.php';
   $conn = OpenCon();

   $sql = "SELECT * FROM ForwardedMessages WHERE Status = 100 ORDER BY id DESC";
   $result = mysqli_query($conn, $sql);
   if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $email = $row["Contact"];
      $subject = "RE: " . $row["Subject"];
   } else {
       echo "0 results";
   }
   CloseCon($conn);

   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   $msg = $_POST['inputField'];
   $msg = wordwrap($msg, 70, "\r\n");
   ini_set("SMTP", "aspmx.l.google.com");
   ini_set("sendmail_from", $email);   
   $headers = "From: Allisn";
   
   mail($email, $subject, $msg, $headers);
//    echo "<script type='text/javascript'>alert('Message Sent');</script>";
   header('Location: index.php');
?>
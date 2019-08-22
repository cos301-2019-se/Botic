<?php
   // the message
   include 'db_connection.php';
   $conn = OpenCon();

   $sql = "SELECT * FROM ForwardedMessages WHERE Status = 100 ORDER BY id DESC";
   $result = mysqli_query($conn, $sql);
   if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $email = $row["Contact"];
      $id1 = $row["id"];
      $subject = "RE: " . $row["Subject"];
   } else {
       echo "0 results";
   }
   CloseCon($conn);

   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   $msg = $_POST['inputField'];
   $msg = wordwrap($msg, 70, "\r\n");
   // $msg .= " Sent from BOTIC - The Privacy Aware Chatbot";
   ini_set("SMTP", "aspmx.l.google.com");
   ini_set("sendmail_from", $email);   
   $headers = "From: noreply@Botic.co.za";
   
   mail($email, $subject, $msg, $headers);
   header('Location: index.php');

   $conn = OpenCon();
   $closeTime = microtime(true);

   $sql = "UPDATE ForwardedMessages SET Status = 200, TimeOut = NOW() WHERE id = " . $id1;
   mysqli_query($conn, $sql);
   CloseCon($conn);
?>
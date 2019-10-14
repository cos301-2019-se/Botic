<?php
   // the message
   include 'db_connection.php';
   $db = openCon();

   $result = pg_query($db, "SELECT * FROM forwardedmessages WHERE status = 100 ORDER BY id DESC");

   if (pg_num_rows($result) > 0) {
      $row = pg_fetch_assoc($result);
      $email = $row['contact'];
      $id1 = $row['id'];
      $subject = "RE: " . $row['subject'];
   } else {
       echo "0 results";
   }
   pg_close($db);

   ini_set('display_errors', 1);
   error_reporting(E_ALL);

   $msg = $_POST['inputField'];
   $msg = wordwrap($msg, 70, "\r\n");
   ini_set("SMTP", "aspmx.l.google.com");
   ini_set("sendmail_from", $email);   
   $headers = "From: noreply@Botic.co.za";
   
   mail($email, $subject, $msg, $headers);
   header('Location: index.php');

   $db = openCon();

   $sql = "UPDATE forwardedmessages SET status = 200, timeout = NOW() WHERE id = " . $id1;

   pg_query($db, $sql);

   // pg_query($db, $sql);
   pg_close($db);
?>
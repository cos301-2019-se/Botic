<?php
   // the message
   $msg = $_POST['inputField'];
   ini_set("SMTP", "aspmx.l.google.com");
   ini_set("sendmail_from", "u15330967@tuks.co.za");
   
   $message = "The mail message was sent with the following mail setting:\r\nSMTP = aspmx.l.google.com\r\nsmtp_port = 25\r\nsendmail_from = YourMail@address.com";
   
   $headers = "Botic Response";
   
   mail("alabamaliquidsnakecapstone@gmail.com", "Testing", $msg, $headers);
//    echo "<script type='text/javascript'>alert('Message Sent');</script>";
   header('Location: index.php');
?>
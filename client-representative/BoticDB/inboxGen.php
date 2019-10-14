<?php
    include 'db_connection.php';
    $db = OpenCon();

    $result = pg_query($db, "SELECT * FROM ForwardedMessages WHERE Status = 100 ORDER BY id DESC");

    // $sql = "SELECT * FROM ForwardedMessages WHERE Status = 100 ORDER BY id DESC";
    // $result = mysqli_query($conn, $sql);

    // $result = pg_query($db_connection, "SELECT * FROM ForwardedMessages WHERE Status = 100 ORDER BY id DESC");

    if(pg_num_rows($result) > 0) {
        // output data of each row
        echo "<!DOCTYPE html><html lang=\"en\"><head><title>Botic Home</title><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"repStyle.css\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.bundle.min.js\"><link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\"><!-- <script src=\"js/jquery.min.js\"></script> --><script>function openForm() {document.getElementById(\"myForm\").style.display = \"block\";document.getElementById(\"navbar\").style.visibility = \"hidden\";document.getElementById(\"subtitle\").style.visibility = \"hidden\";document.getElementById(\"chat\").style.visibility = \"hidden\";}function closeForm() {document.getElementById(\"myForm\").style.display = \"none\";document.getElementById(\"navbar\").style.visibility = \"visible\";document.getElementById(\"subtitle\").style.visibility = \"visible\";document.getElementById(\"chat\").style.visibility = \"visible\";}</script></head><body style=\"overflow:hidden\"><div class=\"navbar w3-row\" style=\"height:110px;\" id=\"navbar\"><div class=\"w3-col\" style=\"width:20%;text-align:center\"><img src=\"media/LandingPage.gif\" alt=\"Logo\" style=\"height:100px;width:100px;\" /></div><div class=\"w3-col\" style=\"width:60%;text-align:center\"><h1>Botic</h1></div><div class=\"w3-col\" style=\"width:20%;text-align:center\"><input type=\"button\" value=\"Log out\" class=\"login\" onclick=\"openForm()\" style=\"width:120px;\" /></div></div><br><br><br><br><br><br><!-- Page Content --><div class=\"container w3-row\" style=\"width:100%\" id=\"subtitle\"><p style=\"font-family:'Helvetica';color:#f1c40f;text-align:center\">Hi, @customerRepresentativeName</p></div><!-- CHAT --><div class=\"container\" style=\"margin:auto;width:50%;padding:10px;width:100%;height:80vh;overflow:hidden;\" id=\"chat\"><div class=\"row\" style=\"width:246%;\"><div class=\"col-md-5\" style=\"width: 100%;\"><div class=\"panel panel-primary\" style=\"height:150%;border:none;\"><div class=\"panel-heading\" style=\"background-color:#f1c40f;border:none;\"><span class=\"glyphicon glyphicon-comment\"></span> Inbox</div><div class=\"panel-body\" style=\"height:80%;border:none;\"><table style=\"width:100%;height:100%;border:none;\"><tr><th style=\"width:100%;text-align:center;\">Subject: ";
        $row = pg_fetch_assoc($result);
        echo  $row['subject'] . "</th></tr></td><br><td>" . $row['body'] . "</td><br></tr><tr><td>Received: " . $row['timein'] . "</td></tr>";
        echo "</table></div><div class=\"panel-footer\"><form action=\"sendMail.php\" method=\"post\"><div class=\"input-group\"><input name=\"inputField\" id=\"btn-input\" type=\"text\" class=\"form-control input-sm\" placeholder=\"Type your message here...\" autocomplete=\"off\"/><span class=\"input-group-btn\"><button class=\"btn-warning btn-sm sendButton\" id=\"btn-chat\" style=\"background-color:#000;border:none;color:#fff;\">Send</button></span></div></form></div></div></div></div></div><div class=\"form-popup\" id=\"myForm\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-9 col-md-7 col-lg-5 mx-auto\"><div class=\"card card-signin my-5\"><div class=\"card-body\"><div class=\"w3-row\"><h5 class=\"card-title text-center w3-col\" style=\"width:100%;text-align:right\">Are you sure you want to log out?</h5><img class=\"card-title text-center w3-col\" src=\"media/exit.png\" alt=\"Exit\" onclick=\"closeForm()\" style=\"position:absolute;height:40px;top:0px;right:0px\"></div><div id=\"popupfoot\"><a href=\"landingPage.html\" class=\"agree\"><input class=\"btn\" type=\"button\" value=\"yes\" style=\"letter-spacing:normal;width:49%;\" autofocus></button></a><input class=\"btn\" type=\"button\" value=\"no\" style=\"letter-spacing:normal;width:49%;\" onclick=\"closeForm()\"></button></div></div></div></div></div></div></div></body>";
    } else {
        echo "0 results";
    }
    
    pg_close($db);
?>
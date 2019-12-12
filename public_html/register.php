<html>
    <head>
        <title>
            register.php
        </title>
    </head>
    <body>
        <?php

        // Author: Kirsten Todd
        // Displaying errors
        ini_set('display_errors', 1);

        // Setting up variables
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        // login to database
        require("/home/groups_2019/group3/secret/dbguest.php");
        $table = "user";

        $link = mysqli_connect($host, $user, $pass);
        if (!$link)
        die("Couldn't connect to MySQL: " . mysqli_error());

        mysqli_select_db($link, $db)
        or die("Couldn't open $db: " . mysqli_error());


        // Check if user has entered a username, email and password
        if (strlen($username) == 0 || strlen($email) == 0 || strlen($password) == 0)
        print "<p><p>!!! Please fill in a username, email and password.";
        else {

        $sql=mysqli_query($link, ("SELECT FROM user (username, password, email) WHERE username=$username"));

        if(mysqli_num_rows($query)>=1)
        {
        echo"name already exists";
        }
        else
        {
        // insert data into database
        $query = "INSERT INTO ".$table." VALUES (NULL, '".$username."', '".$email."', '".$password."');";
        }



        $ok = mysqli_query($link, $query);
        if (!$ok)
        print "SQL error: " . mysqli_error();
        }


        mysqli_close($link);
        header("Location: calendar.html");
        ?>
    </body>
    <html>

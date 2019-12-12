<html>
<!-- Author: Kirsten -->
<?php

// Displaying errors
ini_set('display_errors', 1);   


// login to database
require("/home/groups_2019/group3/secret/dbguest.php");
$link = mysqli_connect($host, $user, $pass);

if (!$link)
    die("Couldn't connect to MySQL: " . mysqli_error());
mysqli_select_db($link, $db) or die("Couldn't open $db: " . mysqli_error());
mysqli_select_db($link, "dropdown");

?>
<head>
<title>
delete_event_form.php
</title>
<!-- Style Sheets -->
	<link rel="stylesheet" href="../css/geteventstyle.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
        <div class="topnav">
            <a class="active" href="../calendar.html"><i class="fa fa-calendar" aria-hidden="true"></i></a>
            <div class="topnav-right">
                <a href="get_event.html"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i></a>
                <a href="../index.html"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
            </div>
        </div>
        <br>
<body>
<div class="container" id="eventForm">
<form action="delete_event.php" method="POST">
Select Event :
<select name="Title" id="Title">
<?php
$eventTitles = mysqli_query($link, "SELECT Title FROM Event ORDER BY StartDate");
while ($row = mysqli_fetch_array($eventTitles)) {
?>
<option><?php
    echo $row["Title"];
?></option>
<?php
}
?>
</select>
<input type="submit" value="Delete">
</form>
<p>
</div>
</body>

</html>

<html>
<!-- Author: Kirsten -->
<head>
<title>
delete_event_form.php
</title>
</head>

<body>
<?php
// Displaying errors
ini_set('display_errors', 1);   

$Title = $_POST["Title"];

require("/home/groups_2019/group3/secret/dbguest.php");
$table = "Event";

$link = mysqli_connect($host, $user, $pass);
if (!$link)
    die("Couldn't connect to MySQL: " . mysqli_error());
mysqli_select_db($link, $db) or die("Couldn't open $db: " . mysqli_error());

    $query = "DELETE FROM Event WHERE Title = '$Title'";
	
	print "$query<p>";

    $ok = mysqli_query($link, $query);
    if (!$ok) print "SQL error: ".mysqli_error();


mysqli_close($link);
header("Location: ../calendar.html");
?>
<p>

</body>

</html>
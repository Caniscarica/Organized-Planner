<?php
// Author: Kirsten Todd

    ini_set('display_errors', 1);

    require("/home/groups_2019/group3/secret/dbguest.php");

    $link = mysqli_connect($host, $user, $pass);

    $post_data = array();

    if (!$link)
    {
        echo "Could not connect to MYSQL";
    }
    else
    {
	if (!mysqli_select_db($link, $db))
	{
	    echo "Could not connect to Database";
	}
	else
	{
	    $query = "SELECT Title, StartDate, EndDate, Reminder, Notes, Location  FROM Event;";

	    $result = mysqli_query($link, $query);

	    if (!$result)
	    {
	        echo "SQL error: ".mysqli_error($link);
	    }
	    else
	    {	
		// create array to use with calendar method 
	        while ($row = mysqli_fetch_assoc($result))
		{	
			$post_data[] = array( "Title"=>$row["Title"], 
				"StartDate"=>$row["StartDate"], 
				"EndDate"=>$row["EndDate"], 
				"Reminder"=>$row["Reminder"], 
				"Notes"=>$row["Notes"], 
				"Place"=>$row["Location"] );
	        }
		// create json file to make array readable to javascript
	        echo json_encode($post_data);
	    }
	}
    }

    mysqli_close($link);

?>

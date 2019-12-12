<html>
<!-- Author: Kirsten -->
    <head>
        <title>
            insert_event.php
	</title>
    </head>
    <body>
        <?php
            // Author: Kirsten Todd

            // Displaying errors
            ini_set('display_errors', 1);   
            
            // Setting up variables
            $title = $_POST["title"];
            $startDate = $_POST["sdate"];
            $endDate = $_POST["edate"];
            $reminder = $_POST["reminder"];
            $notes = $_POST["notes"];
	    $location = $_POST["location"];
	    $table = "Event";
	    
            // login to database
            require("/home/groups_2019/group3/secret/dbguest.php");

	    $link = mysqli_connect($host, $user, $pass);

	    if (!$link) 
	    {
                echo "Couldn't connect to MySQL";
	    }
	    else
	    {
		if (!mysqli_select_db($link, $db))
	        {
		    echo "Couldn't connect to Database";
	        }
	        else
	        {
                    // Check if user has entered a title
	            if (strlen($title) == 0)
	            {
		        echo "<p> Can not add a new event without a title </p>";
	            }
                    else
		    {
			// empty values to null

			if(strlen($reminder) == 0)
			{
			    $reminder = "NULL";
			}
			else
			{
			    $reminder = "'".$reminder."'";
			}

		        if (strlen($notes) == 0)
		        {
		            $notes = "NULL";
			}
			else
			{
			    $notes = "'".$notes."'";
			}

		        if (strlen($location) == 0)
		        {
	                    $location = "NULL";
			}
			else
			{
			    $location = "'".$location."'";
			}
	            
                        // insert data into database
	                $query = "INSERT INTO ".$table." VALUES (NULL, '".$title."', '".$startDate."', '".$endDate."', ".$reminder.", ".$notes.", ".$location.");";

                        echo "<p> ".$query." </p>";

	                $ok = mysqli_query($link, $query);

                        if (!$ok)
	                {
                            echo "SQL error: ".mysqli_error($link);
	                }
		    }
		}
	    }
	    mysqli_close($link);
	    header("Location: ../calendar.html");
        ?>
    </body>
<html>

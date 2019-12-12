/*
  Author: Jack Ducasse
*/
var Calendar = function ( model, options, date )
{
    // Default options
    this.Options = 
    {
        Color: '',
        LinkColor: '',
        NavShow: true,
        NavVertical: false,
        NavLocation: '',
        DateTimeShow: true,
        DateTimeFormat: 'mmm, yyyy',
        DatetimeLocation: '',
        EventClick: '',
        EventTargetWholeDay: false,
        DisabledDays: [],
        ModelChange: model
    };

    // Lopping through options object recieved in the function
    for ( var key in options )
    {
	// Checking if the value of the property is a string
        if( typeof options[key] == 'string' )
	{
	    // Converting the string to lowercase and adding to the default Options object
            this.Options[key] = options[key].toLowerCase();
	}
	else
	{
	    // Adding the option to the default Options object
            this.Options[key] = options[key];
	}
    }

    // Setting model an empty object unless model provided to the function
    // Model is changed when the navigation arrows are clicked
    // It is reponsible for switching values so different months and years
    // Can be viewed 
    if ( model )
    {
        // Setting model to the model provided in the function 
        this.Model = model;
    }
    else
    {
	// Setting model to emty object
	// (Type: emptyObject) 
        this.Model = {};
    }
    
    // Setting Today to the current date 
    // (Type: dateObject)
    this.Today = new Date();

    // Setting selected date to today
    // (Type: dateObject)
    this.Selected = this.Today;

    // Setting the Month to the current month
    // (Type: Integer, format: 0 - 11 for months of the year)	
    this.Today.Month = this.Today.getMonth();

    // Setting the Yeat to the current year
    // (Type: Integer, format: YYYY)
    this.Today.Year = this.Today.getFullYear();

    // Checking if the function recieved a date
    if ( date )
    {
	// Setting the Selected to the date recieved by the function
	// (Type: dateObject) 
        this.Selected = date;
    }

    // Setting the Selected.Month to the month of the Selected date 
    // (Type: Integer, format: 0 - 11 for months of the year)	
    this.Selected.Month = this.Selected.getMonth();

    // Setting the Selected.Year to the year of the Selected date 
    // (Type: Integer, format: YYYY)
    this.Selected.Year = this.Selected.getFullYear();

    
    // Setting the Selected.Days to the number of days in the month of Selected date
    // (Number of days in the month = the last day of the month)
    // (Type: Integer, format: 1 - 31 for days of the month)  	
    this.Selected.Days = new Date( this.Selected.Year, ( this.Selected.Month + 1 ), 0 ).getDate();

    // Setting the Selected.FirstDay to the first day of the month of the Selected date
    // (Type: Integer, format: 0 - 6 for days of the week) 
    this.Selected.FirstDay = new Date( this.Selected.Year, ( this.Selected.Month ), 1 ).getDay();

    // Setting the Selected.LastDay to the last day of the month of the Selected date
    // (Type: Integer, format: 0 - 6 for days of the week) 
    this.Selected.LastDay = new Date( this.Selected.Year, ( this.Selected.Month + 1 ), 0 ).getDay();

    // Cheching if the Selected Month is 0 
    // ( January )	
    if ( this.Selected.Month == 0 )
    {
        // Setting Perv to the first day of December of the year before the Selected dates's year
        // (Type: dateObject) 
        this.Prev = new Date( this.Selected.Year - 1, 11, 1 );
    }
    else
    {
	// Setting Prev to the first day of the month before month of the Selected date
        // (Type: dateObject) 
        this.Prev = new Date( this.Selected.Year, ( this.Selected.Month - 1 ), 1 );
    }

    // Setting Prev.Days to the number of days in the month before the month of the selected date
    // (Number of days in a month = the last day of the month) 
    // (Type: Integer, format: 0 - 31 for days of the month) 
    this.Prev.Days = new Date( this.Prev.getFullYear(), ( this.Prev.getMonth() + 1 ), 0 ).getDate();
};

function createCalendar ( calendar, element, adjuster )
{
    // If adjuster is not Undefined
    if ( typeof adjuster !== 'undefined' )
    {
	// Setting the value of the newDate to the first day of the adjusted month
	// 
	// It is a speculation that the adjuster is added or subtracted from the Select.Month
	// To get the date for the event
	// 
	// (Type: dateObject) 
        var newDate = new Date( calendar.Selected.Year, calendar.Selected.Month + adjuster, 1 );
	
	// Creating a new Object Calendar
	// model remains the same
	// options remain the same
	// date is set as the newDate
	//
	// It is speculated that newDate is used here to create a new Calender
	// With the event added at the point of the newDate 
	//
	// (Type: Calendar) 
        calendar = new Calendar( calendar.Model, calendar.Options, newDate );

	// The HTML element is set to empty
	// 
	// It is a speculated that it is set to empty so a new calender can be created
	// With the event added and this new Calender can take the place of the old one
	// 
	// (Type: HTML element, value: innerContents) 
        element.innerHTML = '';
    }
    else
    {
	// Looping through the Calendat Options    
        for ( var key in calendar.Options )
	{
	    // Checking if each Option in Calender passes all of the following conditions:
	    // Is not a function
	    // Is not an object
	    // Exists with a truthy value
            if ( typeof calendar.Options[key] != 'function' && 
		    typeof calendar.Options[key] != 'object' && 
		    calendar.Options[key] )
	    {
		// The HTML element.ClassName is set to the 'element.ClassName [key]-Options[key]'
		// Here the HTML element.ClassName is initally empty since 
	        // They are newly being created by out JavaScript so the result would be
		// '[key]-Options[key]'
		// 
		// It is speculated that these class names are used to organise the
		// Different elements our JavaScript creates and  it names them
		// Appropriatley 
		//
		// (Type: HTML class name, attribute: class = "")
	        element.className = element.className + " " + key + "-" + calendar.Options[key];
	    }
        }
    }

    // Months is set to an array containing the names of all the months
    // (Type: stringArray) 
    var months = ["January", "February", "March", "April", 
	    "May", "June", "July", "August", 
	    "September", "October", "November", "December"];

    // Function to Add the side bar	
    function AddSidebar() 
    {
	// Vaiable sidebar is set to a newly created HTML element
	// This div element is used to display the side bar
	// (Type: HTML element, tag: <div>) 
        var sidebar = document.createElement('div');
	
	// Sidebar is given a class name so it can be later addressed to append 
	// The required values in the element later, sidebar.className is set to 
	// 'sidebar.className cld-sidebar' since sidebar is 
	// Newly created it has no class name thus the result would be:
	// cld-sidebar
	// (Type: HTML class name, attribute: class = "") 
        sidebar.className = sidebar.className + 'cld-sidebar';
      
	// Variable MonthList is set to a newly created HTML element
	// This ul element is used to add an unordered list of all the months
	// (Type: HTML element, tag: <ul>) 
        var monthList = document.createElement('ul');

	// MonthList is given a class name so it can be later addressed to append
        // The requiered values in the element later, monthList.className is set to
	// 'monthList.className + cld-monthList' since monthList is
	// Newly created it has no class name thus the result would be:
	// cld-monthList 
	// (Type: HTML class name, attribute: class = "") 
        monthList.className = monthList.className + 'cld-monthList';

	// Looping the length of the months array - 3
	// The months are stored as 0 - 11 (12 values) and the return value of months.length
	// Is 12 - 3 = 9 so we only loop only 9 times
	// The greatest value reached by i = 8 since i < 9
	//
	// It is speculated that this is because the months
	// January and December are fixed at the starting and end respectively
	//
	// (Type: forLoop, iterations: 9)
        for ( var i = 0; i < ( months.length - 3 ); i++ )
	{
            // Variable x is set to a newly created HTML element
	    // This li element will be used later to add data to the HTML page
	    // X creates a new HTML element of li every time the loop iterates
	    // These elements are used for various purposes later 
	    // (Type: HTML element, tag: <li>) 
            var x = document.createElement('li');

            // X is given a class name so it can be later addressed to append
            // The requiered values in the element later, x.classname is set to
	    // 'x.className + cld-month' since x is
	    // Newly created it has no class name thus the result would be:
	    // cld-month
	    // (Type: HTML class name, attribute = class = "")
            x.className = x.className + 'cld-month';
		
	    // Variable n is set to i - (4 - calendar.Selected.Month)
	    // This value is used to prevent over flow of the months
	    // 
	    // How or why this specific formula ? are yet to be answered
	    //
	    // The lowest possible value could be when i = 0 and Selected.Month = 0 (January)
	    // 0 - (4 - 0) = - 4
	    // The highest possible value could be when i = 9 and Selected.Month = 11 (December)
	    // 8 - (4 - 11) = 15
	    // (Type: integer, range: - 4 - 15)

	    // Months and their over flow:
	    //
	    // 0 ( January ) for 4 loops
	    // All n values ( - 4, - 3, - 2, - 1, 0, 1, 2, 3, 4 ) 
	    // Over flow months ( 8 ( September ) - 11 ( December ) )
	    // Months without Over flow ( 0 ( January ) - 4 ( May ) ) 
	    // 
	    // 1 ( February ) for 3 loops 
	    // All n values ( - 3, - 2, - 1, 0, 1, 2, 3, 4, 5 )  
	    // Over flow months ( 9 ( October ) - 11 ( December ) )
	    // Months without over flow ( 0 ( January ) - 5 ( June ) ) 
	    // 
	    // 2 ( March ) for 2 loops 
	    // All values of n ( - 2, - 1, 0, 1, 2, 3, 4, 5, 6 ) 
	    // Over flow months ( 10 ( November ), 11 ( December ) )
	    // Months without over flow ( 0 ( January ) - 6 ( July ) ) 
	    //
	    // 3 ( April ) for 1 loop 
	    // All n values ( - 1, 0, 1, 2, 3, 4, 5, 6, 7 )
	    // Over flow month ( 11 ( December ) )
	    // Months without over flow ( 0 ( January ) - 7 ( August ) )
	    // 
	    // 4 ( May ) no over flow
	    // All n values ( 0, 1, 2, 3, 4, 5, 6, 7, 8 )
	    // Months without over flow ( 0 ( January ) - 8 ( September ) )
	    // 
	    // 5 ( June ) no over flow 
	    // All n values ( 1, 2, 3, 4, 5, 6, 7, 8, 9 )
	    // Months wihtout over flow ( 1 ( February ) - 9 ( October ) )
	    //
	    // 6 ( July ) no over flow
	    // All n values ( 2, 3, 4, 5, 6, 7, 8, 9, 10 )
	    // Months without over flow ( 2 ( March ) - 11 ( November ) )
	    //
	    // 7 ( August ) no over flow
            // All n values ( 3, 4, 5, 6, 7, 8, 9, 10, 11 )
	    // Months without over flow ( 3 ( April ) - 11 ( December ) )
	    //
	    // 8 ( September ) for 1 loop
	    // All n values ( 4, 5, 6, 7, 8, 9, 10, 11, 12 )
	    // Over flow month ( 0 ( January ) )
	    // Months without over flow ( 4 ( May ) - 11 ( December ) ) 
	    // 
	    // 9 ( October ) for 2 loops
	    // All n values ( 5, 6, 7, 8, 9, 10, 11, 12, 13 )
	    // Over flow months ( 0 ( January ), 1 ( Febuary ) )
	    // Months without over flow ( 5 ( June ) - 11 ( December ) )
	    //
	    // 10 ( November ) for 3 loops
	    // All n values ( 6, 7, 8, 9, 10, 11, 12, 13, 14 )
	    // Over flow months ( 0 ( January ) - 2 ( March ) )
            // Months without over flow ( 6 ( July ) - 11 ( December ) )
	    //
	    // 11 ( December ) for 4 loops
	    // All n values ( 7, 8, 9, 10, 11, 12, 13, 14, 15 )
	    // Over flow months ( 0 ( January ) - 3 ( April ) )
	    // Months without over flow ( 7 ( August ) - 11 ( December ) ) 
            var n = i - ( 4 - calendar.Selected.Month );

            // Account for overflowing month values
	    // Checking if n is a negative number
	    // A number below 0 would be out of our month range 0 - 11
	    // Similarly a number above 11 would be out of our month range 0 - 11
	    // Hence these values need to be fixed
            if ( n < 0 )
	    {
		// Variable n is set to the value of 'n + 12'
		// The lowest possible value would be when n = - 4
		// - 4 + 12 =  8 (September) 
		// The highest possible value would be when n = -1
		// - 1 + 12 = 11 (December)
		// Range for the over flow correction:
		// ( 8 ( September ) - 11 ( December ) ) 
		// Months that will need this:
		// 0 ( January ) 4 times for ( 8 ( September ), 9 ( October ), 10 ( November ), 11 ( December ) )
		// 1 ( Febuary ) 3 time for ( 9 ( October ), 10 ( November ), 11 ( December ) )
		// 2 ( March ) 2 times for ( 10 ( November ), 11 ( December ) )
		// 3 ( April ) 1 time for ( 11 ( December ) )
		// (Type: integer, range: 8 - 11)
                n = n + 12;
	    }
            else if ( n > 11 )
	    {
		// Variable n is set to the value of 'n - 12'
		// The lowest possible value would be when n = 12
		// 12 - 12 = 0 (January)
		// The highest possible value would be when n = 16
		// 16 - 12 = 4 (May) 
		// Month range:
		// (January - May)
		// (Type: integer, range: 0 - 4) 
                n = n - 12;
	    }

	    // Add appropriate class to the HTML elements we created earlier
	    // On every run for this loop a new li element with
	    // The significance of i = 0 is that it only covers row 0
	    // And sets the elements according to row 0
            if ( i == 0 ) 
	    {
		// Variable x had a class name of cld-month which is being
		// Added to here for assigning a specific function to it
		// Since x has class name of 'cld-month' the result here would be:
		// cld-month cld-rwd cld-nav
		// (Type: HTML class name, attribute: class = "") 
                x.className = x.className + ' cld-rwd cld-nav';
		
		// Adding an event listner on x
		// The event listner executes a function when x is clicked
		// (Type: EventListner, action: click) 
                x.addEventListener ( 'click', function ()
		{
		    // If our calendar's Options.ModelChange is set to a function
		    // We set the values that we obtain after running that function
		    // As the Model of our calendar
                    if ( typeof calendar.Options.ModelChange == 'function' )
		    {
			// Calendar.Options.ModelChange() is computed and the values
		        // Are set as our calendar's new Model 
		        calendar.Model = calendar.Options.ModelChange();
		    }
		    else
		    {
			// If our calendar's Options.ModelChange is not a function
			// Then we set out calendar.Model to calendar.Options.ModelChange
		        // In this case the same model gets set as the model for the calendar
		        // Again 
			calendar.Model = calendar.Options.ModelChange;
		    }
			
		    // A new calendar is created with the same values as the current one
		    // With the only difference in adjuster that is -1 this time
		    // So when this calendar gets created it will be one month behind the
		    // Current one each time 
                    createCalendar( calendar, element, -1 );
		});

		// HTML element x gets its inner text set to an Scalable Vector Graphics tag
		// This is used to make it look like the back arrow
		// (Type: HTML element, tag: <svg>) 
                x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
            }
	    // This condition is executed when i equals 8
	    // The significance of this statement is that it only
	    // Executes for the last row ( row 8 )
	    // And sets the elements accordingly 
            else if ( i == ( months.length - 4 ) )
	    {
		// This element is being prepared to be converted into the forward
		// Arrow button
		// HTML element x had a class name 'cld-month' which is appended here
		// With ' cld-fwd cld-nav' the class name after this would be:
		// cld-month cld-fwd cld-nav
		// (Type: HTML element, attribute: class = "") 
                x.className = x.className + ' cld-fwd cld-nav';

		// Adding an EventLister on x
		// The event listner listens for a click on x
		// (Type: EventListner, action: click) 
                x.addEventListener ( 'click', function ()
		{
	            // Checking to see if our calendar's Options.ModelChange is a function 		
                    if( typeof calendar.Options.ModelChange == 'function' )
		    {
			// If it is a function then send the function to our
			// Calendar.Model 
			calendar.Model = calendar.Options.ModelChange();
		    }
		    else
		    {
			// If not a function then set calendar.Model to
		        // Whatever the Options.ModelChange was 
			calendar.Model = calendar.Options.ModelChange;
		    }

		    // A new Calendar is created with the same values with and
		    // Exception of adjuster set to 1 which ads one to the month
		    // And loads the new calendar
                    createCalendar( calendar, element, 1 );
		});
		
		// The inner text of the HTML element x is set to
		// SVG to make it look like a forward arrow
		// (Type: HTML element, tag: <tag>) 
                x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
            }
	    // If the value for i is ( 1, 2, 3, 4, 5, 6, 7 )
	    // These are all the rows between that need to show dates 
            else
	    {
		// If i smaller than 4    
                if ( i < 4 )
		{
	            // HTML element had a class name of 'cld-month'
		    // Here its being appended the value after the appending will be:
		    // cld-month cld-pre
		    // (Type: HTML class name, attribute: class = "") 
		    x.className = x.className + ' cld-pre';
		}
		// If i is greater than 4    
                else if ( i > 4 )
		{
	            // cld-month cld-post		
		    x.className = x.className + ' cld-post';
		}
		// If non of the above conditions are satisfied    
                else
		{
		    // cld-month cld-curr	
	            x.className += ' cld-curr';
		}

                // Prevent losing var adj value ( for whatever reason that is happening )
                ( function ()
		{
		    // adj is set to i - 4	
                    var adj = ( i - 4 );

		    // Adding event listner 	
                    x.addEventListener ( 'click', function ()
	            {
			//
                        if ( typeof calendar.Options.ModelChange == 'function')
			{
			    calendar.Model = calendar.Options.ModleChange();
			}
			else
			{
			    calendar.Model = calendar.Options.ModelChange;
			}
                        createCalendar(calendar, element, adj);
		    });
	            
	            // Setting attributes for HTML element x
		    // To lower the opacity of cells that are not current
                    x.setAttribute ( 'style', 'opacity:' + ( 1 - (Math.abs(adj)/4) ) );
		    
	            // The value of n is used to stuff 		
                    x.innerHTML = x.innerHTML + months[ n ].substr( 0, 3 );
                }()); // immediate invocation of the method

                if ( n == 0 )
	        {
	            //    
                    var y = document.createElement('li');

		    //    
                    y.className += 'cld-year';
                    if(i<5)
		    {
		        //   
                        y.innerHTML += calendar.Selected.Year;
                    }
		    else
		    {
			//    
                        y.innerHTML += calendar.Selected.Year + 1;
                    }

	            //		
                    monthList.appendChild(y);
                }
            }

            //		
            monthList.appendChild(x);
        }

        //	    
        sidebar.appendChild(monthList);
	  
        //	    
        if ( calendar.Options.NavLocation )
        {
	    //    
            document.getElementById( calendar.Options.NavLocation ).innerHTML =  "";
	 
	    //    
            document.getElementById( calendar.Options.NavLocation ).appendChild( sidebar );
        }
        else
        {
	    //    
	    element.appendChild(sidebar);
        }
    }

    // 	
    var mainSection = document.createElement('div');
  
    //	
    mainSection.className = mainSection.className + "cld-main";

    //	
    function AddDateTime ()
    {
        //	  
        var datetime = document.createElement('div');
	 
        //	  
        datetime.className = datetime.className + "cld-datetime";
	
        //	  
        if ( calendar.Options.NavShow && !calendar.Options.NavVertical )
        {
	    //    
            var rwd = document.createElement('div');

	    //
            rwd.className = rwd.className + " cld-rwd cld-nav";
	     
	    //    
            rwd.addEventListener( 'click', function ()
	    {
		    //
		    createCalendar( calendar, element, -1 );
            });
		
	    //	
            rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';

	    //	
            datetime.appendChild(rwd);
        }
	
	//    
        var today = document.createElement('div');
	
	//    
        today.className = today.className + ' today';

	//    
        today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
	 
	//    
        datetime.appendChild(today);
	
	//    
        if ( calendar.Options.NavShow && !calendar.Options.NavVertical )
	{
            //		
            var fwd = document.createElement('div');
            
	    //	
            fwd.className += " cld-fwd cld-nav";

	    //	
            fwd.addEventListener( 'click', function ()
            { 
	        createCalendar( calendar, element, 1 );
	    });

            //		
            fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';

	    //
            datetime.appendChild(fwd);
        }
        if( calendar.Options.DatetimeLocation )
	{
            document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
            document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
        }
        else
        {
	    mainSection.appendChild(datetime);
        }
    }

  function AddLabels(){
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    // Previous Month's Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //Disabled Days
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      //Disabled Days
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }
      var number = DayNumber(i+1);
      // Check Date against Event Dates
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        if(evDate.getTime() == toDate.getTime()){
          number.className += " eventday";
          var title = document.createElement('span');
          title.className += "cld-title";
          if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != 'string'){
                  a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{
              a.addEventListener('click', calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          }else{
            title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
          }
          number.appendChild(title);
        }
      }
      day.appendChild(number);
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();
}

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}

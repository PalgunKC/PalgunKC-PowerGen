'use strict';
$(document).ready(function() {
    $('#d_week').datepicker({
        daysOfWeekDisabled: "2"
    });

    $('#d_highlight').datepicker({
        daysOfWeekHighlighted: "1"
    });

    //$('.datepickerFuction').datepicker({
    //    autoclose: true,
    //    format:"yyyy/mm/dd"
    //});

    $('.datepickerFuction').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy"
    });


    $('#d_disable').datepicker({
        datesDisabled: ['10/15/2018', '10/16/2018' ,  '10/17/2018' , '10/18/2018' ]
    });

    $('#d_toggle').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        toggleActive: true
    });

    $('#d_today').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        todayHighlight: true
    });

    $('#disp_week').datepicker({
        calendarWeeks: true
    });

    $('#datepicker_range').datepicker({});
});

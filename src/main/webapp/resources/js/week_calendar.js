function makeWeekSelectOptions(type, idxx) {
    var year = $("#sh_year").val();
    var month = $("#sh_month").val();
 
    var today = new Date();
 
    var sdate = new Date(year, month-1, 01);
    var lastDay = (new Date(sdate.getFullYear(), sdate.getMonth()+1, 0)).getDate();
    var endDate = new Date(sdate.getFullYear(), sdate.getMonth(), lastDay);
 
    var week = sdate.getDay();
    sdate.setDate(sdate.getDate() - week);
    var edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
 
    var obj = document.getElementById("sh_week");
    obj.options.length = 0;
    var seled = "";
    while(endDate.getTime() >= edate.getTime()) {
 
        var sYear = sdate.getFullYear();
        var sMonth = (sdate.getMonth()+1);
        var sDay = sdate.getDate();
 
        sMonth = (sMonth < 10) ? "0"+sMonth : sMonth;
        sDay = (sDay < 10) ? "0"+sDay : sDay;
 
        var stxt = sYear + "-" + sMonth + "-" + sDay;
 
        edate.setDate(sdate.getDate() + 6);
 
        var eYear = edate.getFullYear();
        var eMonth = (edate.getMonth()+1);
        var eDay = edate.getDate();
 
        eMonth = (eMonth < 10) ? "0"+eMonth : eMonth;
        eDay = (eDay < 10) ? "0"+eDay : eDay;
 
        var etxt = eYear + "-" + eMonth + "-" + eDay;
 
        if(today.getTime() >= sdate.getTime() && today.getTime() <= edate.getTime()) {
            seled = stxt+"|"+etxt;
        }
 
        obj.options[obj.options.length] = new Option(sMonth+"-"+sDay+"~"+eMonth+"-"+eDay, stxt+"|"+etxt);
 
        sdate = new Date(edate.getFullYear(), edate.getMonth(), edate.getDate() + 1);
        edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
    }
 
    if(seled) obj.value = seled;
    
    draw_week_timetable(type, idxx);
    draw_normalOff_in_weektable();
	draw_fixOff_in_weektable();
    
}
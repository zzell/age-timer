$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function getDobFromUrl()
    {
        // Try to get dob from query string
        var queryStringParams = new URLSearchParams(window.location.search);
        var dobFromQuery = queryStringParams.get("dob");
        if (dobFromQuery) return new Date(dobFromQuery);

        // Fallback to getting dob from URL path
        var pathSegments = window.location.pathname.split('/');
        var lastSegment = pathSegments.pop() || pathSegments.pop(); // Handle potential trailing slash
        if (lastSegment && !isNaN(Date.parse(lastSegment))) {
            return new Date(lastSegment);
        }

        // No valid dob found in URL
        return null;
    };

    function load()
    {

        // First, try to get dob from URL
        var dobFromUrl = getDobFromUrl();
        if (dobFromUrl) return dobFromUrl;

        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function renderAgeLoop()
    {
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");

        setInterval(function(){
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");
        }, 100);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;
        
        var majorMinor = years.toFixed(9).toString().split('.');
        
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});
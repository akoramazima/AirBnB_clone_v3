let amens = {};
$( 'document' ).ready(function() {
    $( "input[type=checkbox]" ).click(function(){
        let name = $(this).attr('data-name');
	let id = $(this).attr('data-id');

        if($(this).prop("checked") == true){
	    amens[id] = name;
        }

        else if($(this).prop("checked") == false){
	    delete amens[id];
        }
	$( '.amenities h4' ).text(Object.values(amens).join(", "));
    });
});

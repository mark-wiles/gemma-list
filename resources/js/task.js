// handle check box
handleCheck = (e) => {
	e.preventDefault();
	var checkboxLabel = e.target.nextElementSibling;
	var taskForm = e.target.parentElement;
    var url = taskForm.getAttribute('action');
    $(checkboxLabel).toggleClass('is-completed');
    
	$.ajax({
		url: url,
		type: 'post',
		data: $(taskForm).serialize(),
		dataType: 'json',
        success: function( _response ){
			console.log('update successful');
		},
        error: function( _response ){
		  alert('Something went wrong. Please try again!');
		  window.location.reload();
		}
	});
}//end handle check box

handleTaskEdit = (id) => {
    $('#edit-task-form-' + id).toggle();
    $('#task_' + id).toggle();
}

handleBtnCheck = (e) => {
	if (e.target.value.length > 0) {
		e.target.nextElementSibling.style.visibility = 'visible';
	}
	else {
		e.target.nextElementSibling.style.visibility = 'hidden';
	}
}

handleTaskEditCancel = (e, id) => {
	e.preventDefault();
	$('#task_' + id).toggle();
	$('#edit-task-form-' + id).toggle();
}

// edit task title
handleTaskEditSubmit = (e, id) => {
	e.preventDefault();
	const taskForm = (e.target);
	var data = $(taskForm).serialize();
	data = data + '&id=' + id;
	const url = taskForm.getAttribute('action');

	$.ajax({
		url: url,
		type: 'post',	
		data: data,
		dataType: 'json',
        success: function( _response ){
			console.log('update successful', _response);
			var label = document.getElementById('task-label-' + id);
			label.innerText = taskForm.title.value;
			handleTaskEdit(id);
		},
        error: function( _response ){
		  alert('Something went wrong. Please try again!');
		  window.location.reload();
		}
	});
} //end edit task title

// sortable tasks
$( function() {
	$( ".sortable-tasks" ).sortable();

	$( ".sortable-tasks" ).on( "sortdeactivate", function(e) {
		console.log(e.target.id.split('-')[0]);

		if (e.target.id.split('-')[0] === 'task') {
			var sortedTaskIDs = $( e.target ).sortable( "toArray" );
			var taskIds = sortedTaskIDs.map(sortedTaskID => parseInt(sortedTaskID.split('_')[1]));
			taskIds = JSON.stringify(taskIds);

			$.ajax({
				headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
				url: '/tasks/reorder',
				type: 'POST',
				traditional: true,
				data: {ids:taskIds},
				dataType: 'json',
				success: function(){
					console.log('task order successfully updated');
				},
				error: function(){
				alert('Something went wrong. Please try again!');
				window.location.reload();
				}
			}); //end Ajax
		} //end if
	}); //end sortdeactivate
	
	$( ".sortable-tasks" ).disableSelection();
}); //end sortable-tasks
// handle check box
handleCheck = () => {
	event.preventDefault();
	var checkboxLabel = event.target.nextElementSibling;
	var taskForm = event.target.parentElement;
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

handleTaskEditCancel = (id) => {
	event.preventDefault();
	$('#task_' + id).toggle();
	$('#edit-task-form-' + id).toggle();
}

// edit task title
handleTaskEditSubmit = (id) => {
	event.preventDefault();
	const taskForm = (event.target);
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
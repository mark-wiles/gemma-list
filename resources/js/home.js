var editGlistBtn = document.querySelectorAll('.edit-glist-btn');

for (var i = 0; i < editGlistBtn.length; i++) {

	editGlistBtn[i].addEventListener('click', function() {

		var glistId = this.getAttribute('data-id');

		var headerId = 'glist-header-' + glistId;

		var formId = 'edit-glist-' + glistId;

		var cancelBtnId = 'close-edit-' + glistId;

		var glistHeader = document.getElementById(headerId);

		var formElement = document.getElementById(formId);

		var cancelBtn = document.getElementById(cancelBtnId);

		glistHeader.classList.add('hidden');

		formElement.classList.remove('hidden');

		cancelBtn.addEventListener('click', function() {

			event.preventDefault();

			formElement.classList.add('hidden');

			glistHeader.classList.remove('hidden');

		})

	})

}

handleCheck = () => {
	event.preventDefault();
	var checkboxLabel = event.target.parentElement;
	var taskForm = event.target.parentElement.parentElement;
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
}
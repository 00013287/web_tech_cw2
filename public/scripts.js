//let deleteBtns = document.querySelectorAll('.delete-btn')


deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	fetch('/animes/delete', {
    		method: 'DELETE',
            
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({ id: e.target.dataset.id })
    	})
    	.then(res => res.json())
    	.then(data => {
    		if (data.deleted) {
    			e.target.parentElement.parentElement.remove()
    		}
    	})
    })
}) 
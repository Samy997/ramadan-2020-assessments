document.addEventListener('DOMContentLoaded', (event) => {
	const baseURL = 'http://localhost:7777';
	const APIs = {
		requestVideo: '/video-request'
	};
	const requestVideoForm = document.getElementsByTagName('form')[0];

	requestVideoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		fetch(baseURL + APIs.requestVideo, {
			method: 'POST',
			body: formData
		}).then((res) => {
			console.log(res);
		});
	});
});

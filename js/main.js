// Start Mongo Script
// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath C:\mongodbs\db

function getSingleVidReq(vidInfo) {
	const containerDiv = document.createElement('div');
	containerDiv.classList.add('card', 'mb-3');
	containerDiv.innerHTML = `
					<div class="card-body d-flex justify-content-between flex-row">
						<div class="d-flex flex-column">
							<h3>${vidInfo.topic_title}</h3>
							<p class="text-muted mb-2">${vidInfo.topic_details}</p>
							<p class="mb-0 text-muted">
							${
								vidInfo.expected_result &&
								`<strong>Expected results:</strong> ${vidInfo.expected_result}`
							}
							</p>
						</div>
						<div class="d-flex flex-column text-center">
							<a class="btn btn-link">🔺</a>
							<h3>${vidInfo.votes.ups - vidInfo.votes.downs}</h3>
							<a class="btn btn-link">🔻</a>
						</div>
					</div>
					<div class="card-footer d-flex flex-row justify-content-between">
						<div>
							<span class="text-info">${vidInfo.status.toUpperCase()}</span>
							&bullet; added by <strong>${vidInfo.author_name}</strong> on
							<strong>${new Date(vidInfo.update_date).toDateString()}</strong>
						</div>
						<div
						class="d-flex justify-content-center flex-column 408ml-auto mr-2"
						>
							<div class="badge badge-success">
								${vidInfo.target_level}
							</div>
						</div>
					</div>
				`;
	return containerDiv;
}

document.addEventListener('DOMContentLoaded', (event) => {
	const baseURL = 'http://localhost:7777';
	const APIs = {
		requestVideo: '/video-request'
	};
	const requestVideoFormElm = document.getElementsByTagName('form')[0];
	const videoRequestsContainerElm = document.getElementById('listOfRequests');

	// Get Video Requests
	getVideoRequests();

	requestVideoFormElm.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		fetch(baseURL + APIs.requestVideo, {
			method: 'POST',
			body: formData
		})
			.then((blob) => blob.json())
			.then((res) => {
				videoRequestsContainerElm.prepend(getSingleVidReq(res));
				e.target.reset();
			});
	});

	function getVideoRequests() {
		fetch(baseURL + APIs.requestVideo)
			.then((blob) => blob.json())
			.then(
				(res) => {
					res.forEach((request) => {
						videoRequestsContainerElm.appendChild(getSingleVidReq(request));
					});
				},
				(err) => {
					console.log(err);
				}
			);
	}
});

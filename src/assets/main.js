const API = 'https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=basketball&Date=20220710'

const content = null|| document.getElementById('content');
const content2 = null || document.getElementById('content2')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0df7be4cb6msh1fed4638e30dc98p1cee95jsn44dc0775dfb0',
		'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const matches = await fetchData(API);
        let baseUrl = 'https://lsm-static-prod.livescore.com/medium/';
        let view = `
        ${matches.Stages.map(match => `
        <div class="inner-results" id="content2">
            <div class="group-header">
                <a href="#">
                    <img src="${match.Ccd}" alt="competition">
                    <div class="competition-info">
                        <div class="group">${match.Snm}</div>
                        <div class="competition">${match.Cnm}</div>
                    </div>
                </a>
            </div>
        ${match.Events.map(event=>`
            <div class="match">
                <a href="#">
                    <div class="teams">
                        <div class="team-a">
                            <span>
                                <img src="${baseUrl + event.T1[0].Img}" alt="team-a" class="badge">
                            </span>
                            <div id="home-team">${event.T1[0].Nm}</div>
                        </div>
                        <div class="team-b">
                            <span>
                                <img src="${baseUrl + event.T2[0].Img}" alt="team-b" class="badge">
                            </span>
                            <div id="away-team">${event.T2[0].Nm}</div>
                        </div>
                    </div>
                    <div class="result">
                        <div id="home-socre">${event.Tr1}</div>
                        <div id="away-socre">${event.Tr2}</div>
                    </div>
                </a>
            </div>
        `).join("<br/>")}
        </div>
        `).join("<br/>")}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
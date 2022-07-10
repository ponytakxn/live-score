const API = 'https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=soccer&Date=20220710'

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
        let view = `
        ${matches.Stages.map(match => `
        <div class="inner-results">
            <div class="group-header">
                <a href="#">
                    <img src="${match.Ccd}" alt="competition">
                    <div class="competition-info">
                        <div class="group">${match.Snm}</div>
                        <div class="competition">${match.Cnm}</div>
                    </div>
                </a>
            </div>
            <div class="match">
                <a href="#">
                    <div class="teams">
                        <div class="team-a">
                            <span>
                                <img src="${match.Events[0].T1.Img}" alt="team-a" class="badge">
                            </span>
                            <div id="home-team">${match.Events[0].T1.Nm}</div>
                        </div>
                        <div class="team-b">
                            <span>
                                <img src="${match.Events[0].T2.Img}" alt="team-b" class="badge">
                            </span>
                            <div id="away-team">${match.Events[0].T2.Nm}</div>
                        </div>
                    </div>
                    <div class="result">
                        <div id="home-score">${match.Events[0].Tr1}</div>
                        <div id="away-score">${match.Events[0].Tr2}</div>
                    </div>
                </a>
            </div>
        </div>
        `)}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
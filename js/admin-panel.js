const arrowGetEvents = async () => {
    try{
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error)
    }
}

const renderElements = (eventsArray) => {
    eventsArray.forEach( (event, index) => {

        const tableBodySelector = document.querySelector('#table-body')

        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.substring(0, 10).replaceAll('-', '/');
        const time = event.scheduled.substring(11, 16);
        firstTdElement.innerText = date + " " + time;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');

        const forthTdElement = document.createElement('td');

        const firstAnchorTag = document.createElement('a');
        firstAnchorTag.innerText = "Ver Reservas";
        firstAnchorTag.classList.add('btn');
        firstAnchorTag.classList.add('btn-dark');


        const secondAnchorTag = document.createElement('a');
        secondAnchorTag.innerText = "Editar";
        secondAnchorTag.classList.add('btn');
        secondAnchorTag.classList.add('btn-secondary');
        secondAnchorTag.setAttribute('href', ('editar-evento.html?id=' + event._id));


        const thirdAnchorTag = document.createElement('a');
        thirdAnchorTag.innerText = "Excluir";
        thirdAnchorTag.classList.add('btn');
        thirdAnchorTag.classList.add('btn-danger');
        thirdAnchorTag.setAttribute('href', ('excluir-evento.html?id=' + event._id));

        forthTdElement.append(firstAnchorTag, secondAnchorTag, thirdAnchorTag);

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, forthTdElement);

        tableBodySelector.appendChild(trElement);

    } )
}

async function main() {
    try{
        const eventsArray = await arrowGetEvents();
        console.log(eventsArray);
        renderElements(eventsArray);
    } catch (error) {
        console.error(error)
    }
}

main();







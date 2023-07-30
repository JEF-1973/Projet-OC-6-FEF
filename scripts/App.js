// Je crée une classe qui sera mon point d'éntrée de la page d'accueil 
class App {
    constructor() {
        this.photographArticle = document.querySelector('.photographer_section');
        //j'instancie ma classe GetPhotographers 
        this.getPhotographers = new GetPhotographers('/data/photographers.json');
    }
    //j'initialise les données appélée pour les photographes 
    async init() {
        const photographersData = await this.getPhotographers.getPhotograph();
        //je boucles sur les données des photographes 
        photographersData.forEach(photographer => {
            //j'instancie mon objet PhotographersCard
            const Template = new PhotographersCard(photographer);
            //j'appelle la vue génèrée associé
            this.photographArticle.appendChild(Template.createPhotographerCard())
        });
    }
}
//j'instancie l'objet App()
const app = new App();
//J'appelle la fonction asyncrone init pour lire les données.
app.init();

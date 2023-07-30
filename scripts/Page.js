//Je crée une classe Pages qui sera le point d'entrée (controller) des pages photographe
class Pages {
    //j'instancie tous les objets dont j'aurais besoin pour construire la page dans un constructeur
    constructor() {
        this.photographPage = document.querySelector('.photograph-header');
        this.mediasPhotograph = document.querySelector('#mediaDisplay');
        this.modalContact = document.getElementById('contact_modal');
        this.lightboxMedias = document.getElementById('bodyLightbox');
        this.popular = document.querySelector('.filter_popular');
        this.date = document.querySelector('.filter_date');
        this.title = document.querySelector('.filter_title');

        //j'instancie ma classe GetPhotographers pour récupèrer toutes les données via mon API
        this.getPhotographers = new GetPhotographers('/data/photographers.json');
    }
    
    async main() {
        // je recupère l'id du photographe dans l'url
        const queryUrl_id = window.location.search;
        const urlSeachParam = new URLSearchParams(queryUrl_id);
        const photographerUrlId = urlSeachParam.get("id");
        
        // je stocke mes medias et photographers dans une variable
        const mediaPhotographer = await this.getPhotographers.getMedias();
        const PhotographersFile = await this.getPhotographers.getPhotograph();
         
        //je filtre le contenu en fonction de l'id passé en paramètre GET dans l'url 
        const filteredMediaByPhotographer = mediaPhotographer.filter((media) => media.photographerId == photographerUrlId);
        const filteredPhotographer = PhotographersFile.filter((photographer) => photographer.id == photographerUrlId)[0];
        
        // je rassemble tous mes medias par type video et image en utilisant mon Factory pattern
        const allMedias = filteredMediaByPhotographer.map(media => new TypedataFactory(media));
        
        //Je recupère tous les likes contenus dans allMedias dans un nouveau tableau
        const allLikes = allMedias.map(media => media.likes);
        
        // je récupère la vue de la bannière header contenant les informations du photographe avec une nouvelle instance de PhotographerPage
        // et en appelant la vue associée
        const pagesPhotograph = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerPage();
        //J'affiche la vue dans le constructeur associé 
        this.photographPage.appendChild(pagesPhotograph);
        
        // Je boucle sur les medias filtré en fonction du photographe 
        allMedias
        .forEach(filteredMediaByPhotographer => {
            //je récupère la vue pour l'affichage des médias avec une nouvelle instance de PhotographerPage
            // et en appelant la vue associée
            const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia();
            //J'affiche la vue dans le constructeur associé 
            this.mediasPhotograph.appendChild(TemplateMedia);
        });
        
        // je récupère la vue de la modale de contact 
        const contactModalDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createModalDisplay();
        //J'affiche la vue dans le constructeur associé 
        this.modalContact.appendChild(contactModalDisplay);
        
        // je récupère la vue pour la lightbox et l'affiche dans le constructeur associé 
        this.lightboxMedias.appendChild(new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).displayLightBox());
        
        
        // Je calcule le total des likes avec la methode reduce
        const totalLikes = allLikes.reduce((a, b) => a + b, 0);

        // je récupère la vue pour l'affichage des likes
        const likes = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createLikes(totalLikes);
        //J'affiche la vue dans le constructeur associé 
        this.mediasPhotograph.appendChild(likes);
        
        //j'incrémente le nombres de likes en fonction du click sur le bouton like avec une nouvelle instance de PhotographerPage et en récupèrant
        // la fonction incrémentLikes
        new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).incrementLikes(totalLikes);


        // je filtre les medias en fonction du filtre choisi par l'utilisateur
        //et je passe au constructeur associé tout les éléments à générer.
        const mediasDisplay = document.getElementById('mediaDisplay');
        let popular = document.querySelector('.filter_popular');
        let date = document.querySelector('.filter_date');
        let title = document.querySelector('.filter_title');
        popular.addEventListener('click', () => {
            popular.ariaSelected = true;
            date.ariaSelected = false;
            title.ariaSelected = false;
            const mediasPopularity = allMedias.sort(function(a, b){return b._likes - a._likes});
            mediasDisplay.innerHTML = '';
            mediasPopularity.forEach(filteredMediaByPhotographer => {
                const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia();
                mediasDisplay.appendChild(TemplateMedia);
            });
            // je génère la vue de la modale de contact 
            this.modalContact.innerHTML = '';
            const contactModalDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createModalDisplay();
            this.modalContact.appendChild(contactModalDisplay);
            
            // je génère la vue de la lightbox 
            this.lightboxMedias.innerHTML = '';
            this.lightboxMedias.appendChild(new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).displayLightBox());
            
            
            // Je calcule le total des likes avec la methode reduce
            const totalLikes = allLikes.reduce((a, b) => a + b, 0);
            // je génère la vue pour l'affichage des likes
            const likes = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createLikes(totalLikes);
            this.mediasPhotograph.appendChild(likes);
            
            //j'incrémente le nombres de likes en fonction du click sur le bouton like
            new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).incrementLikes(totalLikes);
        });
        date.addEventListener('click', () => {
            popular.ariaSelected = false;
            date.ariaSelected = true;
            title.ariaSelected = false;
            const mediasDate = allMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
            mediasDisplay.innerHTML = '';
            mediasDate.forEach(filteredMediaByPhotographer => {
                const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia();
                mediasDisplay.appendChild(TemplateMedia);
            });
            // je génère la vue de la modale de contact
            this.modalContact.innerHTML = ''; 
            const contactModalDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createModalDisplay();
            this.modalContact.appendChild(contactModalDisplay);
            
            // je génère la vue de la lightbox
            this.lightboxMedias.innerHTML = '';
            this.lightboxMedias.appendChild(new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).displayLightBox());
            
            
            // Je calcule le total des likes avec la methode reduce
            const totalLikes = allLikes.reduce((a, b) => a + b, 0);
            // je génère la vue pour l'affichage des likes
            const likes = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createLikes(totalLikes);
            this.mediasPhotograph.appendChild(likes);
            
            //j'incrémente le nombres de likes en fonction du click sur le bouton like
            new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).incrementLikes(totalLikes);
        });
        title.addEventListener('click', () => {
            popular.ariaSelected = false;
            date.ariaSelected = false;
            title.ariaSelected = true;
            const mediasTitle = allMedias.sort((a, b) => a.title.localeCompare(b.title));
            mediasDisplay.innerHTML = '';
            mediasTitle.forEach(filteredMediaByPhotographer => {
                const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia();
                mediasDisplay.appendChild(TemplateMedia);
            });
        // je génère la vue de la modale de contact 
            this.modalContact.innerHTML = '';
            const contactModalDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createModalDisplay();
            this.modalContact.appendChild(contactModalDisplay);
            
            // je génère la vue de la lightbox 
            this.lightboxMedias.innerHTML = '';
            this.lightboxMedias.appendChild(new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).displayLightBox());
            
            
            // Je calcule le total des likes avec la methode reduce
            const totalLikes = allLikes.reduce((a, b) => a + b, 0);
            // je génère la vue pour l'affichage des likes
            const likes = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createLikes(totalLikes);
            this.mediasPhotograph.appendChild(likes);
            
            //j'incrémente le nombres de likes en fonction du click sur le bouton like
            new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).incrementLikes(totalLikes);
        });
    }   
}
const pages = new Pages();
pages.main();



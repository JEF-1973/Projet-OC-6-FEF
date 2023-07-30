// je crée une classe Api pour recupérer mes requetes HTTP avec la méthode fetch 
class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }
    //Je récupère les datas photographes
    async getData() {
        return fetch(this._url)
        .then(res => res.json())
        .then(res => res.photographers)
        .catch(err => console.log('Erreur de chargement du fichier', err));
    }
    //Je récupère les datas Medias
    async getMedia() {
        return fetch(this._url)
        .then(res => res.json())
        .then(res => res.media)
        .catch(err => console.log('Erreur de chargement du fichier', err));
    }
}

// GetPhotographers est la classe qui va appeler les données transformé par ma classe Api 
class GetPhotographers extends Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }
    //Appel des données photographes
    async getPhotograph() {
        return await this.getData()
    }
    // Appel des données Médias
    async getMedias() {
        return await this.getMedia()
    }
}
// Design pattern Factory pour classer les medias en fonction de leurs types
class TypedataFactory {
    constructor(media) {
        if(media.image){
            return new PhotographerMedia(media)
        } else if(media.video) {
            return new PhotographerMedia(media)
        } else {
            throw "Unknow format type !"
        }
    }
}
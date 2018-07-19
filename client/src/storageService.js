import LocalStorageService from './localStorageService'

class StorageService extends LocalStorageService{
    constructor(){
        super('tomato')
    }
};

export default StorageService;
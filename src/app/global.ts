export class Global{

    constructor () {

    }
    
    private localStorageItem(str: string): string {
        return localStorage.getItem(str);
    }
}
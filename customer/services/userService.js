export default class UserService{
    constructor(){

    }
    getProduct(){
        return axios ({
            method: 'get',
            url: "https://6424f3719e0a30d92b25e2d4.mockapi.io/Products",
        });
    }
}
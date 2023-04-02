// phương thức axios, lấy dữ liệu


class PhoneServices {
    constructor(){

    }
    getProduct() {
        return axios({
            method: 'get',
            url: 'https://6424f3719e0a30d92b25e2d4.mockapi.io/Products',
        });
    }

    addProduc(product){
        return axios ({
            method: 'post',
            url: 'https://6424f3719e0a30d92b25e2d4.mockapi.io/Products',
            data: product,
        });
    }

    deleteProduct(id){
        return axios ({
            method: 'delete',
            url: `https://6424f3719e0a30d92b25e2d4.mockapi.io/Products/${id}`,
            
        });
    }

    watchProduct(id){
        return axios ({
            method: 'get',
            url: `https://6424f3719e0a30d92b25e2d4.mockapi.io/Products/${id}`,
            
        });
    }

    updateProduct(id,product){
        return axios ({
            method: 'put',
            url: `https://6424f3719e0a30d92b25e2d4.mockapi.io/Products/${id}`,
            data: product,
            
        });
    }
}
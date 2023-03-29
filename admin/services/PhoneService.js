
  function PhoneService() {
 
    this.getProductList = function () {
       
        return axios({
            method: 'get',
            url :'https://6411f1a9f9fe8122ae18721b.mockapi.io/Products'
          
        })

    }


    this.addProductService = function (product) {
        return axios({
            method: 'post',
            url: 'https://6411f1a9f9fe8122ae18721b.mockapi.io/Products',
            data: product
        })
    }


    this.deleteProductService= function (id) {
        return axios({
            method: 'delete',
            url: `https://6411f1a9f9fe8122ae18721b.mockapi.io/Products/${id}`,
        })
    }


    this.getProductItem = function (id) {
        return axios({
            method: 'get',
            url: `https://6411f1a9f9fe8122ae18721b.mockapi.io/Products/${id}`,
        })
    }

   
    this.updateProductService = function (productUpdate,id) {
        return axios({
            method: 'put',
            url: `https://6411f1a9f9fe8122ae18721b.mockapi.io/Products/${id}`,
            data: productUpdate
        })
    }


}
const getEle = (id) => document.getElementById(id);
const resetForm = (formId) => getEle(formId).reset();

// import { CustomModal, Helper } from './utis.js';
// import { Services } from '../services/phoneService.js';
// import { Validate } from './validate.js';
// import { Phone } from '../model/phone.js';

// const helper = new Helper();
const phoneService = new PhoneService();
// const validate = new Validation();




function renderList(arrayData) {
    var content = "";

    arrayData.map(function(product) {
        content += `
            <tr>
            <td>${product.id}</td>
            <td><strong>${product.name}</strong></td>
            <td>$${product.price}</td>
            <td style="text-align: center"><img src=${product.img} alt="phone-img" width="150" height="150"></td>
            <td>${product.desc}</td>

            <td class = ''style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
            data-bs-target="#exampleModal" onclick ="showProductDetail('${product.id}')"  id='btnEdit'>
            Edit<i class="fa fa-pencil-square ms-2"></i>

            </button><button class="btn " onclick ="deleteProduct('${product.id}')" id='btnDelete'>
            Delete <i class="fa fa-trash ms-2"></i>
            </button></td>
            </tr>
        `
    });

    getEle('tablePhone').innerHTML = content;

}


function showPhoneList() {


 phoneService.getProductList().then(function (result) {
        
        console.log('49',result.data);
  
        renderList(result.data);

    })
        .catch(function (error) {
      
            console.log(error)
        });

}

showPhoneList();

// show Form
document.querySelector(".add").onclick = function () {
    var form = document.querySelector('.form-wrapper');
    form.classList.add('active');

    resetForm('formPhone');

    getEle('btnUpdate').style.display = 'none';
    getEle('btnAddPhone').style.display = 'inline-block';
 

}




// function add phone
function addPhone() {
    //lấy dữ liệu từ form
    var name =getEle('name').value;
    var price=getEle('price').value;
    var screen=getEle('screen').value;
    var backCamera=getEle('backCam').value;
    var frontCamera=getEle('frontCam').value;
    var img=getEle('img').value;
    var desc=getEle('desc').value;
    var type=getEle('type').value;

    console.log( name, price, screen, backCamera, frontCamera, img, desc, type)
   

    //validation

    //Tạo đối tượng sản phẩm
    var product = new Phone(name, price, screen, backCamera, frontCamera, img, desc, type);
    console.log(product)

    //truyền xuống BE
    phoneService.addProductService(product)
        .then(function (result) {
            console.log(result);
            //hiển thị lại danh sách
            showPhoneList();

        })
        .catch(function (error) {
            console.log(error)
        })

}
getEle('btnAddPhone').onclick = addPhone();


// close form
getEle('btnClose').onclick = function(){
    var form = document.querySelector('.form-wrapper');
    form.classList.remove('active');
}


// delete
function deleteProduct(id) {
    console.log(id);
    phoneService.deleteProductService(id)
        .then(function (result) {
            console.log('128',result.data);

            showPhoneList();
        })
        .catch(function (error) {
            console.log(error)
        })
}
// read
function showProductDetail(id) {
    console.log(id);

    phoneService.getProductItem(id)
        .then(function (result) {
            console.log(result.data);


            getEle('name').value=result.data.name;
            getEle('price').value=result.data.price;
            getEle('screen').value=result.data.screen;
            getEle('backCam').value=result.data.backCamera;
            getEle('frontCam').value=result.data.frontCamera;
            getEle('img').value=result.data.img;
            getEle('desc').value=result.data.desc;
            getEle('type').value=result.data.type;
            

            
            // document.querySelector("#TenSP").value = result.data.tenSP;
            // document.querySelector("#GiaSP").value = result.data.gia;
            // document.querySelector("#HinhSP").value = result.data.hinhAnh;
            // document.querySelector("#MoTa").value = result.data.moTa;

            //thêm button update cho form
            // document.querySelector("#myModal .modal-footer").innerHTML = `
            // <button class="btn btn-success" onclick="updateProduct('${result.data.id}')" >Update Product</button>
            // `

        })
        .catch(function (error) {
            console.log(error)
        })


}


function updateProduct(id) {
    console.log(id);
    //Lấy dữ liệu từ form
    var tenSP = document.querySelector("#TenSP").value;
    var gia = document.querySelector("#GiaSP").value
    var hinhAnh = document.querySelector("#HinhSP").value
    var moTa = document.querySelector("#MoTa").value;

    //tạo đối tương productUpdate
    var productUpdate = new Product(tenSP, gia, hinhAnh, moTa);
    console.log(productUpdate);

    //Tương tác với BE để update
    productSer.updateProductSer(productUpdate, id)
        .then(function (result) {
            console.log(result.data);
            //Hiển thị lại table
            showProductList();

            alert("Cập nhật thành công");

            document.querySelector("#myModal .close").click();

        })
        .catch(function (error) {
            console.log(error);
        })

}










//update





window.btnEdit = async (id) => {
  helper.clearTB();
  getEle('btnUpdate').style.display = 'inline-block';
  getEle('btnAddPhone').style.display = 'none';

  let data = await service.getPhoneById(id);
  let arrObjValue = Object.keys(data).map((k) => data[k]);
  arrObjValue.pop(); // Remove id from array
  helper.fill(arrObjValue); // fill the form with values

  getEle('btnUpdate').onclick = async () => {
    const phoneList = await service.getPhones();
    if (!validate.isValid(phoneList, true)) return;

    const inputs = helper.getInputValue();
    let phone = new Phone(id, ...inputs);
    await service.updatePhone(phone);
    renderList();
    CustomModal.alertSuccess('Update phone successfully');
  };
};


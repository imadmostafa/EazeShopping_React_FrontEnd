import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/api';

let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
export default {
    getAllCustomers: () => 
        axios.get(BASE_API_URL+"/customers"),
        getAllMembers: () => 
        axios.get(BASE_API_URL+"/allmembers"),
        getAllCashiers: () => 
        axios.get(BASE_API_URL+"/cashiers"),
        getAllProducts: () => 
        axios.get(BASE_API_URL+"/products"),
        getAllProductsWithImages: () => 
        axios.get(BASE_API_URL+"/products_w_images"),
        getStores: () => 
        axios.get(BASE_API_URL+"/stores"),
        getBillsCashier_UnDone: () => 
        axios.get(BASE_API_URL+"/bills_notdone"),
        getAllCategories: () => 
        axios.get(BASE_API_URL+"/categories"),
        getProductByName_Customer: (name) => 
        axios.get(BASE_API_URL+"/productbyname_customer/"+name),
    getAllCashierss: (id) =>
        axios.get(`${BASE_API_URL}+"/posts/${id}/edit`),
    SignIn: (post) =>
        axios.post(BASE_API_URL+"/login", post),
        setBillDone: (post) =>
        axios.put(BASE_API_URL+"/setbilldone", post),
        insertImage: (post) =>
        axios.post(BASE_API_URL+"/insertimage", post),
        insertBill: (post) =>
        axios.post(BASE_API_URL+"/bill", post),
        addProduct: (post) =>
        axios.post(BASE_API_URL+"/product", post),
        editProduct: (post) =>
        axios.post(BASE_API_URL+"/product_edit", post),
        deletemember: (id) =>
        axios.delete(BASE_API_URL+"/user/"+id),
        deleteproduct: (id) =>
        axios.delete(BASE_API_URL+"/product/"+id),
        Register_Customer: (post) =>
        axios.post(BASE_API_URL+"/register_customer", post),
        Register_Store: (post) =>
        axios.post(BASE_API_URL+"/register_store", post),
        addPost: (post) =>
        axios.post('{BASE_API_URL}/posts/', post),
    deleteimage: (id) =>
        axios.delete(`${BASE_API_URL}/gallery/${id}`),
    }

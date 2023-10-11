import { ReactFormConst } from "./React.const";

const stateDefault = {
    listProduct: [],
    productEdit: null,
    listProductSearch: [],
}

export const reactFormReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ReactFormConst.Submit:
            const newListProduct = [...state.listProduct]
            newListProduct.push(action.payload);

            state.listProduct = newListProduct;
            state.listProductSearch = state.listProduct;
            
            // cập nhật lại state khi chỉnh sứa và xóa sẽ thành 1 mảng rổng, không nên dùng trong lúc này
            // state.listProduct = newListProduct;

            return { ...state }

        case ReactFormConst.Delete:
            const vitrixoa = [...state.listProductSearch];
            const newListProductDLT = state.listProduct.filter(
                (p) => p.id !== action.payload
            );
            
            state.listProduct = newListProductDLT;
            // console.log(action.payload)
            const indexxoa = vitrixoa.findIndex((index) => index.id === action.payload)
            console.log(indexxoa);
            state.listProductSearch.splice(indexxoa,1);
            return { ...state }
        case ReactFormConst.Edit:
            state.productEdit = action.payload;
            // state.listProductSearch = state.productEdit;
            return { ...state }
        case ReactFormConst.Update:
            // const mangcu = [...state.listProduct]
            const newUpdate = [...state.listProduct];
            const index = newUpdate.findIndex((index) => index.id === action.payload.id)
            newUpdate.splice(index, 1, action.payload);
                // console.log(index)
            //tìm id thẻ mới thay đổi, newUpdate.splice(index, 1, action.payload); thay cái id mới đổi vô cái mảng củ

            state.listProduct = newUpdate;
            // console.log(state.listProduct);
            state.listProduct.map((p) => {
                const indexid = state.listProductSearch.findIndex((index) => index.id === action.payload.id)
                return state.listProductSearch.splice(indexid,1,p)
            })
            // console.log( state.listProductSearch)



            state.productEdit = null;
            return { ...state }
        case ReactFormConst.Search:
            // cách 1: sử lý bằng sự kiện : onBlur
            // cách 2: sử lý bằng sự kiện : onChange => thay đổi state khi nhập vô ô input
            const a = state.listProduct
            const newListProductSearch = state.listProduct.filter(
                (p) => p.name.toLowerCase() === action.payload.toLowerCase()
                // toLowerCase()
            );
            console.log(newListProductSearch);
            if (newListProductSearch.length === 0) {
                state.listProduct = state.listProductSearch;
            }else if((newListProductSearch.length !== 0)){
                state.listProduct= newListProductSearch;
            }

            
            return { ...state }
        default:
            return { ...state }
    }
}
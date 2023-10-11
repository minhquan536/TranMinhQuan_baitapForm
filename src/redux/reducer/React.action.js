import { ReactFormConst } from "./React.const";

export const submitForm = (payload) => ({
    type: ReactFormConst.Submit,
    payload,
});
export const deleteForm = (payload) => ({
    type: ReactFormConst.Delete,
    payload,
});
export const editForm = (payload) => ({
    type: ReactFormConst.Edit,
    payload,
});
export const updateForm = (payload) => ({
    type: ReactFormConst.Update,
    payload,
});
export const searchForm = (payload) => ({
    type: ReactFormConst.Search,
    payload,
});


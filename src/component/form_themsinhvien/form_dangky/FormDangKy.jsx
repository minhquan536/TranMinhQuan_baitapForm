import React, { Component } from "react";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import { submitForm, updateForm } from "../../../redux/reducer/React.action";

class FormDangKy extends Component {
  state = {
    value: {
      id: "",
      sdt: "",
      name: "",
      email: "",
    },
    error: {
      id: "",
      sdt: "",
      name: "",
      email: "",
    },
    touch: {
      id: false,
      sdt: false,
      name: false,
      email: false,
    },
  };

  handleValidate = () => {
    const errorState = { ...this.state.error };
    const { value } = this.state;
    for (const prop in value) {
      // console.log(value[prop])
      switch (prop) {
        case "id":
          errorState[prop] = "";

          const isExist = this.props.listProduct.find(
            (p) => +p.id === Number(value[prop])
          );
          if (isExist && this.props.productEdit === null) {
            errorState[prop] = " id đã tồn tại ";
          }

          const REGEX_NUMBER = /^\d+$/;
          if (!REGEX_NUMBER.test(value[prop])) {
            errorState[prop] = "id phải là số";
          }

          if (value[prop].length === 0) {
            errorState[prop] = " không được để trống ";
          }

          break;
        case "sdt":
          errorState[prop] = "";

          const REGEX_STD =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
          if (!REGEX_STD.test(value[prop])) {
            errorState[prop] = "STD không hợp lệ";
          }

          if (value[prop].length === 0) {
            errorState[prop] = " không được để trống ";
          }
          break;
        case "name":
          errorState[prop] = "";

          const REGEX_NAME =
            /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
          if (!REGEX_NAME.test(value[prop])) {
            errorState[prop] = "name phải là chữ";
          }

          if (value[prop].length === 0) {
            errorState[prop] = " không được để trống ";
          }

          break;
        case "email":
          errorState[prop] = "";

          const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!REGEX_EMAIL.test(value[prop])) {
            errorState[prop] = "email không hợp lệ";
          }

          if (value[prop].length === 0) {
            errorState[prop] = " không được để trống ";
          }

          break;
        default:
          break;
      }
    }
    this.setState({
      error: errorState,
    });
    return errorState;
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    flushSync(() => {
      this.setState({
        value: {
          ...this.state.value,
          [name]: value,
        },
      });
    });
    this.handleValidate();
  };
  handleBlur = (event) => {
    const { target } = event;
    const { name } = target;

    flushSync(() => {
      this.setState({
        touch: {
          ...this.state.touch,
          [name]: true,
        },
      });
    });
    this.handleValidate();
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const newError = this.handleValidate();

    const ready = Object.values(newError).every((i) => i.length === 0);
    if (ready === false) return;

    const action = this.props.productEdit ? updateForm(this.state.value) : submitForm(this.state.value);
    this.props.dispatch(action);

    this.setState({
      value: {
        id: "",
        sdt: "",
        name: "",
        email: "",
      },
      touch: {
        id: false,
        sdt: false,
        name: false,
        email: false,
      },
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.productEdit !== null) {
      if (newProps.productEdit.id !== currentState.value.id) {
        return {
          value: newProps.productEdit,
        };
      }
    }
    return null;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-6">
            <label htmlFor="producID">Mã Sinh Viên</label>
            <input
              name="id"
              value={this.state.value.id}
              className="form-control"
              id="producID"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              disabled={this.props.productEdit}
            />
            {this.state.touch.id && this.state.error.id && (
              <p className="text-danger">{this.state.error.id}</p>
            )}

            <label htmlFor="producSDT">Số Điện Thoại</label>
            <input
              name="sdt"
              value={this.state.value.sdt}
              className="form-control"
              id="producSDT"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {this.state.touch.sdt && this.state.error.sdt && (
              <p className="text-danger">{this.state.error.sdt}</p>
            )}
          </div>
          <div className="col-6">
            <label htmlFor="producName">Họ Tên</label>
            <input
              name="name"
              value={this.state.value.name}
              className="form-control"
              id="producName"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {this.state.touch.name && this.state.error.name && (
              <p className="text-danger">{this.state.error.name}</p>
            )}
            <label htmlFor="producEmail">Email</label>
            <input
              name="email"
              value={this.state.value.email}
              className="form-control"
              id="producEmail"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {this.state.touch.email && this.state.error.email && (
              <p className="text-danger">{this.state.error.email}</p>
            )}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          {
            this.props.productEdit ? "update" : "Submit"
          }
        </button>
      </form>
    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    listProduct: rootReducer.reactFormReducer.listProduct,
    productEdit: rootReducer.reactFormReducer.productEdit,
    listProductSearch: rootReducer.reactFormReducer.listProductSearch,
  };
};
export default connect(mapStateToProps)(FormDangKy);

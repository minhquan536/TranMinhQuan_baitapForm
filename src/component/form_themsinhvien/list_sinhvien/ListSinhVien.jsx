import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteForm, editForm, searchForm } from "../../../redux/reducer/React.action";

class ListSinhVien extends Component {

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const a = value.toLowerCase()
    const action = searchForm(a);
    // console.log(a)
    // console.log(value)
    // console.log(action)
    this.props.dispatch(action);
  };

  render() {
    return (
      <div>
        <br />
        <input style={{padding:"10px 40px", width:"100%"}} type="text" onChange={this.handleChange} placeholder="Nhập tên sinh viên bạn cần tìm"/>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Mã Sinh Viên</th>
              <th scope="col">Họ Và Tên</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listProduct.map((p) => {
              return (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.sdt}</td>
                  <td>{p.email}</td>
                  <td>
                    <button className="bg-warning" style={{border:"1px solid yellow",marginRight:20,padding:"3px 10px"}}
                      onClick={() => {
                        this.props.dispatch(editForm(p));
                      }}
                    >
                      Edit
                    </button>
                    <button className="bg-danger" style={{border:"1px solid red",marginRight:20,padding:"3px 10px"}}
                      onClick={() => {
                        this.props.dispatch(deleteForm(p.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    listProduct: rootReducer.reactFormReducer.listProduct,
  };
};

export default connect(mapStateToProps)(ListSinhVien);

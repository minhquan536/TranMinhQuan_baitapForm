import React, { Component } from 'react'
import FormDangKy from './form_dangky/FormDangKy'
import ListSinhVien from './list_sinhvien/ListSinhVien'

export default class Form extends Component {
  render() {
    return (
      <div className='container w-80'>  
        <FormDangKy/>
        <ListSinhVien/>
      </div>
    )
  }
}

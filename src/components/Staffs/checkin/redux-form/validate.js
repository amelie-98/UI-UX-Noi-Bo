const validate = value => {
  // const errors = {}
  // // danh sách Field cần validate lấy theo thuộc tính name của từng Field muốn validate
  // const { Reason, typeLeave, typeOff } = value
  // // validate cho currentPassword
  // if (!Reason) {
  //   errors.Reason = 'vui lòng nhập lý do' //in ra lỗi 
  // } else if (Reason.trim() && Reason.length < 8) {
  //   errors.Reason = 'lý do phải từ 8 kí tự' //in ra lỗi 
  // }
  // if (!typeLeave) {
  //   errors.typeLeave = 'vui lòng chọn loại nghỉ' //in ra lỗi 
  // }
  // if (typeLeave === 'Leave Early Half Day' && !typeOff) {
  //   errors.typeOff = 'vui lòng chọn loại nghỉ có trả lương hay không' //in ra lỗi 
  // }
  return errors
}

export default validate
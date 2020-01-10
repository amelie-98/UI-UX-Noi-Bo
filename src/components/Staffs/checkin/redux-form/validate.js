const validate = value => {
  const errors = {}
  // danh sách Field cần validate lấy theo thuộc tính name của từng Field muốn validate
  const { Reason } = value
  // validate cho currentPassword
  if (!Reason) {
    errors.Reason = 'vui lòng nhập lý do' //in ra lỗi 
  }
  return errors
}

export default validate
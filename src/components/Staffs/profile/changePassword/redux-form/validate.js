const validate = value => {
  const errors = {}
  // danh sách Field cần validate lấy theo thuộc tính name của từng Field muốn validate
  const { currentPassword, newPassword, passwordConfirmation } = value
  // validate cho currentPassword
  if (!currentPassword) {
    errors.currentPassword = 'vui lòng nhập mật khẩu' //in ra lỗi 
  } else if (currentPassword.trim() && currentPassword.length < 8) {
    errors.currentPassword = 'mật khẩu phải từ 8 kí tự' //in ra lỗi 
  } else if (currentPassword.trim() && currentPassword.length > 15) {
    errors.currentPassword = 'mật khẩu phải ít hơn 20 kí tự' //in ra lỗi 
  }
  // validate cho newPassword
  if (!newPassword) {
    errors.newPassword = 'vui lòng nhập mật khẩu' //in ra lỗi 
  } else if (newPassword.trim() && newPassword.length < 8) {
    errors.newPassword = 'mật khẩu phải từ 8 kí tự' //in ra lỗi 
  } else if (newPassword.trim() && newPassword.length > 15) {
    errors.newPassword = 'mật khẩu phải ít hơn 20 kí tự' //in ra lỗi 
  }
  // validate cho passwordConfirmation
  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'vui lòng nhập mật khẩu' //in ra lỗi 
  } else if (passwordConfirmation.trim() && passwordConfirmation.length < 8) {
    errors.passwordConfirmation = 'mật khẩu phải từ 8 kí tự' //in ra lỗi 
  } else if (passwordConfirmation.trim() && passwordConfirmation.length > 15) {
    errors.passwordConfirmation = 'mật khẩu phải ít hơn 20 kí tự' //in ra lỗi 
  }
  return errors
}

export default validate
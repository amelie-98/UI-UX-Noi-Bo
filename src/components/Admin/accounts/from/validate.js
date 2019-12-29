const validate = value => {
  const errors =	{};
  const {email, Name, StaffID, Role, date} = value;
  if(!email){
    errors.email = 'Please enter email';
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
    errors.email = 'Invalid email address';
  }
  if(!Name){
    errors.Name = 'Please enter Name';
  } else if(Name.trim() && Name.length < 10){
    errors.Name = 'Name phải 10 ký tự';
  }
  if(!StaffID){
    errors.StaffID = 'Please enter StaffID';
  }
  if(!Role){
    errors.Role = 'Please enter Role';
  }
  if(!date){
    errors.date = 'Please enter date';
  }
  return errors;
};

export default validate;
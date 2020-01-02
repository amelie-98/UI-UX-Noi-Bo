const validate = value => {
  const errors =	{};
  const {id, name,contractType, birthDay, cmt, sdt, address, email, dateJoinCompany, sex,  Role, date} = value;
  if(!id){
    errors.id = 'Please enter id';
  }
  if(!name){
    errors.name = 'Please enter name';
  } else if(name.trim() && name.length < 10){
    errors.name = 'Name phải 10 ký tự';
  }
  if(!contractType){
    errors.contractType = 'Please enter contractType';
  }
  if(!birthDay){
    errors.birthDay = 'Please enter birthDay';
  }
  if(!cmt){
    errors.cmt = 'Please enter cmt';
  }
  if(!sdt){
    errors.sdt = 'Please enter phoneNumber';
  } 
  if(!address){
    errors.address = 'Please enter address';
  }
  if(!email){
    errors.email = 'Please enter email';
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
    errors.email = 'Invalid email address';
  }
  if(!dateJoinCompany){
    errors.dateJoinCompany = 'Please enter dateJoinCompany';
  }
  if(!sex){
    errors.sex = 'Please enter sex';
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
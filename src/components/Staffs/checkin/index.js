import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CheckIn.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
// import { history } from '../../../helpers/history/history';
// import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux';
// import renderTextField from './FormHelper/TextField'
import renderTextAreaField from './FormHelper/TextAreaField'
import validate from './redux-form/validate'

function CheckIn(props) {
  const { handleSubmit, invalid, submitting, pristine } = props;
  // useEffect(() => {
  //   if (statusCheckIn === 200) {
  //     props.setStatusCheckIn(0)
  //     console.log('check in thành công thì tiến hành đẩy vào trang check out')
  //     history.push('/Checkout')
  //   }
  //   if (statusCheckIn === 201) {
  //     props.setStatusCheckIn(0)
  //     alert('CheckIn 1 lần 1 ngày thôi =))')
  //   }
  //   // eslint-disable-next-line
  // }, [statusCheckIn]);
  // code modal
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const letCheckIn = () => {
    if (moment().isAfter(moment('08:00', "HH:mm"))) {
      toggle();
      props.reset(); // reset lại tất cả giá trị trong form bắt nhập lại từ đầu // đây là props của redux form
    }
    else {
      props.checkIn();
    }
  }
  const finishReport = (data) => {
    props.reportInlateLeaveEarly(data.Reason)
    props.checkIn();
  }
  console.log(props.statusCheckIn)
  return (
    <div className="check-in">
      <div className='total-content-check-in'>
        <div className='title-check-in'>Check In</div>
        <div className='date-check-in'>{moment().format('HH:mm DD/MM/YYYY')}</div>
        <div className='text-check-in'>
          <p>Sáng ra nhìn thấy bạn hiền</p>
          <p> Cười tươi một cái lĩnh tình ăn chơi</p>
        </div>
        <button className="btn btn-checkin" onClick={letCheckIn}>Start</button>
        {/* /modal/ */}
        <div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit(finishReport)}>
              <ModalHeader toggle={toggle}>Why are you late for work ?</ModalHeader>
              <ModalBody>
                <Field
                  id='Reason'
                  label='Reason'
                  className="Reason"
                  placeholder="Reason"
                  name="Reason"
                  component={renderTextAreaField}
                />
              </ModalBody>
              <ModalFooter>
                <button
                  //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
                  disabled={invalid || submitting || pristine}
                  className="btn btn-change-pass-word"
                  type="submit"
                >
                  Check In
              </button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
        {/* /modal/ */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    statusCheckIn: state.statusCheckIn,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: () => { dispatch(actions.checkIn()) },
    setStatusCheckIn: (data) => { dispatch(actions.setStatusCheckIn(data)) },
    reportInlateLeaveEarly: (reason) => { dispatch(actions.reportInlateLeaveEarly({ reason: reason })) }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: 'CHECK_IN',
  validate: validate //tất cả code validate để trong validate.js mà import vào
});

export default compose(
  withConnect,
  withReduxForm
)(CheckIn);
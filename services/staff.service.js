const httpStatus = require('http-status');
const moment = require('moment');
const StaffInfo = require('../models/staff.model');
const Punchin = require('../models/punchin.model');
const ApiError = require('../utils/ApiError');
const allowBounsService = require('./allowance.bounus.service');
const punchinService = require('./punchin.service');

const getAllStaffWhereStatusActive = async () => {
  // eslint-disable-next-line
  return await StaffInfo.find({ status: 'Activate' });
};

const getstaffByid = async (id) => {
  const staff = await StaffInfo.findOne({ _id: id }).populate('business');
  return staff;
};

const getStaffbyidAndUpdate = async (id, body) => {
  let staff = await getstaffByid(id);
  if (!staff) {
    throw new ApiError(' Staff id is Invalid ', httpStatus.BAD_REQUEST);
  }
  // Object.assign(staff, body)
  staff = await StaffInfo.findByIdAndUpdate(staff._id, { ...body }, { new: true });
  return staff;
};
const getPreviousDays = async (peviousDate) => {
  // eslint-disable-next-line
  let a,d;
  const getDaysArray = await function (s, e) {
    // eslint-disable-next-line
    for (a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      // eslint-disable-next-line
      a.push(moment(d).format('YYYY-MM-DD').toString() );
    }
    // eslint-disable-next-line
    return a;
  };
  const getlist = await getDaysArray(new Date(peviousDate), new Date());
  return getlist;
};
const storePreviousDays = async (peviousDate, staff) => {
  const totalPreviousDays = await getPreviousDays(peviousDate);
  for (let index = 0; index < totalPreviousDays.length; index += 1) {
    const date = totalPreviousDays[index];
    // eslint-disable-next-line
    await Punchin.create({ staff, date });
  }
  return true;
};

const createStaff = async (body) => {
  // eslint-disable-next-line
const staff =  await StaffInfo.create(body);
  if (body.salaryInfo.salaryType === 'Monthly' || body.salaryInfo.salaryType === 'PerhourBasis') {
    await storePreviousDays(body.salaryInfo.salaryCycle, staff._id);
  }
  return staff;
};
const deleteStaffbyid = async (id) => {
  await StaffInfo.findByIdAndRemove(id);
  return true;
};
const getallStaff = async (id) => {
  // eslint-disable-next-line
  return await StaffInfo.find({ business: id });
};

const staffStatus = async (id, status) => {
  const staff = await getstaffByid(id);
  if (staff) {
    if (status) {
      if (staff.status === 'Activate') {
        throw new ApiError('post is already activate', httpStatus.BAD_REQUEST);
      } else {
        staff.status = 'Activate';
        // eslint-disable-next-line
        return await staff.save();
      }
    }
    if (staff.status === 'Deactivate') {
      throw new ApiError('post is already deactivate', httpStatus.BAD_REQUEST);
    } else {
      staff.status = 'Deactivate';
      // eslint-disable-next-line
      return await staff.save();
    }
  }
  throw new ApiError('No post found in id', httpStatus.BAD_REQUEST);
};

const getPerDaySalary = (salary, salaryType) => {
  return salary / salaryType;
};
const getpreviewsDaysAndCurrentDaysDiff = async (Pdate) => {
  return (await moment().diff(moment(Pdate), 'days')) + 1;
};
const calculatePaymentNormalMonth = (salaryperday, advancedpay = 0, currentdate, cycle = 0, totalsalary) => {
  const enddate = 30;
  const totaldays = 30;
  // eslint-disable-next-line
  const spendedsalary = totalsalary - advancedpay;

  const gettotaldays = cycle - 1 + enddate; //
  const extradays = gettotaldays <= 30 ? 0 : gettotaldays - totaldays; // 8
  let days;
  if (extradays > 0) {
    // eslint-disable-next-line
    days = cycle - extradays;
  }

  let currentdatesalary = 0;
  if (currentdate >= cycle && currentdate <= enddate) {
    currentdatesalary = currentdate - cycle + 1;
  } else if (enddate - cycle + currentdate + 1 < 30) {
    currentdatesalary = enddate - cycle + currentdate + 1;
  } else {
    currentdatesalary = 30;
  }
  let payment = 0;
  const getsalary = currentdatesalary * salaryperday;
  if (getsalary <= advancedpay) {
    payment = advancedpay - currentdatesalary * salaryperday;
  } else {
    payment = advancedpay - currentdatesalary * salaryperday;
  }
  if (Math.sign(Math.trunc(payment)) === -1) {
    return {
      pending: Math.abs(payment),
    };
  }
  if (Math.sign(Math.trunc(payment)) === 1) {
    return {
      advance: payment,
    };
  }
  return payment;
};

const getCurrentDate = async () => {
  // eslint-disable-next-line
  return await moment().date();
};
// const getCycleDate = async (date) => {
//   // eslint-disable-next-line
//   return await moment(date).date();
// };
const calculatePaymentCalendarMonth = async (cycleDate, salary, type, Amount) => {
  const nextMonth = await moment(cycleDate).add(1, 'months').format('YYYY-MM-DD');
  const totalDays = await moment(nextMonth).diff(moment(cycleDate), 'days');
  const perDaySalary = await getPerDaySalary(salary, totalDays);

  const totalCurrentSalary = perDaySalary * (await getpreviewsDaysAndCurrentDaysDiff(cycleDate));
  if (type === 'Advance') {
    const advanceCalculation = Amount - totalCurrentSalary;
    if (Math.sign(Math.trunc(advanceCalculation)) === -1) {
      return {
        pending: Math.abs(advanceCalculation),
      };
    }
    if (Math.sign(Math.trunc(advanceCalculation)) === 1) {
      return {
        advance: advanceCalculation,
      };
    }
    return {
      today: advanceCalculation,
    };
  }
  const pendingCalculation = Amount + totalCurrentSalary;
  if (Math.sign(Math.trunc(pendingCalculation)) === 1) {
    return {
      pending: pendingCalculation,
    };
  }
};

const getTotalalloBonus = async (id) => {
  const date = await allowBounsService.getallBonusByStaffId(id);
  if (!date) {
    return null;
  }
  let allowance = 0;
  let bonus = 0;
  for (let index = 0; index < date.length; index += 1) {
    if (date[index].isAllowance) {
      allowance += date[index].Amount;
    } else {
      bonus += date[index].Amount;
    }
  }
  return { allowance, bonus };
};

const WeeklySalaryCalculation = async (days, salary, type, Amount) => {
  if (days <= 7) {
    const currentSalary = (await days) * salary;
    if (type === 'Advance') {
      if (Amount >= 0) {
        const Advance = Amount - currentSalary;
        if (Math.sign(Advance) === -1) {
          return { pending: Math.abs(Advance) };
        }
        return { advance: Advance };
      }
    } else if (type === 'Pending') {
      const Pending = Amount + currentSalary;

      return { pending: Pending };
    }
  }
};

const totalWeeklySalaryCalculation = async (days, salary, type, Amount) => {
  if (days <= 7) {
    const currentSalary = (await days) * salary;
    return {
      currentSalary,
      type,
      Amount,
    };
  }
};

const totalHourCalculation = async (staffShiftHours) => {
  const totalho = staffShiftHours.hours + staffShiftHours.min / 60;
  return totalho;
};

// const getHourSalary = async (salary, salaryCycle, type, Amount, staff_shiftHours) => {
//   const currentHour = new Date.toString('hh');
// };
const totalDaysCalculation = async (id, pDate) => {
  const days = await getPreviousDays(pDate);
  let totalho = 0;
  for (let index = 0; index < days.length; index += 1) {
    // eslint-disable-next-line
    const getpunchin = await punchinService.getsatffByIdAndDate(id, days[index]);
    if (getpunchin.punchout.hours <= 0 && getpunchin.punchout.min <= 0) {
      // eslint-disable-next-line
      continue;
    } else {
      // eslint-disable-next-line
      const punchOutHo = await totalHourCalculation(getpunchin.punchout);
      // eslint-disable-next-line
      const punchinHo = await totalHourCalculation(getpunchin.punchin);
      totalho += punchOutHo - punchinHo;
    }
  }
  return { totalho };
};
const getSalaryCalculationOfparticularStaff = async (id) => {
  const staff = await getstaffByid(id);
  if (!staff) {
    throw new ApiError('No Staff Found in id.', httpStatus.BAD_REQUEST);
  }
  // eslint-disable-next-line
  let { salaryType, salary, salaryCycle } = staff.salaryInfo;
  let payment;
  const totalPreviousDay = await Punchin.find({ staff }).count();
  salaryCycle = await moment(salaryCycle)
    .add(totalPreviousDay - 1, 'days')
    .format('YYYY-MM-DD');
  if (moment(salaryCycle).isBefore(moment().format('YYYY-MM-DD'))) {
    salaryCycle = await moment(salaryCycle).add(1, 'days');
    await storePreviousDays(salaryCycle, staff._id);
    return true;
  }
  if (salaryType === 'Weekly') {
    const days = await getpreviewsDaysAndCurrentDaysDiff(staff.salaryInfo.salaryCycle);
    const { type, Amount } = staff.Payment;
    const totalSalary = await WeeklySalaryCalculation(days, salary, type, Amount);
    return totalSalary;
  }
  if (salaryType === 'PerhourBasis') {
    const totalho = await totalDaysCalculation(id, staff.salaryInfo.salaryCycle);
    let totalSalary = totalho.totalho * salary;
    if (staff.Payment.type === 'Advance') {
      if (staff.Payment.Amount === 0) {
        return { totalSalary };
      }
      const Amount = staff.Payment.Amount - totalSalary;
      if (Math.sign(Amount) === 1) {
        return { advance: Amount };
      }
      return { pending: Amount };
    }
    if (staff.Payment.type === 'Pending') {
      totalSalary += staff.Payment.Amount;
      return { pending: totalSalary };
    }
  }
  if (staff.business.salaryType === 'NormalMonth') {
    if (salaryType === 'Monthly') {
      const perDaySalary = await getPerDaySalary(salary, 30);
      // eslint-disable-next-line
      let { type, Amount } = staff.Payment;

      const { allowance, bonus } = await getTotalalloBonus(id);
      const currentDate = await getCurrentDate();
      // const cycleDate = await getCycleDate(salaryCycle);
      if (type === 'Advance') {
        Amount += allowance + bonus;
        // eslint-disable-next-line
        return (payment = await calculatePaymentNormalMonth(perDaySalary, Amount,currentDate,salaryCycle =moment(staff.salaryInfo.salaryCycle).date()));
      }
      payment = (await getpreviewsDaysAndCurrentDaysDiff(salaryCycle)) * perDaySalary + Amount;
      return {
        type,
        totalPending: payment,
      };
    }
    // if (salaryType === 'PerhourBasis') {
    //   // eslint-disable-next-line
    //   let { type, Amount } = staff.Payment;
    //   return await totalHourCalculation(salary, salaryCycle, type, Amount, staff.shiftHours);
    // }
  }
  if (salaryType === 'Monthly') {
    const { type, Amount } = staff.Payment;
    // eslint-disable-next-line
    return await calculatePaymentCalendarMonth(staff.salaryInfo.salaryCycle, salary, type, Amount);
  }
};

const getTotalSalaryCalculationOfparticularStaff = async (id) => {
  const staff = await getstaffByid(id);
  if (!staff) {
    throw new ApiError('No staff Found this id.', httpStatus.BAD_REQUEST);
  }
  const { salary, salaryType, salaryCycle } = staff.salaryInfo;
  if (salaryType === 'Weekly') {
    const days = await getpreviewsDaysAndCurrentDaysDiff(salaryCycle);
    const { type, Amount } = staff.Payment;
    // eslint-disable-next-line
    return await totalWeeklySalaryCalculation(days, salary, type, Amount);
  }
  if (salaryType === 'PerhourBasis') {
    const { type, Amount } = staff.Payment;
    const { allowance, bonus } = await getTotalalloBonus(id);
    const perHoSalary = salary;
    const totalcurrentHo = await totalDaysCalculation(id, staff.salaryInfo.salaryCycle);
    const currentAmount = totalcurrentHo.totalho * perHoSalary;
    return {
      currentAmount,
      type,
      Amount,
      allowance,
      bonus,
    };
  }
  if (staff.business.salaryType === 'NormalMonth') {
    if (salaryType === 'Monthly') {
      const perDaySalary = await getPerDaySalary(salary, 30);
      const currentDate = await getpreviewsDaysAndCurrentDaysDiff(salaryCycle);
      const currentAmount = (await currentDate) * perDaySalary;
      const { allowance, bonus } = await getTotalalloBonus(id);
      const { type, Amount } = staff.Payment;
      return {
        currentAmount,
        type,
        Amount,
        allowance,
        bonus,
      };
    }
  } else if (salaryType === 'Monthly') {
    const nextMonth = await moment(salaryCycle).add(1, 'months');
    const totalDays = await moment(nextMonth).diff(salaryCycle, 'days');
    const perDaySalary = await getPerDaySalary(salary, totalDays);
    const currentAmount = perDaySalary * (await getpreviewsDaysAndCurrentDaysDiff(salaryCycle));
    const { allowance, bonus } = await getTotalalloBonus(id);
    const { type, Amount } = staff.Payment;
    return {
      currentAmount,
      type,
      Amount,
      allowance,
      bonus,
    };
  }
};

const allStaffSalaryStatus = async () => {
  let AdvancePayment = 0;
  let PendingPaymant = 0;
  let value;
  const array = await getAllStaffWhereStatusActive();
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line
    value = await getSalaryCalculationOfparticularStaff(array[i].id);
    if (value.type === 'Pending') {
      PendingPaymant += value.totalPending;
    } else if (value.pending) {
      PendingPaymant += value.pending;
    } else if (value.advance) {
      AdvancePayment += value.advance;
    }
  }
  if (AdvancePayment === 0) {
    return { PendingPaymant };
  }
  if (PendingPaymant === 0) {
    return { AdvancePayment };
  }
  if (AdvancePayment >= PendingPaymant) {
    AdvancePayment -= PendingPaymant;
    return { AdvancePayment };
  }
  if (PendingPaymant >= AdvancePayment) {
    PendingPaymant -= AdvancePayment;
    return { PendingPaymant };
  }
};

module.exports = {
  getstaffByid,
  getStaffbyidAndUpdate,
  createStaff,
  deleteStaffbyid,
  staffStatus,
  getallStaff,
  getSalaryCalculationOfparticularStaff,
  getTotalSalaryCalculationOfparticularStaff,
  allStaffSalaryStatus,
};

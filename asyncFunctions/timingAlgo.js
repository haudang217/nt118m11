//tinh toan ngay chu nhat tiep theo
const calcNextSunday = () => {
  const dayINeed = 7; // chu nhat
  const today = moment().isoWeekday();

  if (today <= dayINeed) {
    return moment().isoWeekday(dayINeed).format("MM/DD/YYYY");
  } else {
    return moment().add(1, "weeks").isoWeekday(dayINeed).format("MM/DD/YYYY");
  }
};

//tinh toan task cho moi ngay tu min va max. vd: 5,4,3,2,1...
const calcRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

//phan chia task
const timingAlgo = ({ taskArr, maxTask, minTask }) => {
  //tinh ngay, thang cua chu nhat tiep theo
  let nextSunday = calcNextSunday();
  const nextMonth = nextSunday.toString().split("/")[0];
  const nextDate = nextSunday.toString().split("/")[1];

  //tinh so pomodoro moi ngay user can lam
  const taskDateArr = calcRange(minTask, maxTask);

  //dem xem trong tuan do user lam duoc bao nhieu task
  let userWeekTask = 0;
  taskDateArr.forEach((element) => {
    userWeekTask += element;
  });

  //tinh xem so task CO DEADLINE TRUOC CUOI TUAN co bao nhieu pomodoro
  let weekTaskPomodoro = 0;

  taskArr.forEach((element) => {
    const eleDate = element.deadline.split("/")[1];
    const eleMonth = element.deadline.split("/")[0];
    if (eleDate <= nextDate && eleMonth <= nextMonth) {
      weekTaskPomodoro += element.pomodoroPeriod - element.done;
    }
  });

  //neu so task can lam trong tuan > so task user co the lam
  //thi bat user tang so task moi ngay len
  if (weekTaskPomodoro > userWeekTask) return false;

  //neu nhu so task can lam trong tuan be hon so task user co the lam duoc
  //thi tiep tuc chia

  //neu nhung viec ko phai deadline tuan nay, ma la ngay t2 tuan sau thi sao?
  //neu nhung viec ko phai deadline tuan nay, ma tuan sau lam ko kip thi sao?
  //solution:
  //chia lam 2 truong hop:
  //- truong hop so task it hon thoi gian con lai, trra ve va bat user tang task len
  //- truong hop so task nhieu hon thoi gian con lai, tinh sau

  //tim cac task co kha nang khong kip deadline
};

module.exports = timingAlgo;

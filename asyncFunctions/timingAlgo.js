//tinh toan ngay chu nhat tiep theo
const moment = require("moment");

//tinh toan task cho moi ngay tu min va max. vd: 5,4,3,2,1...
const calcRange = (start, end) => {
  let arr = new Array(parseInt(end - start) + 1)
    .fill()
    .map((_, idx) => parseInt(start) + idx);

  if (arr.length < 7) {
    let index = 7 - arr.length;
    let lastItem = arr[arr.length - 1];
    let prevLastItem = arr[arr.length - 2];
    arr[5] = prevLastItem;
    arr[6] = lastItem;

    for (let i = 0; i < index; i++) {
      arr[4 - i] = arr[5];
    }
  }
  return arr;
};

let taskArr = [
  {
    name: "taskA",
    deadline: "2021-11-28",
    pomodoroPeriod: 3,
    done: 0,
    startDay: "",
    endDay: "",
    toFinish: 0,
  },
  {
    name: "taskB",
    deadline: "2021-12-28",
    pomodoroPeriod: 5,
    done: 0,
    startDay: "",
    endDay: "",
    toFinish: 0,
  },
];

let maxTask = 5;
let newMaxTask = 0;
let minTask = 1;
let userDateRange = [7, 6, 1, 5, 3, 0];
//phan chia task

const timingAlgo = (/*taskArr, maxTask, minTask, userDateRange*/) => {
  //1. tinh tong so pomodoro cho toi 1 deadline gan nhat

  //sort mang, sap xep ngay deadline tang dan
  var sortedTask = taskArr.slice(0);

  sortedTask.sort((a, b) => {
    return (
      parseInt(a.deadline.replace(/-/g, "")) -
      parseInt(b.deadline.replace(/-/g, ""))
    );
  });

  newMaxTask = maxTask;

  //tinh toan xem deadline gan nhat roi vao thu may
  //tinh toan ngay hien tai la ngay bao nhieu
  let thisDay = moment(new Date(), "YYYY-MM-DD");
  let nearestDeadline = moment(new Date()).format("YYYY-MM-DD");
  let flag = 0;

  do {
    //lap de lay deadline gan nhat
    //tinh toan so luong pomodoro cho moi ngay

    sortedTask.forEach((task) => {
      //tinh day of week cua deadline gan nhat
      let pomodoroRange = calcRange(minTask, newMaxTask);

      nearestDeadline = moment(task.deadline, "YYYY-MM-DD");

      let pomodoroTilThisDay = 0;
      //A. tinh toan so pomodoro cho den deadline gan nhat
      let curRangeDate = moment(thisDay, "YYYY-MM-DD");

      while (curRangeDate.isBefore(nearestDeadline)) {
        curRangeDate = moment(curRangeDate).add(1, "day");
        let curWeekDate = moment(curRangeDate).isoWeekday();
        pomodoroTilThisDay += pomodoroRange[curWeekDate - 1];
      }

      //B. so sanh voi task co deadline gan nhat
      let pomodoroLeft = task.pomodoroPeriod - task.done;

      //neu THIEU thoi gian
      if (pomodoroLeft > pomodoroTilThisDay) {
        newMaxTask += 1; //tang gia tri task toi da len de kip tien do
        flag = 1;
        return;
      }

      //neu DU thoi gian
      else if (pomodoroLeft === pomodoroTilThisDay) {
        flag = 0;
        task.startDay = thisDay.format("YYYY-MM-DD");
        task.endDay = nearestDeadline.format("YYYY-MM-DD");

        //day this day thanh ngay deadline toi
        thisDay = nearestDeadline;
        return;
      }
      //neu THUA thoi gian
      else if (pomodoroLeft < pomodoroTilThisDay) {
        let remainder = 0;

        let nextDate = moment(thisDay, "YYYY-MM-DD");

        while (nextDate.isBefore(nearestDeadline)) {
          nextDate = nextDate.add(1, "days");
          let nextWeekDate = moment(nextDate).isoWeekday();
          remainder += pomodoroRange[nextWeekDate - 1];
          //2 truong hop: thua chan va thua le
          //doi voi thua chan (vua het ngay)
          if (remainder == pomodoroLeft) {
            task.startDay = thisDay.format("YYYY-MM-DD");
            task.endDay = nextDate.format("YYYY-MM-DD");
            thisDay = nextDate.add(1, "days");
            return;
          }
          //doi voi truong hop thua le
          if (remainder > pomodoroLeft) {
            task.startDay = thisDay.format("YYYY-MM-DD");
            task.endDay = nextDate.format("YYYY-MM-DD");
            thisDay = nextDate.add(1, "days");
            return;
          }
        }
      }
    });
  } while (flag === 1); //neu bat co len tuc la co van de, chua du thoi gian

  console.log(sortedTask);
  console.log("------------------------");
  console.log(newMaxTask);
};

module.exports = timingAlgo;

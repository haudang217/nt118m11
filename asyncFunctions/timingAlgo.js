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
  let arr = new Array(end - start + 1).fill().map((_, idx) => start + idx);

  if (arr.length < 8) {
    let index = 8 - arr.length;
    let lastItem = arr[arr.length - 1];
    let prevLastItem = arr[arr.length - 2];
    arr[6] = prevLastItem;
    arr[7] = lastItem;
    console.log("arr[6]: ");
    console.log(arr);

    for (let i = 0; i < index; i++) {
      arr[5 - i] = arr[6];
    }
  }
  return arr;
};

let taskArr = [
  { name: "taskA", deadline: "12182021" },
  { name: "taskB", deadline: "12222021" },
  { name: "taskC", deadline: "11242021" },
  { name: "taskD", deadline: "12192021" },
  { name: "taskE", deadline: "11252021" },
];

let maxTask = 5;
let minTask = 1;
let userDateRange = [7, 6, 1, 5, 4, 2, 3, 0];
//phan chia task
const timingAlgo = (/*taskArr, maxTask, minTask, userDateRange*/) => {
  //1. tinh tong so pomodoro cho toi 1 deadline gan nhat

  //sort mang, sap xep ngay deadline tang dan
  var sortedTask = taskArr.slice(0);
  sortedTask.sort((a, b) => {
    return parseInt(a.deadline) - parseInt(b.deadline);
  });

  //tinh toan so luong pomodoro cho moi ngay
  let pomodoroRange = calcRange(1, 7);
  console.log(pomodoroRange);
};

module.exports = timingAlgo;

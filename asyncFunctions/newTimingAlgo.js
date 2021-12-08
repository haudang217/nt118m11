const moment = require("moment");

let taskArr = [
  {
    name: "taskA",
    deadline: "2021-12-10Tjwbfdwjefw",
    pomodoroPeriod: 25,
    done: 0,
    startDay: "",
    endDay: "",
    taskPerDay: 0,
    toFinish: 0,
  },
  {
    name: "taskB",
    deadline: "2021-12-28Tsjfnklnwefwe",
    pomodoroPeriod: 5,
    done: 0,
    startDay: "",
    endDay: "",
    toFinish: 0,
    taskPerDay: 0,
  },
];

const newTimingAlgo = (maxTask) => {
  //sap xep cac task theo deadline gap nhat truoc
  console.log("runnin ....");
  let sortedTask = taskArr.slice(0);
  sortedTask.sort((a, b) => {
    return (
      parseInt(a.deadline.split("T")[0].replace(/-/g, "")) -
      parseInt(b.deadline.split("T")[0].replace(/-/g, ""))
    );
  });

  sortedTask.map((task) => (task.taskPerDay = maxTask));

  let startDay = moment(new Date()).format("YYYY-MM-DD");
  let nearestDeadline = moment(new Date()).format("YYYY-MM-DD");
  //lap qua tung task; kiem tra xem tu day den do co du thoi gian khong, neu khong thi tang len; neu du thi set thoi gian
  let flag = true;

  sortedTask.map((task, i) => {
    let pomodoroTilDeadline = 0;
    let pomodoroTaskLeft = task.pomodoroPeriod - task.done;
    let counter = 0; //dem ngay

    nearestDeadline = moment(task.deadline.split("T")[0]).format("YYYY-MM-DD");
    let StartDayBuffer = parseInt(startDay.split("T")[0].replace(/-/g, ""));
    while (
      StartDayBuffer < parseInt(nearestDeadline.split("T")[0].replace(/-/g, ""))
    ) {
      StartDayBuffer += 1;
      console.log(
        "start at: " + StartDayBuffer + "; end at: " + nearestDeadline
      );
      counter++;

      pomodoroTilDeadline += task.taskPerDay;

      if (pomodoroTaskLeft <= pomodoroTilDeadline) {
        task.startDay = moment(startDay).toISOString();
        console.log("counter: " + counter);
        task.endDay = moment(startDay).add(counter, "days").toISOString();
        startDay = task.endDay;
        break;
      }
    }

    //thoat khoi vong lap roi ma van chua du
    if (pomodoroTaskLeft > pomodoroTilDeadline) {
      flag = false;
      return flag;
    }
  });

  sortedTask.map((task) => console.log(task));

  return flag;
};

module.exports = newTimingAlgo;

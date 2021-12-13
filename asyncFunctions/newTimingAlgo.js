const moment = require("moment");

const newTimingAlgo = (maxTask, taskArr) => {
  let sortedTask = taskArr.slice(0);

  const instanceToday = moment(new Date()).format("YYYY-MM-DD");
  console.log("today is: " + instanceToday);

  sortedTask.filter((a, b) => {
    return (
      parseInt(a.deadline.split("T")[0].replace(/-/g, "")) >
      parseInt(instanceToday.replace(/-/g, ""))
    );
  });

  sortedTask.sort((a, b) => {
    return b.importantRate - a.importantRate;
  });
  sortedTask.sort((a, b) => {
    return (
      parseInt(a.deadline.split("T")[0].replace(/-/g, "")) -
      parseInt(b.deadline.split("T")[0].replace(/-/g, ""))
    );
  });

  sortedTask.map((task) => (task.taskPerDay = maxTask));

  let startDay = moment(new Date()).format("YYYY-MM-DD");
  let nearestDeadline = moment(new Date()).format("YYYY-MM-DD");
  let flag = true;

  sortedTask.map((task) => {
    let pomodoroTilDeadline = 0;
    let pomodoroTaskLeft = task.pomodoroPeriod - task.done;
    let counter = 0;

    let StartDayBuffer = parseInt(startDay.split("T")[0].replace(/-/g, ""));
    nearestDeadline = parseInt(
      moment(task.deadline.split("T")[0]).format("YYYY-MM-DD").replace(/-/g, "")
    );

    while (StartDayBuffer <= nearestDeadline) {
      StartDayBuffer += 1;
      counter += 1;
      pomodoroTilDeadline += task.taskPerDay;

      if (pomodoroTaskLeft <= pomodoroTilDeadline) {
        task.startDay = moment(startDay).toISOString();
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

  if (flag === true) return sortedTask;
  return flag;
};

module.exports = newTimingAlgo;

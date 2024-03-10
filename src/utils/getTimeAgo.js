export const getTimeAgo = (rootTime) => {
    const currDate = new Date();
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    let milliseconds = Math.abs(currDate - rootTime);
    // Nên tính từ days trước
    
    while (milliseconds >= 1000) {
      milliseconds -= 1000;
      seconds += 1;
      if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
        if (minutes >= 60) {
          minutes -= 60;
          hours += 1;
          if (hours >= 24) {
            hours -= 24;
            days += 1;
          }
        }
      }
    }
    let timeAgo;
    if (days > 0) {
      timeAgo = days + " ngày trước";
    } else if (hours > 0) {
      timeAgo = hours + " giờ trước";
    } else if (minutes > 0) {
      timeAgo = minutes + " phút trước";
    } else {
      timeAgo = "Vừa mới gửi";
    }
    
    return timeAgo
  }
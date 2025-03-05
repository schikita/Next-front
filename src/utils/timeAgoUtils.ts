export const timeAgo = (date: string): string => {
    const now = new Date();
    const newsDate = new Date(date);
    const diffInMs = now.getTime() - newsDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
  
    if (diffInMinutes < 1) {
      return "только что";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${getMinuteLabel(diffInMinutes)} назад`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} ${getHourLabel(diffInHours)} назад`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} ${getDayLabel(diffInDays)} назад`;
    }
  };
  
  // Функции для склонения слов "минута", "час", "день"
  const getMinuteLabel = (minutes: number): string => {
    if (minutes === 1 || (minutes > 20 && minutes % 10 === 1)) return "минуту";
    if ((minutes >= 2 && minutes <= 4) || (minutes > 20 && [2, 3, 4].includes(minutes % 10))) return "минуты";
    return "минут";
  };
  
  const getHourLabel = (hours: number): string => {
    if (hours === 1 || (hours > 20 && hours % 10 === 1)) return "час";
    if ((hours >= 2 && hours <= 4) || (hours > 20 && [2, 3, 4].includes(hours % 10))) return "часа";
    return "часов";
  };
  
  const getDayLabel = (days: number): string => {
    if (days === 1 || (days > 20 && days % 10 === 1)) return "день";
    if ((days >= 2 && days <= 4) || (days > 20 && [2, 3, 4].includes(days % 10))) return "дня";
    return "дней";
  };
  
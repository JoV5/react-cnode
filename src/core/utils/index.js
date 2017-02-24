export const MathFloor = Math.floor;

export function timeago(date) {
  date = new Date(date);
  const dateYear = date.getFullYear();
  const dateMonths = date.getMonth() + dateYear * 12; // 计算总月数
  const time = date.getTime();
  const curDate = new Date();
  const curDateYear = curDate.getFullYear();
  const curDateMonths = curDate.getMonth() + curDateYear * 12; // 计算总月数
  const curTime = curDate.getTime();
  const deltaTime = MathFloor((curTime - time) / 1000); // 转为秒

  if (curDateMonths - dateMonths >= 12) {
    return `${Math.floor((curDateMonths - dateMonths) / 12)}年前`;
  } else if (curDateMonths > dateMonths) {
    return `${curDateMonths - dateMonths}个月前`;
  } else {
    if (deltaTime < 60) {
      return `${deltaTime}秒前`;
    } else if (deltaTime < 3600) {
      return `${MathFloor(deltaTime / 60)}分钟前`;
    } else if (deltaTime < 86400) {
      return `${MathFloor(deltaTime / 3600)}小时前`;
    } else if (deltaTime < 604800) {
      return `${MathFloor(deltaTime / 86400)}天前`;
    } else {
      return `${MathFloor(deltaTime / 604800)}周前`;
    }
  }
}
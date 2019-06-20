 /**
 * 图片预加载
 * @param arr
 * @constructor
 */
export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}

/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
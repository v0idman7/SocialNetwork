export const checkPosition = (e: Element, cb: (page: number) => void) => {
  let currentPage = 2;
  return () => {
    const scrolled = e.scrollTop;
    const height = e.scrollHeight;
    const screenHeight = e.clientHeight;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;
    if (position >= threshold) {
      cb(currentPage);
      currentPage += 1;
    }
  };
};

export const throttle = (callee: (...args: any[]) => void, timeout: number) => {
  let timer: null | NodeJS.Timeout = null;

  return (...args: any[]) => {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
};

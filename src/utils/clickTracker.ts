import Cookies from 'js-cookie';

const COOKIE_KEY = 'jobClickCount';
const MAX_COUNT = 5;

export async function handleJobCardClick() {
  const current = parseInt(Cookies.get(COOKIE_KEY) || '0', 10);
  const newCount = current + 1;

  if (newCount >= MAX_COUNT) {
    try {
      // TODO: API 호출
      // await 함수명();
      Cookies.remove(COOKIE_KEY);
    } catch (err) {
      console.error('API 호출 실패:', err);
    }
  } else {
    Cookies.set(COOKIE_KEY, newCount.toString(), { expires: 1 }); // 1일 유효
  }
}

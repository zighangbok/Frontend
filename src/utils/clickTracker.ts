import Cookies from 'js-cookie';
import { postRecruitmentRerank } from '@/apis/recruit';

const COOKIE_KEY = 'jobClickUuids';
const MAX_COUNT = 5;

export async function handleJobCardClick(uuid: string) {
  const stored = Cookies.get(COOKIE_KEY);
  const uuidList: string[] = stored ? JSON.parse(stored) : [];

  uuidList.push(uuid);

  if (uuidList.length >= MAX_COUNT) {
    try {
      await postRecruitmentRerank(uuidList);
      Cookies.remove(COOKIE_KEY);
    } catch (err) {
      console.error('리랭크 API 호출 실패:', err);
    }
  } else {
    Cookies.set(COOKIE_KEY, JSON.stringify(uuidList), { expires: 1 });
  }
}

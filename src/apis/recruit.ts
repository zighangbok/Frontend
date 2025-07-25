import { axiosInstance } from '@/lib/axios';
import { SimpleRecruit } from '@/types/recruit';
import Cookies from 'js-cookie';

// 일반 공고 불러오기
export async function getRecruitmentSimpleList(
  page = 0,
  size = 30,
): Promise<SimpleRecruit[]> {
  const res = await axiosInstance.get('/recruitments/simple-list', {
    params: {
      page,
      size,
    },
  });
  return res.data;
}

// 추천 공고 불러오기
export async function getRecruitmentRecommendationList(): Promise<
  SimpleRecruit[]
> {
  const userId = Cookies.get('userId');
  if (!userId) {
    throw new Error('User not logged in');
  }

  const res = await axiosInstance.get('/recruitments/recommendations', {
    params: {
      userId,
    },
  });
  return res.data;
}

// 공고 5회 클릭시 api 호출
export async function postRecruitmentRerank(uuids: string[]) {
  const userId = Cookies.get('userId');
  if (!userId) {
    throw new Error('User not logged in');
  }

  const res = await axiosInstance.post('/recruitments/recommendations/rerank', {
    userId,
    samples: uuids,
  });
  return res.data;
}

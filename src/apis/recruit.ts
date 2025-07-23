import { axiosInstance } from '@/lib/axios';
import { SimpleRecruit } from '@/types/recruit';

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
  const res = await axiosInstance.get('/recruitments/recommendations');
  return res.data;
}

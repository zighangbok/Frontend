export interface RecruitCardData {
  company: string;
  companyImage: string; // 기업 로고 또는 이미지 URL
  title: string;
  experience: string;
  type: string; // 정규직, 계약직 등
  location: string;
  views: number;
  isBookmarked: boolean;
  isWanted: boolean;
  isNew: boolean;
  status: '디데이' | '상시' | '채용시 마감';
  dDay?: string; // 'D-10', 'D+2' 등
}

export interface SimpleRecruit {
  uuid: string;
  title: string;
  companyName: string;
}

export const WANTED_URL = 'https://www.wanted.co.kr/wd';
export const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
export const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
export const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
console.log(REST_API_KEY);

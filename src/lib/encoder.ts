import LZString from 'lz-string';
import { MandalaData, createEmptyMandala } from '@/types/mandala';

// 만다라트 데이터를 URL-safe 문자열로 인코딩
export function encodeMandalaData(data: MandalaData): string {
  try {
    const jsonString = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    return compressed;
  } catch (error) {
    console.error('Failed to encode mandala data:', error);
    return '';
  }
}

// URL-safe 문자열을 만다라트 데이터로 디코딩
export function decodeMandalaData(encoded: string): MandalaData | null {
  try {
    if (!encoded) return null;

    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;

    const data = JSON.parse(decompressed);

    // 유효성 검사
    if (!Array.isArray(data) || data.length !== 81) {
      return null;
    }

    return data as MandalaData;
  } catch (error) {
    console.error('Failed to decode mandala data:', error);
    return null;
  }
}

// URL에서 만다라트 데이터 파라미터 키
export const URL_PARAM_KEY = 'd';

// URL에서 만다라트 데이터 읽기
export function getMandalaDataFromUrl(): MandalaData {
  if (typeof window === 'undefined') {
    return createEmptyMandala();
  }

  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(URL_PARAM_KEY);

  if (!encoded) {
    return createEmptyMandala();
  }

  const decoded = decodeMandalaData(encoded);
  return decoded || createEmptyMandala();
}

// 만다라트 데이터로 공유 URL 생성
export function createShareUrl(data: MandalaData): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const encoded = encodeMandalaData(data);
  const url = new URL(window.location.origin);
  url.searchParams.set(URL_PARAM_KEY, encoded);

  return url.toString();
}

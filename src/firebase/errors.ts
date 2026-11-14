import { auth } from './config';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function formatFriendlyFirebaseError(error: unknown): {
  message: string;
  needsEmailAuthConsoleSetup?: boolean;
} {
  const raw = error instanceof Error ? error.message : String(error);

  if (raw.includes('auth/email-already-in-use')) {
    return { message: '이미 가입된 이메일 주소입니다. 로그인 탭에서 로그인해 주세요.' };
  }
  if (raw.includes('auth/wrong-password') || raw.includes('auth/invalid-credential')) {
    return { message: '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.' };
  }
  if (raw.includes('auth/user-not-found')) {
    return { message: '등록되지 않은 이메일 계정입니다. 먼저 회원가입을 진행해 주세요.' };
  }
  if (raw.includes('auth/weak-password')) {
    return { message: '비밀번호는 최소 6자 이상으로 설정해야 합니다.' };
  }
  if (raw.includes('auth/invalid-email')) {
    return { message: '유효한 이메일 주소 형식이 아닙니다.' };
  }
  if (raw.includes('auth/popup-closed-by-user')) {
    return { message: 'Google 로그인 창이 닫혔습니다. 다시 시도해 주세요.' };
  }
  if (raw.includes('auth/unauthorized-domain')) {
    return {
      message:
        '현재 접속 도메인(예: github.io)이 Firebase 승인된 도메인에 아직 등록되지 않았습니다. Firebase Console → Authentication → Settings → 승인된 도메인에 현재 도메인을 추가해 주세요.',
    };
  }
  if (raw.includes('auth/operation-not-allowed')) {
    return {
      message:
        'Firebase 콘솔에서 이메일/비밀번호 로그인 방식이 아직 활성화되지 않았습니다. Google 로그인으로 바로 시작하거나 Firebase 콘솔 → Authentication → Sign-in method에서 이메일/비밀번호를 활성화해 주세요.',
      needsEmailAuthConsoleSetup: true,
    };
  }
  if (raw.includes('Quota exceeded')) {
    return {
      message:
        'Firestore 무료 일일 사용량을 초과했습니다. 내일 다시 초기화되며 Firebase 요금제에서 자세한 내용을 확인할 수 있습니다.',
    };
  }
  if (raw.includes('Missing or insufficient permissions') || raw.includes('permission-denied')) {
    return {
      message: '데이터 접근 권한이 없거나 보안 규칙에 의해 차단되었습니다. 다시 로그인 후 시도해 주세요.',
    };
  }

  return {
    message: '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  };
}

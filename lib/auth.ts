interface Credentials {
  email: string;
  password: string;
}

interface AuthSuccess {
  success: true;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

interface AuthError {
  success: false;
  error: string;
}

type AuthResult = AuthSuccess | AuthError;

const VALID_CREDENTIALS = {
  email: 'admin',
  password: '123123'
};

export function authenticate(credentials: Credentials): AuthResult {
  // 添加日志以便调试
  console.log('Attempting login with:', {
    input: credentials,
    valid: VALID_CREDENTIALS,
    matches: {
      email: credentials.email === VALID_CREDENTIALS.email,
      password: credentials.password === VALID_CREDENTIALS.password
    }
  });

  // 去除可能的空格，并进行严格比较
  if (
    credentials.email.trim() === VALID_CREDENTIALS.email &&
    credentials.password === VALID_CREDENTIALS.password
  ) {
    return {
      success: true,
      user: {
        name: 'Admin',
        email: credentials.email,
        role: 'admin'
      }
    };
  }
  
  return {
    success: false,
    error: '账号或密码错误'
  };
} 
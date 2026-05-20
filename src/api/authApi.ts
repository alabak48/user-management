interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  status: number
}

const generateToken = (user: { id: number; email: string }): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  )
  return `${header}.${payload}.fake-signature`
}

export const loginApi = (credentials: LoginCredentials): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === "admin@admin.com" && credentials.password === "admin123") {
        resolve({
          status: 200,
          token: generateToken({
            id: 1,
            email: credentials.email,
          }),
        })
      } else {
        reject({
          response: {
            status: 401,
            data: {
              message: "Invalid Credentials",
            },
          },
        })
      }
    }, 1000)
  })
}

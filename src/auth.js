export const Base_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${Base_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

    .then((res) => {
      if (!res.ok) {
        throw new Error('Register Error');
      }
      return res.json();
    });
};



export const authorize = (email, password) => {
  return fetch(`${Base_URL}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    .then((res) => {
      if (!res.ok) {
        throw new Error('authorize Error');
      }
      return res.json();
    })

    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        console.log(data)
        return data
        
      }
    })
}




export const tokenCheck = (token) => {
  return fetch(`${Base_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

    .then((res) => {
      return res.json();
    });

}
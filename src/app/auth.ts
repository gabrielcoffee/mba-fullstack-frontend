const BASE_URL = 'https://mba-fullstack-backend.onrender.com';

export const login = async (email: string, password: string) => {
    console.log('Tentando login com:', { email, password });
    console.log('URL:', `${BASE_URL}/auth/login`);
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    console.log('Status da resposta:', response.status);
    console.log('Headers da resposta:', response.headers);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta:', errorText);
        throw new Error(`Login inválido: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Dados da resposta:', data);
    
    localStorage.setItem('authToken', data.token);
    return data;
};

export const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
};

export const getAuthToken = () => localStorage.getItem('authToken');

export const isAuthenticated = () => !!getAuthToken(); 
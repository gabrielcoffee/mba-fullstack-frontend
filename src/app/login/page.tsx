'use client';

import { useState } from 'react';
import { login, isAuthenticated } from '../auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Se já estiver autenticado, redireciona para /produtos
    if (typeof window !== 'undefined' && isAuthenticated()) {
        window.location.href = '/produtos';
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            window.location.href = '/produtos';
        } catch (err) {
            setError('E-mail ou senha inválidos');
        }
    };

    return (
        <div style={styles.root}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Acesse sua conta</h2>
                <label style={styles.label}>E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail cadastrado" style={styles.input} required />
                <label style={styles.label}>Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha de acesso" style={styles.input} required />
                {error && <div style={styles.error}>{error}</div>}
                <button type="submit" style={styles.buttonFilled}>
                    Acessar
                </button>
                <button type="button" style={styles.buttonOutline} onClick={() => window.location.href = '/produtos/cadastro'}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

const styles = {
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#faf9f9',
    },
    form: {
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        minWidth: 320,
        boxShadow: '0 2px 8px #0001',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 16,
    },
    title: {
        margin: 0,
        fontSize: 24,
        fontWeight: 700,
        color: '#222',
    },
    label: {
        fontWeight: 500,
        fontSize: 14,
        color: '#444',
    },
    input: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 6,
        background: '#fff',
        color: '#222',
        fontSize: 16,
        fontWeight: 400,
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const,
    },
    error: {
        color: '#DC3545',
        fontWeight: 500,
        fontSize: 14,
        margin: '4px 0',
    },
    buttonFilled: {
        marginTop: 12,
        padding: 12,
        background: '#F24D0D',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
    },
    buttonOutline: {
        padding: 12,
        background: '#fff',
        color: '#F24D0D',
        border: '2px solid #F24D0D',
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
    },
};
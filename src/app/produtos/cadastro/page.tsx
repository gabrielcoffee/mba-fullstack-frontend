'use client';

import { useState } from 'react';
import { isAuthenticated } from '../../auth';

const BASE_URL = 'https://mba-fullstack-backend.onrender.com';

interface FormData {
    title: string;
    description: string;
    category: string;
    price: string;
    imageFile?: File;
}

export default function CadastroProdutosPage() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (typeof window !== 'undefined' && !isAuthenticated()) {
        window.location.href = '/login';
        return null;
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`${BASE_URL}/products/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erro no upload da imagem');
        }
        
        const data = await response.json();
        return data.imageUrl;
    };

    const createProduct = async (productData: any) => {
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao cadastrar produto');
        }
        
        return await response.json();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            let imageUrl = '';
            
            // 1. Upload da imagem se foi selecionada
            if (formData.imageFile) {
                imageUrl = await uploadImage(formData.imageFile);
            }
            
            // 2. Preparar dados do produto
            const productData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price) || 0,
                imageUrl: imageUrl,
                status: 'active'
            };
            
            // 3. Cadastrar produto
            await createProduct(productData);
            
            setSuccess(true);
            
            // 4. Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = '/produtos';
            }, 2000);
            
        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            setError('Erro ao cadastrar produto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | File) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div style={styles.root}>
            <h2 style={styles.title}>Cadastrar produto</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>Nome do produto</label>
                <input 
                    type="text" 
                    placeholder="Digite o nome" 
                    style={styles.input}
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                />

                <label style={styles.label}>Descrição</label>
                <textarea 
                    placeholder="Digite a descrição" 
                    style={styles.textarea}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                />

                <label style={styles.label}>Categoria</label>
                <input 
                    type="text" 
                    placeholder="Digite a categoria" 
                    style={styles.input}
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                />

                <label style={styles.label}>Preço</label>
                <input 
                    type="number" 
                    placeholder="Digite o preço" 
                    style={styles.input}
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    step="0.01"
                    min="0"
                    required
                />

                <label style={styles.label}>Imagem</label>
                <input 
                    type="file" 
                    style={styles.inputFile}
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleInputChange('imageFile', file);
                        }
                    }}
                />

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={styles.success}>
                        Produto cadastrado com sucesso! Redirecionando...
                    </div>
                )}

                <button 
                    type="submit" 
                    style={styles.buttonFilled}
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Salvar'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    root: {
        minHeight: '100vh',
        background: '#faf9f9',
        padding: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: '#222',
        marginBottom: 24,
    },
    form: {
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        maxWidth: 420,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 16,
        boxShadow: '0 2px 8px #0001',
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
    textarea: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 6,
        background: '#fff',
        color: '#222',
        fontSize: 16,
        fontWeight: 400,
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const,
        minHeight: 80,
        resize: 'vertical' as const,
    },
    inputFile: {
        padding: 6,
        fontSize: 15,
    },
    error: {
        color: '#DC3545',
        fontWeight: 500,
        fontSize: 14,
        margin: '4px 0',
    },
    success: {
        color: '#28a745',
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
}; 
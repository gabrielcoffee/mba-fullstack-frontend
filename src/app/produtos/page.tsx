'use client';

import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';

const BASE_URL = 'https://mba-fullstack-backend.onrender.com';

interface Produto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
    status: string;
}

export default function ListaProdutosPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

    if (typeof window !== 'undefined' && !isAuthenticated()) {
        window.location.href = '/login';
        return null;
    }

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`${BASE_URL}/products`);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            setProdutos(data);
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
            setError('Erro ao carregar produtos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleMouseEnter = () => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 7000);
        setHoverTimer(timer);
    };

    const handleMouseLeave = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
        setShowTooltip(false);
    };

    const handleNovoProduto = () => {
        window.location.href = '/produtos/cadastro';
    };

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <h2 style={styles.title}>Seus produtos</h2>
                <div style={styles.buttonContainer}>
                    <button 
                        style={styles.novoProdutoBtn}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleNovoProduto}
                    >
                        + Novo produto
                    </button>
                    {showTooltip && (
                        <div style={styles.tooltip}>
                            Tá esperando o quê? Boraa moeer!! 🚀
                        </div>
                    )}
                </div>
            </div>
            <div style={styles.filtros}>
                <input type="text" placeholder="Filtrar por nome" style={styles.inputFiltro} />
                <select style={styles.inputFiltro}>
                    <option value="">Status</option>
                    <option value="Anunciado">Anunciado</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Desativado">Desativado</option>
                </select>
            </div>
            
            {loading && (
                <div style={styles.loading}>
                    Carregando produtos...
                </div>
            )}
            
            {error && (
                <div style={styles.error}>
                    {error}
                    <button onClick={carregarProdutos} style={styles.retryBtn}>
                        Tentar novamente
                    </button>
                </div>
            )}
            
            {!loading && !error && produtos.length === 0 && (
                <div style={styles.empty}>
                    Nenhum produto encontrado.
                </div>
            )}
            
            {!loading && !error && produtos.length > 0 && (
                <div style={styles.grid}>
                    {produtos.map(produto => (
                        <div key={produto.id} style={styles.card}>
                            <img 
                                src={produto.imageUrl ? `${BASE_URL}${produto.imageUrl}` : 'https://via.placeholder.com/400x200?text=Sem+imagem'} 
                                alt={produto.title} 
                                style={styles.cardImg}
                                onError={(e) => {
                                    console.log('Erro ao carregar imagem:', produto.imageUrl);
                                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Imagem+não+encontrada';
                                }}
                            />
                            <div style={styles.cardBody}>
                                <div style={styles.cardTitulo}>{produto.title}</div>
                                <div style={styles.cardCategoria}>{produto.category}</div>
                                <div style={styles.cardPreco}>R$ {produto.price}</div>
                                <div style={styles.cardDescricao}>{produto.description}</div>
                                <div style={styles.cardStatus}>{produto.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    root: {
        padding: 32,
        background: '#faf9f9',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: '#222',
        margin: 0,
    },
    buttonContainer: {
        position: 'relative' as const,
    },
    novoProdutoBtn: {
        background: '#F24D0D',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '10px 20px',
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
    },
    tooltip: {
        position: 'absolute' as const,
        top: '100%',
        right: 0,
        background: '#333',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: 6,
        fontSize: 14,
        whiteSpace: 'nowrap' as const,
        zIndex: 1000,
        marginTop: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    filtros: {
        display: 'flex',
        gap: 12,
        marginBottom: 24,
    },
    inputFiltro: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 6,
        fontSize: 15,
        background: '#fff',
        color: '#222',
        minWidth: 160,
    },
    loading: {
        textAlign: 'center' as const,
        padding: 40,
        fontSize: 18,
        color: '#666',
    },
    error: {
        textAlign: 'center' as const,
        padding: 40,
        color: '#DC3545',
        fontSize: 16,
    },
    retryBtn: {
        marginLeft: 12,
        padding: '8px 16px',
        background: '#F24D0D',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
    empty: {
        textAlign: 'center' as const,
        padding: 40,
        fontSize: 16,
        color: '#666',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
    },
    card: {
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px #0001',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    cardImg: {
        width: '100%',
        height: 140,
        objectFit: 'cover' as const,
    },
    cardBody: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 6,
    },
    cardTitulo: {
        fontWeight: 700,
        fontSize: 18,
        color: '#222',
    },
    cardCategoria: {
        fontSize: 13,
        color: '#F24D0D',
        fontWeight: 600,
    },
    cardPreco: {
        fontSize: 16,
        fontWeight: 700,
        color: '#28a745',
    },
    cardDescricao: {
        fontSize: 14,
        color: '#444',
    },
    cardStatus: {
        fontSize: 12,
        color: '#666',
        fontWeight: 500,
    },
}; 
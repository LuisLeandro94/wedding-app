'use client';

import { sendRequestEmailAction } from '@/app/actions/sendRequestEmailAction';
import { PlusCircle, X } from 'lucide-react';
import { useState, useTransition } from 'react';

type Props = {
    email: string;
};

export default function RequestChangeButton({ email }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const closeModal = () => {
        if (isPending) return;
        setIsOpen(false);
        setDescription('');
        setError('');
        setSuccess('');
    };

    const handleSubmit = () => {
        setError('');
        setSuccess('');

        startTransition(async () => {
            try {
                await sendRequestEmailAction({
                    description,
                    email,
                });

                setSuccess('Pedido enviado com sucesso.');
                setDescription('');

                setTimeout(() => {
                    setIsOpen(false);
                    setSuccess('');
                }, 800);
            } catch {
                setError('Não foi possível enviar o pedido.');
            }
        });
    };

    return (
        <>
            <div
                className="pointer-events-none absolute bottom-4 right-4 z-60 hidden md:block"
                style={{
                    paddingTop: 'env(safe-area-inset-top)',
                    paddingLeft: 'env(safe-area-inset-left)',
                }}
            >
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-xl px-4 py-2 transition hover:opacity-90"
                    style={{ color: '#C8AB8B' }}
                    aria-label="Abrir pedido de alteração"
                >
                    <PlusCircle className="h-8 w-8" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-[#0D1017] p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">
                                Pedido de alteração
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-md p-1 text-white/70 transition hover:text-white"
                                aria-label="Fechar modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <label className="mb-2 block text-sm text-white/80">
                            Descreve a alteração pretendida
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            placeholder="Escreve aqui o pedido..."
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#C8AB8B]"
                        />

                        {error && (
                            <p className="mt-3 text-sm text-red-400">{error}</p>
                        )}

                        {success && (
                            <p className="mt-3 text-sm text-green-400">{success}</p>
                        )}

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={isPending}
                                className="rounded-xl border border-white/10 px-4 py-2 text-white transition hover:bg-white/5 disabled:opacity-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isPending || !description.trim()}
                                className="rounded-xl px-4 py-2 font-medium text-black transition disabled:opacity-50"
                                style={{ backgroundColor: '#C8AB8B' }}
                            >
                                {isPending ? 'A enviar...' : 'Submeter'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// GalaxySeatingR3F — immersive full screen with fade-in, centered focus, hover halo, upright labels, large popover guest list
// Palette: #0D1017 (space), #C8AB8B (sand)

import { Billboard, OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, Vector3 } from "three";

const COLORS = { space: "#0D1017", sand: "#C8AB8B" };

type Guest = { id: string; name: string };
type Table = { id: string; name: string; guests: Guest[]; seats?: number };

// ---------------- Galaxy helpers ----------------
function makeSpiralPoints(count: number, radius: number, arms: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const arm = i % arms;
        const t = Math.random() * 4.5 + arm * ((2 * Math.PI) / arms);
        const r = Math.sqrt(Math.random()) * radius;
        const x = Math.cos(t) * r + (Math.random() - 0.5) * 0.6;
        const y = (Math.random() - 0.5) * (radius * 0.08);
        const z = Math.sin(t) * r + (Math.random() - 0.5) * 0.6;
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

function useGalaxyGeometry(count: number, radius: number, arms: number) {
    return useMemo(() => makeSpiralPoints(count, radius, arms), [count, radius, arms]);
}

// ---------------- Galaxy ----------------
function Galaxy({
    table,
    position,
    focused,
    dimmed,
    hovered,
    onPointerOver,
    onPointerOut,
    onClick,
}: {
    table: Table;
    position: [number, number, number];
    focused: boolean;
    dimmed: boolean;
    hovered: boolean;
    onPointerOver: () => void;
    onPointerOut: () => void;
    onClick: () => void;
}) {
    const group = useRef<any>(null);
    const armCount = Math.min(5, Math.max(2, Math.round((table.seats ?? table.guests.length) / 8)));
    const starCount = Math.max(table.seats ?? table.guests.length, 140);
    const radius = Math.max(2.8, Math.min(6.0, 2 + (starCount / 140) * 4.0));

    const positions = useGalaxyGeometry(starCount, radius, armCount);

    useFrame((_, dt) => {
        if (!group.current) return;
        const base = focused ? 0.08 : 0.03;
        group.current.rotation.y += base * dt;
        group.current.rotation.z += base * 0.2 * dt;
    });

    const hitRadius = radius * 0.28;

    return (
        <group ref={group} position={position} scale={focused ? 1.15 : 1}>
            {/* invisible hit sphere to handle hover/click */}
            <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onPointerDown={onClick}>
                <sphereGeometry args={[hitRadius, 16, 16]} />
                <meshBasicMaterial transparent opacity={0.0001} depthWrite={false} depthTest={false} />
            </mesh>

            {/* visible halo only when hovered or focused */}
            {(hovered || focused) && (
                <mesh renderOrder={-1}>
                    <sphereGeometry args={[radius * 0.15, 24, 24]} />
                    <meshBasicMaterial
                        color={COLORS.sand}
                        transparent
                        opacity={focused ? 0.05 : 0.035}
                        depthWrite={false}
                        depthTest={false}
                    />
                </mesh>
            )}

            {/* core (non-interactive) */}
            <mesh raycast={undefined}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={COLORS.sand} />
            </mesh>

            {/* stars (non-interactive) */}
            <points raycast={undefined}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    attach="material"
                    size={0.033}
                    sizeAttenuation
                    color={COLORS.sand}
                    opacity={dimmed ? 0.12 : 0.95}
                    transparent
                    depthWrite={false}
                    blending={AdditiveBlending}
                />
            </points>

            {/* label almost touching core */}
            <Billboard follow>
                <Text position={[0, radius * 0.08, 0]} fontSize={0.36} color={COLORS.sand} anchorX="center" anchorY="middle">
                    {table.name}
                </Text>
            </Billboard>
        </group>
    );
}

// ---------------- Camera focus ----------------
function CameraFocus({ activePos, controlsRef }: { activePos: [number, number, number] | null; controlsRef: any }) {
    const { camera } = useThree();
    const target = useRef(new Vector3());
    useFrame(() => {
        if (!activePos) return;
        target.current.set(activePos[0], activePos[1], activePos[2]);
        camera.position.lerp(new Vector3(activePos[0], activePos[1] + 6, activePos[2] + 12), 0.06);
        camera.lookAt(target.current);
        if (controlsRef.current) {
            controlsRef.current.target.lerp(target.current, 0.08);
            controlsRef.current.update();
        }
    });
    return null;
}

// ---------------- Main component ----------------
export default function GalaxySeatingR3F({ tables }: { tables: Table[] }) {
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // lock body scroll for immersive full-screen
        document.body.style.overflow = "hidden";
        setTimeout(() => setFadeIn(true), 30);
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const layout = useMemo(() => {
        const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(tables.length))));
        const rows = Math.ceil(tables.length / cols);
        const gap = 8;
        return tables.map((t, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const x = (c - (cols - 1) / 2) * gap;
            const z = (r - (rows - 1) / 2) * gap;
            return { table: t, position: [x, 0, z] as [number, number, number] };
        });
    }, [tables]);

    const activePos = activeId ? layout.find((l) => l.table.id === activeId)?.position || null : null;
    const controlsRef = useRef<any>(null);
    const activeTable = activeId ? tables.find(t => t.id === activeId) || null : null;

    return (
        <div className={`fixed inset-0 w-full h-full transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} style={{ background: COLORS.space }}>
            {activeTable && (
                <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center p-4">
                    <div className="pointer-events-auto w-[min(720px,92vw)] rounded-2xl border bg-black/70 backdrop-blur-xl shadow-2xl p-6"
                        style={{ borderColor: COLORS.sand, color: COLORS.sand }}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="uppercase text-[11px] tracking-[0.14em] opacity-80">Mesa</p>
                                <h3 className="text-2xl font-semibold">{activeTable.name}</h3>
                                <p className="mt-1 text-sm opacity-80">{activeTable.guests.length} convidados</p>
                            </div>
                            <button
                                className="px-4 py-2 rounded-xl border hover:opacity-90"
                                style={{ borderColor: COLORS.sand }}
                                onClick={() => setActiveId(null)}
                            >
                                Fechar
                            </button>
                        </div>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base">
                            {activeTable.guests.map(g => (
                                <div key={g.id} className="border-b border-white/10 py-2">{g.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Back/Home button (always on top) */}
            <div
                className="pointer-events-none absolute top-4 left-4 z-60 hidden md:block"
                style={{
                    paddingTop: "env(safe-area-inset-top)",
                    paddingLeft: "env(safe-area-inset-left)",
                }}
            >
                <Link
                    href="/"
                    className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-lg transition hover:opacity-90"
                    style={{
                        borderColor: "#C8AB8B",
                        color: "#C8AB8B",
                        backgroundColor: "rgba(13,16,23,0.6)",
                    }}
                >
                    <span>⬅ Back</span>
                </Link>
            </div>


            <Canvas className="w-full h-full" camera={{ position: [0, 10, 18], fov: 50 }} dpr={[1, 2]}>
                <color attach="background" args={[COLORS.space]} />
                <Stars radius={80} depth={60} count={3800} factor={2} saturation={0} fade speed={0.5} />
                <ambientLight intensity={0.35} />
                <pointLight position={[10, 14, 8]} intensity={1.0} color={COLORS.sand} />

                {layout.map(({ table, position }) => (
                    <Galaxy
                        key={table.id}
                        table={table}
                        position={position}
                        focused={table.id === (hoverId || activeId)}
                        hovered={table.id === hoverId}
                        dimmed={!!activeId && table.id !== activeId}
                        onPointerOver={() => setHoverId(table.id)}
                        onPointerOut={() => setHoverId((id) => (id === table.id ? null : id))}
                        onClick={() => setActiveId(table.id)}
                    />
                ))}

                <CameraFocus activePos={activePos} controlsRef={controlsRef} />
                <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.12} minDistance={10} maxDistance={40} />

                <EffectComposer>
                    <Bloom intensity={0.35} luminanceThreshold={0.5} luminanceSmoothing={0.18} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

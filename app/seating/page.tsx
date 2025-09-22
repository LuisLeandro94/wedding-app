import GalaxySeatingR3F from "../_components/galaxySeating";

const tables = [
    { id: "t1", name: "Andrómeda", guests: [{ id: "1", name: "João Silva" }, { id: "2", name: "Maria Silva" }] },
    { id: "t2", name: "Via Láctea", guests: [{ id: "3", name: "Carla" }, { id: "4", name: "Luís" }] },
    { id: "t3", name: "Sombrero", guests: [{ id: "5", name: "Ana" }, { id: "6", name: "Rui" }] },
    { id: "t4", name: "Triângulo", guests: [{ id: "7", name: "Pedro" }] },
];

export default function Page() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6" style={{ background: "#0D1017" }}>
            <div className="w-full max-w-6xl">
                <GalaxySeatingR3F tables={tables} />
            </div>
        </main>
    );
}

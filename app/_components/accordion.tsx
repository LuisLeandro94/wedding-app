"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { COLORS } from "../utils/exports";

type Item = {
    title: string;
    content: string;
}

const items: Item[] = [
    {
        title: "What time does the wedding start?",
        content: "The ceremony starts at 3:00 PM.",
    },
    {
        title: "Is there parking available?",
        content: "Yes, free parking is available at the venue.",
    },
];

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={index} className="rounded-lg bg-black/30" style={{ borderColor: COLORS.sand, borderWidth: 1 }}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex w-full items-center justify-between p-4 text-left font-medium" style={{ color: COLORS.sand }}
                        >
                            <span>{item.title}</span>
                            <ChevronDown
                                className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isOpen && (
                            <div className="px-4 pb-4 text-sm" style={{ color: COLORS.white }}>
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}
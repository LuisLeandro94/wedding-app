export const CountdownCard = ({ label, number, cardRef }: { label: string, number: number, cardRef: React.RefObject<HTMLDivElement | null> }) => {
    return (
        <div className="countdown__card">
            <div ref={cardRef}>
                <div className="countdown__card__number" id={label}>
                    {number}
                </div>
            </div>
            <div className="countdown__card__label">{label}</div>
        </div>
    );
};
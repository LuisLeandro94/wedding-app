import React, { Component, useState } from "react";
import Switch from "react-switch";

export const SwitchToggle: React.FC = () => {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    return (
        <label>
            <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
            />
        </label>
    );
}
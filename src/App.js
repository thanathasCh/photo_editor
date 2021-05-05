import React, { useState } from "react";
import './App.css';
import Slider from "./components/Slider";
import SidebarItem from "./components/SidebarItem";
import EditorOptions from "./models/EditorOptions";


function App() {
    const [options, setOptions] = useState(EditorOptions());
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const selectedOption = options[selectedOptionIndex];

    function handleSliderChange({ target }) {
        setOptions(prevOptions => {
            return prevOptions.map( (option, index) => {
                if (index !== selectedOptionIndex) {
                    return option
                } else {
                    return { ...option, value: target.value }
                }
            })
        })
    }

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`;
        })

        return { filter: filters.join(' ')};
    }

    return (
        <div className="container">
            <div className="main-image" style={getImageStyle()}/>
            <div className="sidebar">
                {
                    options.map( (option, index) => {
                        return (
                            <SidebarItem
                                key={index}
                                name={option.name}
                                active={index === selectedOptionIndex}
                                handleClick={ () => setSelectedOptionIndex(index)}
                            />
                        )
                    })
                }
            </div>

            <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSliderChange}
            />
        </div>
    )
}

export default App;

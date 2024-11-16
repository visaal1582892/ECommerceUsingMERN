import React, { createContext, useRef, useContext } from 'react';

const ScrollContext = createContext();

export const useScroll = () => {
    return useContext(ScrollContext);
};

const ScrollProvider = ({ children }) => {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);

    const scrollToSection = (sectionId) => {
        switch (sectionId) {
            case 'section1':
                section1Ref.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'section2':
                section2Ref.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'section3':
                section3Ref.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'section4':
                section4Ref.current.scrollIntoView({ behavior: 'smooth' });
                break;
            default:
                break;
        }
    };

    return (
        <ScrollContext.Provider value={{ scrollToSection, section1Ref, section2Ref, section3Ref, section4Ref }}>
            {children}
        </ScrollContext.Provider>
    );
};

export default ScrollProvider;

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { elements, categories, getCategoryColor, Element } from '../data/elements';

// Theme interface
interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  overlay: string;
}

const lightTheme: Theme = {
  background: '#f5f7fa',
  text: '#333',
  cardBackground: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkTheme: Theme = {
  background: '#1a1a1a',
  text: '#fff',
  cardBackground: '#1e1e1e',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const TableContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 100vh;
  background: ${props => props.$theme.background};
  overflow: visible;
  width: 100%;
  position: relative;
  z-index: 1;
  isolation: isolate;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(18, minmax(60px, 1fr));
  gap: 3px;
  padding: 1rem;
  max-width: 100%;
  min-width: min-content;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  isolation: isolate;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(18, minmax(50px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(18, minmax(40px, 1fr));
    gap: 2px;
    padding: 0.5rem;
  }
`;

const LanthanideActinideContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, minmax(60px, 1fr));
  gap: 3px;
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
  z-index: 2;
  isolation: isolate;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(15, minmax(50px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(15, minmax(40px, 1fr));
    gap: 2px;
    padding: 0.5rem;
  }
`;

const ElementCard = styled.div<{ $color: string; $theme: Theme; $group: number; $period: number }>`
  aspect-ratio: 1;
  padding: 0.5rem;
  background: ${props => props.$color};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  min-width: 60px;
  grid-column: ${props => props.$group};
  grid-row: ${props => props.$period};
  overflow: visible;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 4;
  }

  @media (max-width: 1200px) {
    min-width: 50px;
    padding: 0.4rem;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    padding: 0.3rem;
  }
`;

const ElementImage = styled.img`
  width: 100%;
  height: 40px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const ElementSymbol = styled.div<{ $theme: Theme }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.$theme.text};
  text-align: center;
  margin-top: 0.8rem;
`;

const ElementNumber = styled.div<{ $theme: Theme }>`
  font-size: 0.7rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  position: absolute;
  top: 2px;
  left: 4px;
  font-weight: 500;
`;

const ElementName = styled.div<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  text-align: center;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ElementMass = styled.div<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  text-align: center;
  margin-top: 0.1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
  padding: 0 1rem;
  max-width: 100%;
  overflow-x: auto;
  z-index: 5;
  position: relative;
  isolation: isolate;

  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0 0.5rem;
  }
`;

const FilterButton = styled.button<{ $active: boolean; $theme: Theme }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active 
    ? props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    : props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.$theme.text};
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 6;
  position: relative;
  border: 1px solid ${props => props.$theme.text}10;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: ${props => props.$active 
      ? props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.25)' 
        : 'rgba(0, 0, 0, 0.15)'
      : props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'rgba(0, 0, 0, 0.08)'
    };
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const ThemeToggle = styled.button<{ $theme: Theme }>`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: ${props => props.$theme === darkTheme 
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${props => props.$theme.text}20;
  color: ${props => props.$theme.text};
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  z-index: 999999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background: ${props => props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.12)'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const Tooltip = styled.div<{ $theme: Theme }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.$theme.cardBackground};
  padding: 1rem;
  border-radius: 12px;
  z-index: 999999;
  width: 280px;
  pointer-events: none;
  opacity: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.$theme.text}20;
  visibility: visible;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.3s ease;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    width: 240px;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 200px;
    padding: 0.6rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${props => props.$theme.cardBackground};
  }
`;

const TooltipHeader = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.$theme.text}20;
  animation: ${scaleIn} 0.3s ease-out;

  @media (max-width: 768px) {
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const ElementSymbolLarge = styled.div<{ $theme: Theme }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.$theme.text};

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ElementInfo = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ElementNameLarge = styled.div<{ $theme: Theme }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.$theme.text};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ElementNumberLarge = styled.div<{ $theme: Theme }>`
  font-size: 0.9rem;
  color: ${props => props.$theme.text}80;
`;

const TooltipContent = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TooltipRow = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${props => props.$theme.background};
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.8rem;
  }

  &:hover {
    background: ${props => props.$theme.text}10;
  }

  span:first-child {
    color: ${props => props.$theme.text}80;
  }

  span:last-child {
    color: ${props => props.$theme.text};
    font-weight: 600;
  }
`;

const OrbitContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  pointer-events: none;
`;

const OrbitRing = styled.div<{ $theme: Theme }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 1px dashed ${props => props.$theme.text}30;
  border-radius: 50%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
`;

const Electron = styled.div<{ $angle: number; $theme: Theme; $delay: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: ${props => props.$theme.text};
  border-radius: 50%;
  transform-origin: 20px 0;
  transform: rotate(${props => props.$angle}deg) translateX(20px) rotate(-${props => props.$angle}deg);
  opacity: 0.7;
  animation: ${rotate} 3s linear infinite;
  animation-delay: ${props => props.$delay}s;
`;

const PeriodicTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      setIsTransitioning(false);
    }, 150);
  };

  const filteredElements = elements.filter(element => {
    if (selectedCategory && element.category !== selectedCategory) return false;
    return true;
  });

  const mainElements = filteredElements.filter(element => 
    element.period <= 7 && !['lanthanide', 'actinide'].includes(element.category)
  );

  const lanthanides = filteredElements.filter(element => 
    element.category === 'lanthanide'
  );

  const actinides = filteredElements.filter(element => 
    element.category === 'actinide'
  );

  const getValenceElectrons = (element: Element): number => {
    // First try to get from shells data if available
    if (element.shells && element.shells.length > 0) {
      return element.shells[element.shells.length - 1];
    }
    
    // Calculate based on group number
    const group = element.group;
    if (group >= 1 && group <= 2) {
      return group; // Groups 1 and 2 have 1 and 2 valence electrons respectively
    } else if (group >= 13 && group <= 18) {
      return group - 10; // Groups 13-18 have 3-8 valence electrons
    } else if (group >= 3 && group <= 12) {
      return 2; // Transition metals typically have 2 valence electrons
    }
    return 0;
  };

  const renderElectrons = (count: number, theme: Theme) => {
    const electrons = [];
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i;
      const delay = (i / count) * -3; // Stagger the animation start for each electron
      electrons.push(
        <Electron
          key={i}
          $angle={angle}
          $theme={theme}
          $delay={delay}
        />
      );
    }
    return electrons;
  };

  const formatValue = (value: number | string): string => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  const renderTooltip = (element: Element) => {
    const rect = document.querySelector(`[data-symbol="${element.symbol}"]`)?.getBoundingClientRect();
    if (!rect) return null;

    return (
      <Tooltip 
        $theme={theme} 
        style={{ 
          top: `${rect.top - 200}px`,
          left: `${rect.left + (rect.width / 2)}px`
        }}
      >
        <TooltipHeader $theme={theme}>
          <ElementSymbolLarge $theme={theme}>{element.symbol}</ElementSymbolLarge>
          <ElementInfo $theme={theme}>
            <ElementNameLarge $theme={theme}>{element.name}</ElementNameLarge>
            <ElementNumberLarge $theme={theme}>Atomic Number: {element.number}</ElementNumberLarge>
          </ElementInfo>
        </TooltipHeader>
        <TooltipContent $theme={theme}>
          <TooltipRow $theme={theme}>
            <span>Atomic Mass</span>
            <span>{formatValue(element.atomic_mass)} u</span>
          </TooltipRow>
          <TooltipRow $theme={theme}>
            <span>Category</span>
            <span>{element.category}</span>
          </TooltipRow>
          <TooltipRow $theme={theme}>
            <span>Block</span>
            <span>{element.block}</span>
          </TooltipRow>
          <TooltipRow $theme={theme}>
            <span>Group</span>
            <span>{element.group}</span>
          </TooltipRow>
          <TooltipRow $theme={theme}>
            <span>Period</span>
            <span>{element.period}</span>
          </TooltipRow>
          <TooltipRow $theme={theme}>
            <span>Valence Electrons</span>
            <span>{getValenceElectrons(element)}</span>
          </TooltipRow>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TableContainer $theme={theme}>
      <ThemeToggle
        onClick={handleThemeToggle}
        $theme={theme}
        disabled={isTransitioning}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>

      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={selectedCategory === category}
            $theme={theme}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <TableWrapper>
        {mainElements.map(element => (
          <ElementCard
            key={element.symbol}
            data-symbol={element.symbol}
            $color={getCategoryColor(element.category)}
            $theme={theme}
            $group={element.group}
            $period={element.period}
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <ElementNumber $theme={theme}>{element.number}</ElementNumber>
            <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
            <ElementImage
              src={`/images/elements/${element.symbol.toLowerCase()}.png`}
              alt={element.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <ElementName $theme={theme}>{element.name}</ElementName>
            <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>
            <OrbitContainer>
              <OrbitRing $theme={theme} />
              {renderElectrons(getValenceElectrons(element), theme)}
            </OrbitContainer>

            {hoveredElement?.symbol === element.symbol && renderTooltip(element)}
          </ElementCard>
        ))}
      </TableWrapper>

      <LanthanideActinideContainer>
        {lanthanides.map(element => (
          <ElementCard
            key={element.symbol}
            $color={getCategoryColor(element.category)}
            $theme={theme}
            $group={element.number - 57 + 3}
            $period={1}
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <ElementNumber $theme={theme}>{element.number}</ElementNumber>
            <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
            <ElementImage
              src={`/images/elements/${element.symbol.toLowerCase()}.png`}
              alt={element.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <ElementName $theme={theme}>{element.name}</ElementName>
            <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>
            <OrbitContainer>
              <OrbitRing $theme={theme} />
              {renderElectrons(getValenceElectrons(element), theme)}
            </OrbitContainer>

            {hoveredElement?.symbol === element.symbol && renderTooltip(element)}
          </ElementCard>
        ))}
      </LanthanideActinideContainer>

      <LanthanideActinideContainer>
        {actinides.map(element => (
          <ElementCard
            key={element.symbol}
            $color={getCategoryColor(element.category)}
            $theme={theme}
            $group={element.number - 89 + 3}
            $period={1}
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <ElementNumber $theme={theme}>{element.number}</ElementNumber>
            <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
            <ElementImage
              src={`/images/elements/${element.symbol.toLowerCase()}.png`}
              alt={element.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <ElementName $theme={theme}>{element.name}</ElementName>
            <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>
            <OrbitContainer>
              <OrbitRing $theme={theme} />
              {renderElectrons(getValenceElectrons(element), theme)}
            </OrbitContainer>

            {hoveredElement?.symbol === element.symbol && renderTooltip(element)}
          </ElementCard>
        ))}
      </LanthanideActinideContainer>
    </TableContainer>
  );
};

export default PeriodicTable; 
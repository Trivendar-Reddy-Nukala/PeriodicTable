import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { elements, categories, getCategoryColor, Element } from '../data/elements';

interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  overlay: string;
}

interface StyledProps {
  $theme: Theme;
}

interface ElementCardProps {
  $theme: Theme;
  $color: string;
  $group: number;
  $period: number;
}

interface ModalProps extends StyledProps {
  $isOpen: boolean;
}

interface FilterButtonProps extends StyledProps {
  $active: boolean;
}

interface ThemeToggleProps extends StyledProps {
  disabled: boolean;
}

const darkTheme: Theme = {
  background: '#1a1a1a',
  text: '#ffffff',
  cardBackground: '#2d2d2d',
  overlay: 'rgba(0, 0, 0, 0.8)'
};

const lightTheme: Theme = {
  background: '#f5f5f5',
  text: '#333333',
  cardBackground: '#ffffff',
  overlay: 'rgba(255, 255, 255, 0.8)'
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const TableContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 100vh;
  background: ${(props: StyledProps) => props.$theme.background};
  overflow-x: hidden;
  width: 100%;
  position: relative;
  z-index: 1;
  isolation: isolate;
  transition: background-color 0.3s ease;

  @media (max-width: 1200px) {
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
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
  overflow-x: auto;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(18, minmax(55px, 1fr));
    gap: 2px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(18, minmax(50px, 1fr));
    gap: 2px;
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(18, minmax(40px, 1fr));
    gap: 1px;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(18, minmax(35px, 1fr));
    gap: 1px;
    padding: 0.3rem;
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
  overflow-x: auto;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(15, minmax(55px, 1fr));
    gap: 2px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(15, minmax(50px, 1fr));
    gap: 2px;
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(15, minmax(40px, 1fr));
    gap: 1px;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(15, minmax(35px, 1fr));
    gap: 1px;
    padding: 0.3rem;
  }
`;

const ElementCard = styled.div<ElementCardProps>`
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
  z-index: 1;
  border: 1px solid ${props => props.$theme.text}10;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 100;
    border-color: ${props => props.$theme.text}30;
  }

  @media (max-width: 1400px) {
    min-width: 55px;
    padding: 0.4rem;
    border-radius: 6px;
  }

  @media (max-width: 1200px) {
    min-width: 50px;
    padding: 0.4rem;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    padding: 0.3rem;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    min-width: 35px;
    padding: 0.2rem;
    border-radius: 4px;
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

  @media (max-width: 1400px) {
    font-size: 1.1rem;
    margin-top: 0.7rem;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 0.4rem;
  }
`;

const ElementNumber = styled.div<{ $theme: Theme }>`
  font-size: 0.7rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  position: absolute;
  top: 2px;
  left: 4px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    top: 1px;
    left: 3px;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    top: 1px;
    left: 2px;
  }
`;

const ElementName = styled.div<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  text-align: center;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.5rem;
    margin-top: 0.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.4rem;
    margin-top: 0.1rem;
  }
`;

const ElementMass = styled.div<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  text-align: center;
  margin-top: 0.1rem;

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.4rem;
  }
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
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.2rem;
    padding: 0 0.3rem;
    margin-bottom: 0.5rem;
  }
`;

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props: FilterButtonProps) => props.$theme.text}10;
  border-radius: 20px;
  background: ${(props: FilterButtonProps) => props.$active 
    ? props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    : props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'
  };
  color: ${(props: FilterButtonProps) => props.$theme.text};
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 6;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${(props: FilterButtonProps) => props.$active 
      ? props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.25)' 
        : 'rgba(0, 0, 0, 0.15)'
      : props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'rgba(0, 0, 0, 0.08)'
    };
    border-color: ${(props: FilterButtonProps) => props.$theme.text}30;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
`;

const ThemeToggle = styled.button<ThemeToggleProps>`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: ${(props: ThemeToggleProps) => props.$theme === darkTheme 
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${(props: ThemeToggleProps) => props.$theme.text}20;
  color: ${(props: ThemeToggleProps) => props.$theme === darkTheme ? '#ffffff' : '#333333'};
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
    background: ${(props: ThemeToggleProps) => props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.12)'};
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    top: 0.8rem;
    right: 0.8rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const Tooltip = styled.div<{ $theme: Theme; $position: { top: number; left: number } }>`
  position: absolute;
  top: ${props => props.$position.top}px;
  left: ${props => props.$position.left}px;
  transform: translate(-50%, -100%);
  background: ${props => props.$theme.cardBackground};
  padding: 1rem;
  border-radius: 12px;
  z-index: 1000;
  width: 280px;
  pointer-events: none;
  opacity: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.$theme.text}20;
  visibility: visible;
  animation: ${fadeIn} 0.2s ease-out;
  transition: all 0.2s ease;
  will-change: transform, opacity;
  backdrop-filter: blur(8px);
  margin-top: -10px;

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
  background: ${props => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.8rem;
  }

  &:hover {
    background: ${props => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }

  span:first-child {
    color: ${props => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
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

const ElementModal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props: ModalProps) => props.$theme.overlay};
  display: ${(props: ModalProps) => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{ $theme: Theme }>`
  background: ${(props: { $theme: Theme }) => props.$theme.cardBackground};
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid ${(props: { $theme: Theme }) => props.$theme.text}20;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CloseButton = styled.button<{ $theme: Theme }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${(props: { $theme: Theme }) => props.$theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props: { $theme: Theme }) => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const ModalHeader = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props: { $theme: Theme }) => props.$theme.text}20;
`;

const ModalRow = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: ${(props: { $theme: Theme }) => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props: { $theme: Theme }) => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const ModalLabel = styled.span<{ $theme: Theme }>`
  font-size: 0.9rem;
  color: ${(props: { $theme: Theme }) => props.$theme === darkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  margin-bottom: 0.3rem;
`;

const ModalValue = styled.span<{ $theme: Theme }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props: { $theme: Theme }) => props.$theme.text};
`;

const PeriodicTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      setIsTransitioning(false);
    }, 150);
  };

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
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
    if (element.shells && element.shells.length > 0) {
      return element.shells[element.shells.length - 1];
    }
    
    const group = element.group;
    if (group >= 1 && group <= 2) {
      return group;
    } else if (group >= 13 && group <= 18) {
      return group - 10;
    } else if (group >= 3 && group <= 12) {
      return 2;
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

  const renderModal = () => {
    if (!selectedElement) return null;

    return (
      <ElementModal $theme={theme} $isOpen={!!selectedElement}>
        <ModalContent $theme={theme}>
          <CloseButton $theme={theme} onClick={handleCloseModal}>
            ×
          </CloseButton>
          <ModalHeader $theme={theme}>
            <ElementSymbolLarge $theme={theme}>{selectedElement.symbol}</ElementSymbolLarge>
            <ElementInfo $theme={theme}>
              <ElementNameLarge $theme={theme}>{selectedElement.name}</ElementNameLarge>
              <ElementNumberLarge $theme={theme}>Atomic Number: {selectedElement.number}</ElementNumberLarge>
            </ElementInfo>
          </ModalHeader>
          <ModalContent $theme={theme}>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Atomic Mass</ModalLabel>
              <ModalValue $theme={theme}>{formatValue(selectedElement.atomic_mass)} u</ModalValue>
            </ModalRow>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Category</ModalLabel>
              <ModalValue $theme={theme}>{selectedElement.category}</ModalValue>
            </ModalRow>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Block</ModalLabel>
              <ModalValue $theme={theme}>{selectedElement.block}</ModalValue>
            </ModalRow>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Group</ModalLabel>
              <ModalValue $theme={theme}>{selectedElement.group}</ModalValue>
            </ModalRow>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Period</ModalLabel>
              <ModalValue $theme={theme}>{selectedElement.period}</ModalValue>
            </ModalRow>
            <ModalRow $theme={theme}>
              <ModalLabel $theme={theme}>Valence Electrons</ModalLabel>
              <ModalValue $theme={theme}>{getValenceElectrons(selectedElement)}</ModalValue>
            </ModalRow>
          </ModalContent>
        </ModalContent>
      </ElementModal>
    );
  };

  return (
    <TableContainer $theme={theme} ref={tableRef}>
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
            onClick={() => handleElementClick(element)}
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
            onClick={() => handleElementClick(element)}
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
            onClick={() => handleElementClick(element)}
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
          </ElementCard>
        ))}
      </LanthanideActinideContainer>

      {renderModal()}
    </TableContainer>
  );
};

export default PeriodicTable; 